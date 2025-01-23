# Imports do Django e Django REST Framework
from rest_framework import generics, viewsets, status, serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated, SAFE_METHODS, BasePermission
from rest_framework.generics import ListAPIView
from rest_framework.exceptions import ValidationError
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

# Imports de ferramentas adicionais
from drf_spectacular.utils import extend_schema
from cloudinary.uploader import destroy

# Imports de arquivos locais (utils, models e serializers)
from ..utils.filters import ManifestacaoFilter
from ..utils.permissions import IsCidadao, IsPrefeitura, IsOrgao, IsAdministrador, IsAllowReader
from ..models import Postagem, Manifestacao, Resposta
from ..serializers.serializers import (
    ManifestacaoRespostasSerializer,
    RespostaCreateSerializer,
    RespostaPorManifestacaoSerializer,
    RespostaUpdateSerializer,
    PostagemSerializer,
    ManifestacaoSerializer,
)

    
class BaseImageViewSet(ModelViewSet):
    """
    Classe base para tratar criação, atualização e exclusão de registros que contenham imagens.
    """

    def perform_update(self, serializer):
        """
        Sobrescreve o método de atualização para tratar imagens antigas ao alterar o registro.
        """
        instance = self.get_object()

        # Verifica se a imagem foi alterada
        if 'imagem' in self.request.data and instance.imagem:
            old_image = instance.imagem

            # Salva a nova imagem
            updated_instance = serializer.save()

            # Exclui a imagem antiga, se necessário (apenas no caso de Cloudinary)
            if old_image.name != updated_instance.imagem.name:
                destroy(old_image.name)

        else:
            # Salva normalmente se a imagem não foi alterada
            serializer.save()

    def perform_destroy(self, instance):
        """
        Sobrescreve o método de exclusão para remover a imagem associada ao registro.
        """
        # Exclui a imagem, se houver
        if instance.imagem:
            destroy(instance.imagem.name)

        # Exclui o registro
        super().perform_destroy(instance)


class PostagemViewSet(BaseImageViewSet):
    queryset = Postagem.objects.all()
    serializer_class = PostagemSerializer
    permission_classes = [IsAllowReader]
    parser_classes = [MultiPartParser, FormParser]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['prefeitura_id']  # Adiciona o campo de filtro por prefeitura_id

    def perform_create(self, serializer):
        """
        Sobrescreve o método de criação para associar a postagem ao usuário autenticado 
        (prefeitura ou orgao).
        """
        if not (hasattr(self.request.user, 'prefeitura') or hasattr(self.request.user, 'orgao')):
            raise ValidationError({"detail": "Apenas prefeituras ou orgaos podem criar postagens."})
        serializer.save(prefeitura=self.request.user)


class ManifestacaoViewSet(BaseImageViewSet):
    queryset = Manifestacao.objects.all()
    serializer_class = ManifestacaoSerializer
    permission_classes = [IsAllowReader]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        """
        Sobrescreve o método de criação para associar a manifestação ao cidadão autenticado.
        """
        # Verifica se o usuário autenticado possui o atributo 'cidadao'
        if not hasattr(self.request.user, 'cidadao'):
            raise ValidationError({"detail": "O usuário autenticado não possui um perfil de Cidadão associado."})

        # Preenche automaticamente o campo 'cidadao' com o perfil do usuário autenticado
        serializer.save(cidadao=self.request.user.cidadao)
        

class RespostaViewSet(ModelViewSet):
    queryset = Resposta.objects.all()
    permission_classes = [IsAllowReader]

    def get_serializer_class(self):
        """
        Retorna o serializer apropriado com base no método da requisição.
        """
        if self.action == 'create':  # POST
            return RespostaCreateSerializer
        elif self.action in ['update', 'partial_update']:  # PUT/PATCH
            return RespostaUpdateSerializer
        return RespostaCreateSerializer  # Padrão (pode ser usado também para GET)

    def perform_create(self, serializer):
        """
        Sobrescreve o método de criação para associar a resposta a manifestação a orgao autenticado.
        """

        # Verifica se o usuário autenticado possui o atributo 'orgao'
        if not hasattr(self.request.user, 'orgao'):
            raise ValidationError({"detail": "O usuário autenticado não possui um perfil de orgao associada."})

        # Preenche automaticamente o campo 'cidadao' com o perfil do usuário autenticado
        serializer.save(usuario=self.request.user.orgao)


# class ManifestacaoRespostasListView(ListAPIView):
#     queryset = Manifestacao.objects.all()
#     serializer_class = ManifestacaoRespostasSerializer
#     permission_classes = [IsAllowReader]

#     @extend_schema(
#         operation_id="listar_manifestacoes_com_respostas",
#         description="Lista todas as manifestações com suas respostas associadas."
#     )
#     def list(self, request, *args, **kwargs):
#         return super().list(request, *args, **kwargs)

class RespostasPorManifestacaoView(ListAPIView):
    serializer_class = RespostaPorManifestacaoSerializer
    permission_classes = [IsAllowReader]

    def get_queryset(self):
        manifestacao_id = self.kwargs.get('manifestacao_id')
        return Resposta.objects.filter(manifestacao_id=manifestacao_id)

    @extend_schema(
        operation_id="listar_respostas_por_manifestacao",
        description="Lista todas as respostas associadas a uma manifestação específica."
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    


class ManifestacaoRespostasListView(ListAPIView):
    """
    Lista todas as manifestações com suas respostas associadas.
    """
    queryset = Manifestacao.objects.all()
    serializer_class = ManifestacaoRespostasSerializer
    permission_classes = [IsAllowReader]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = ManifestacaoFilter
    ordering_fields = ['-data_criacao', '-qtd_up', '-qtd_down']
    ordering = ['-data_criacao']

    @extend_schema(
        operation_id="listar_manifestacoes_com_respostas",
        description="Lista todas as manifestações com seus filtros e ordenação."
    )
    def list(self, request, *args, **kwargs):
        """
        Sobrescreve o método list apenas para documentar o endpoint.
        """
        return super().list(request, *args, **kwargs)
    

class ManifestacaoUsuarioListView(ListAPIView):
    """
    Lista as manifestações associadas ao cidadão logado.
    """
    serializer_class = ManifestacaoRespostasSerializer
    permission_classes = [IsAuthenticated]  # Apenas usuários autenticados podem acessar

    def get_queryset(self):
        """
        Filtra as manifestações onde o 'cidadao' é o usuário logado.
        """
        user = self.request.user

        # Verifica se o usuário logado é um cidadão
        if hasattr(user, 'cidadao'):
            return Manifestacao.objects.filter(cidadao=user.cidadao)

        # Caso o usuário não seja um cidadão, retorna um queryset vazio
        return Manifestacao.objects.none()


class ManifestacaoDirecionadaistView(ListAPIView):
    """
    Lista as manifestações associadas ao órgão ou prefeitura do usuário logado.
    """
    serializer_class = ManifestacaoRespostasSerializer
    permission_classes = [IsAuthenticated]  # Apenas usuários autenticados podem acessar

    def get_queryset(self):
        """
        Filtra as manifestações onde o órgão ou prefeitura é igual ao do usuário logado.
        """
        user = self.request.user

        # Filtra manifestações relacionadas ao órgão do usuário
        if hasattr(user, 'orgao'):
            return Manifestacao.objects.filter(orgao=user.orgao)

        # Filtra manifestações relacionadas à prefeitura do usuário
        if hasattr(user, 'prefeitura'):
            return Manifestacao.objects.filter(orgao__prefeitura=user.prefeitura)

        # Caso o usuário não seja um órgão ou prefeitura, retorna um queryset vazio
        return Manifestacao.objects.none()


# class ManifestacaoRespostasListView(ReadOnlyModelViewSet):
#     queryset = Manifestacao.objects.all()
#     serializer_class = ManifestacaoRespostasSerializer
#     filter_backends = [DjangoFilterBackend, OrderingFilter]
#     filterset_class = ManifestacaoFilter
#     ordering_fields = ['data_criacao', 'qtd_up', 'qtd_down']
#     ordering = ['data_criacao']
#     #permission_classes = [IsAllowReader]

    