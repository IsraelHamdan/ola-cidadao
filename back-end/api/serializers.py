from rest_framework import serializers
from .models import Endereco, Usuario, Cidadao, Prefeitura, Secretaria, Postagem, Manifestacao, Resposta, Administrador

class EnderecoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Endereco
        fields = '__all__'

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class CidadaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cidadao
        exclude = ['is_superuser'] 

class PrefeituraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prefeitura
        exclude = ['is_superuser'] 

class AdministradorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Administrador
        exclude = ['is_superuser'] 
        

class SecretariaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Secretaria
        fields = '__all__' 

class PostagemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Postagem
        fields = '__all__'

class ManifestacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manifestacao
        fields = '__all__'

class RespostaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resposta
        fields = '__all__'

class ViewInfoSerializer(serializers.Serializer):
    tipo_usuario = serializers.CharField()
    dados = serializers.DictField()

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()