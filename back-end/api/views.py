from rest_framework import generics
from .models import Endereco, Usuario, Cidadao, Prefeitura, Secretaria, Postagem, Manifestacao, Resposta, Administrador
from .serializers import (
    EnderecoSerializer, UsuarioSerializer, CidadaoSerializer, PrefeituraSerializer,
    SecretariaSerializer, PostagemSerializer, ManifestacaoSerializer, RespostaSerializer, AdministradorSerializer
)
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .permissions import IsCidadao, IsPrefeitura, IsSecretaria, IsAdministrador
from rest_framework.permissions import AllowAny

# Endereco
class EnderecoListCreateView(generics.ListCreateAPIView):
    queryset = Endereco.objects.all()
    serializer_class = EnderecoSerializer

class EnderecoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Endereco.objects.all()
    serializer_class = EnderecoSerializer

# Cidadao
class CidadaoListCreateView(generics.ListCreateAPIView):
    queryset = Cidadao.objects.all()
    serializer_class = CidadaoSerializer

class CidadaoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cidadao.objects.all()
    serializer_class = CidadaoSerializer

# Prefeitura
class PrefeituraListCreateView(generics.ListCreateAPIView):
    queryset = Prefeitura.objects.all()
    serializer_class = PrefeituraSerializer

class PrefeituraDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Prefeitura.objects.all()
    serializer_class = PrefeituraSerializer

# Administrador
class AdministradorListCreateView(generics.ListCreateAPIView):
    queryset = Administrador.objects.all()
    serializer_class = AdministradorSerializer
    permission_classes = [AllowAny]  # Permite acesso público
    authentication_classes = []  # Desativa a autenticação para esta view


class AdministradorDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Administrador.objects.all()
    serializer_class = AdministradorSerializer
    permission_classes = [AllowAny]  # Permite acesso público
    authentication_classes = []  # Desativa a autenticação para esta view


# Secretaria
class SecretariaListCreateView(generics.ListCreateAPIView):
    queryset = Secretaria.objects.all()
    serializer_class = SecretariaSerializer


class SecretariaDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Secretaria.objects.all()
    serializer_class = SecretariaSerializer

# Postagem
class PostagemListCreateView(generics.ListCreateAPIView):
    queryset = Postagem.objects.all()
    serializer_class = PostagemSerializer
    permission_classes = [IsAuthenticated]

class PostagemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Postagem.objects.all()
    serializer_class = PostagemSerializer
    permission_classes = [IsAuthenticated]

# Manifestacao
class ManifestacaoListCreateView(generics.ListCreateAPIView):
    queryset = Manifestacao.objects.all()
    serializer_class = ManifestacaoSerializer
    permission_classes = [IsAuthenticated]

class ManifestacaoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Manifestacao.objects.all()
    serializer_class = ManifestacaoSerializer
    permission_classes = [IsAuthenticated]

# Resposta
class RespostaListCreateView(generics.ListCreateAPIView):
    queryset = Resposta.objects.all()
    serializer_class = RespostaSerializer
    permission_classes = [IsAuthenticated]

class RespostaDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Resposta.objects.all()
    serializer_class = RespostaSerializer
    permission_classes = [IsAuthenticated]

