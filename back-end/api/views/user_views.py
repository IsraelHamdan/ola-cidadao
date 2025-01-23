from rest_framework import generics, viewsets, status
from drf_spectacular.utils import extend_schema
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.generics import ListAPIView
from rest_framework.exceptions import ValidationError
from cloudinary.uploader import destroy
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from ..utils.filters import OrgaoFilter
from ..utils.permissions import IsAllowReader
from django_filters.rest_framework import DjangoFilterBackend
from ..models import Cidadao, Prefeitura, Orgao,  Administrador

from ..serializers.serializers import (
    PrefeituraSerializer,
    OrgaoSerializer, AdministradorSerializer,
    CidadaoSerializer,
    AdministradorSerializer,
    PrefeituraSerializer,
    OrgaoSerializer,
)


class BaseImagePerfilBackgroundViewSet(viewsets.ModelViewSet):
    """
    Classe base para tratar criação, atualização e exclusão de registros que contenham imagens.
    """
    def perform_update(self, serializer):
        """
        Sobrescreve o método de atualização para tratar imagens antigas ao alterar o registro.
        """
        instance = self.get_object()
        imagens_a_remover = []

        # Verifica se as imagens foram alteradas e armazena as antigas para exclusão
        for field in ['imagem_perfil', 'imagem_background']:
            if field in self.request.data and getattr(instance, field, None):
                old_image = getattr(instance, field)
                imagens_a_remover.append((field, old_image))

        # Salva o novo estado da instância
        updated_instance = serializer.save()

        # Exclui as imagens antigas se foram substituídas
        for field, old_image in imagens_a_remover:
            new_image = getattr(updated_instance, field)
            if old_image.name != new_image.name:
                destroy(old_image.name)


    def perform_destroy(self, instance):
        """
        Sobrescreve o método de exclusão para remover as imagens associadas ao registro.
        """
        # Exclui as imagens associadas, se houver
        for field in ['imagem_perfil', 'imagem_background']:
            image = getattr(instance, field, None)
            if image:
                destroy(image.name)

        # Exclui o registro
        super().perform_destroy(instance)


class CidadaoCreateView(APIView):
    permission_classes = [AllowAny]  # Permite acesso público
    authentication_classes = []  # Desativa a autenticação para esta view

    @extend_schema(
        request=CidadaoSerializer,
        responses={201: CidadaoSerializer},
    )
    def post(self, request, *args, **kwargs):
        serializer = CidadaoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CidadaoViewSet(BaseImagePerfilBackgroundViewSet):
    queryset = Cidadao.objects.all()
    serializer_class = CidadaoSerializer
    parser_classes = [JSONParser, MultiPartParser, FormParser]


class AdministradorViewSet(BaseImagePerfilBackgroundViewSet):
    queryset = Administrador.objects.all()
    serializer_class = AdministradorSerializer
    parser_classes = [JSONParser, MultiPartParser, FormParser]


class PrefeituraViewSet(BaseImagePerfilBackgroundViewSet):
    queryset = Prefeitura.objects.all()
    serializer_class = PrefeituraSerializer
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    permission_classes = [IsAllowReader]


class OrgaoViewSet(BaseImagePerfilBackgroundViewSet):
    queryset = Orgao.objects.all()
    serializer_class = OrgaoSerializer
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    permission_classes = [IsAllowReader]
    filter_backends = [DjangoFilterBackend]
    filterset_class = OrgaoFilter  # Use a classe de filtro personalizada



    def perform_create(self, serializer):
        """
        Sobrescreve o método de criação para associar a postagem ao usuário autenticado 
        (prefeitura ou orgao).
        """
        # Verifica se o usuário autenticado possui os atributos 'prefeitura' ou 'orgao'
        if not (hasattr(self.request.user, 'prefeitura')):
            raise ValidationError({"detail": "Apenas prefeituras podem criar orgaos."})

        # Preenche automaticamente o campo 'prefeitura' com o usuário autenticado
        serializer.save(prefeitura_rel=self.request.user.prefeitura)

    
# Resposta
# class RespostaListCreateView(generics.ListCreateAPIView):
#     queryset = Resposta.objects.all()
#     serializer_class = RespostaSerializer
#     permission_classes = [IsAuthenticated]

# class RespostaDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Resposta.objects.all()
#     serializer_class = RespostaSerializer
#     permission_classes = [IsAuthenticated]

