from rest_framework import generics, viewsets, status, serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.generics import ListAPIView
from rest_framework.exceptions import ValidationError
from drf_spectacular.utils import extend_schema

from ..permissions import IsCidadao, IsPrefeitura, IsSecretaria, IsAdministrador


from ..models import Postagem, Manifestacao, Resposta
from ..serializers.serializers import (
ManifestacaoRespostasSerializer, RespostaCreateSerializer, RespostaPorManifestacaoSerializer, RespostaUpdateSerializer, 
 PostagemSerializer, ManifestacaoSerializer, 
)


# Postagem
class PostagemViewSet(ModelViewSet):
    queryset = Postagem.objects.all()
    serializer_class = PostagemSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """
        Sobrescreve o método de criação para associar a postagem ao usuário autenticado 
        (prefeitura ou secretaria).
        """
        # Verifica se o usuário autenticado possui os atributos 'prefeitura' ou 'secretaria'
        if not (hasattr(self.request.user, 'prefeitura') or hasattr(self.request.user, 'secretaria')):
            raise ValidationError({"detail": "Apenas prefeituras ou secretarias podem criar postagens."})

        # Preenche automaticamente o campo 'prefeitura' com o usuário autenticado
        serializer.save(prefeitura=self.request.user)


class ManifestacaoViewSet(ModelViewSet):
    queryset = Manifestacao.objects.all()
    serializer_class = ManifestacaoSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """
        Sobrescreve o método de criação para associar a manifestação ao cidadão autenticado.
        """

        # Verifica se o usuário autenticado possui o atributo 'cidadao'
        if not hasattr(self.request.user, 'cidadao'):
            raise ValidationError({"detail": "O usuário autenticado não possui um perfil de Cidadão associado."})

        # Preenche automaticamente o campo 'cidadao' com o perfil do usuário autenticado
        serializer.save(prefeitura=self.request.user.cidadao)


class RespostaViewSet(ModelViewSet):
    queryset = Resposta.objects.all()
    permission_classes = [IsAuthenticated]

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
        Sobrescreve o método de criação para associar a resposta a manifestação a secretaria autenticado.
        """

        # Verifica se o usuário autenticado possui o atributo 'secretaria'
        if not hasattr(self.request.user, 'secretaria'):
            raise ValidationError({"detail": "O usuário autenticado não possui um perfil de secretaria associada."})

        # Preenche automaticamente o campo 'cidadao' com o perfil do usuário autenticado
        serializer.save(usuario=self.request.user.secretaria)


class ManifestacaoRespostasListView(ListAPIView):
    queryset = Manifestacao.objects.all()
    serializer_class = ManifestacaoRespostasSerializer

    @extend_schema(
        operation_id="listar_manifestacoes_com_respostas",
        description="Lista todas as manifestações com suas respostas associadas."
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

class RespostasPorManifestacaoView(ListAPIView):
    serializer_class = RespostaPorManifestacaoSerializer

    def get_queryset(self):
        manifestacao_id = self.kwargs.get('manifestacao_id')
        return Resposta.objects.filter(manifestacao_id=manifestacao_id)

    @extend_schema(
        operation_id="listar_respostas_por_manifestacao",
        description="Lista todas as respostas associadas a uma manifestação específica."
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)