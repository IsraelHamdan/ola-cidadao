from rest_framework import generics, viewsets, status
from drf_spectacular.utils import extend_schema
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.generics import ListAPIView
from rest_framework.exceptions import ValidationError

from ..permissions import IsCidadao, IsPrefeitura, IsSecretaria, IsAdministrador

from ..models import Cidadao, Prefeitura, Secretaria,  Administrador

from ..serializers.serializers import (
    PrefeituraSerializer,
    SecretariaSerializer, AdministradorSerializer,
    CidadaoSerializer,
    AdministradorSerializer,
    PrefeituraSerializer,
    SecretariaSerializer,
)

class CidadaoViewSet(viewsets.ModelViewSet):
    queryset = Cidadao.objects.all()
    serializer_class = CidadaoSerializer

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
    
class AdministradorViewSet(viewsets.ModelViewSet):
    queryset = Administrador.objects.all()
    serializer_class = AdministradorSerializer


class PrefeituraViewSet(viewsets.ModelViewSet):
    queryset = Prefeitura.objects.all()
    serializer_class = PrefeituraSerializer


class SecretariaViewSet(viewsets.ModelViewSet):
    queryset = Secretaria.objects.all()
    serializer_class = SecretariaSerializer


        
# Resposta
# class RespostaListCreateView(generics.ListCreateAPIView):
#     queryset = Resposta.objects.all()
#     serializer_class = RespostaSerializer
#     permission_classes = [IsAuthenticated]

# class RespostaDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Resposta.objects.all()
#     serializer_class = RespostaSerializer
#     permission_classes = [IsAuthenticated]

