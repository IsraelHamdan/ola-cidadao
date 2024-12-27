from rest_framework import serializers
from typing import Optional
from ..models import Endereco, Usuario, Cidadao, Prefeitura, Secretaria, Postagem, Manifestacao, Resposta, Administrador
from drf_spectacular.utils import extend_schema_field
from drf_spectacular.types import OpenApiTypes
from rest_framework.views import APIView

class EnderecoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Endereco
        fields = '__all__'

class CidadaoSerializer(serializers.ModelSerializer):
    endereco = EnderecoSerializer()  # Serializer aninhado

    class Meta:
        model = Cidadao
        fields = ['id', 'nome', 'cpf', 'data_nascimento',  'email', 'telefone', 'password', 'endereco']
        

    def create(self, validated_data):
        # Extrair os dados do endereço do payload
        endereco_data = validated_data.pop('endereco')
        # Criar o endereço primeiro
        endereco = Endereco.objects.create(**endereco_data)
        # Criar o cidadão com o endereço relacionado
        return Cidadao.objects.create(endereco=endereco, **validated_data)
    
    def update(self, instance, validated_data):
        # Extrair os dados do endereço, se fornecidos
        endereco_data = validated_data.pop('endereco', None)

        # Atualizar os campos do cidadão
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Atualizar os campos do endereço, se fornecidos
        if endereco_data:
            endereco = instance.endereco
            for attr, value in endereco_data.items():
                setattr(endereco, attr, value)
            endereco.save()

        return instance


class AdministradorSerializer(serializers.ModelSerializer):
    endereco = EnderecoSerializer()

    class Meta:
        model = Administrador
        fields = ['id', 'nome', 'cpf', 'data_nascimento', 'email', 'telefone', 'password', 'endereco']

    def create(self, validated_data):
        endereco_data = validated_data.pop('endereco')
        endereco = Endereco.objects.create(**endereco_data)
        return Administrador.objects.create(endereco=endereco, **validated_data)

     
    def update(self, instance, validated_data):
        # Extrair os dados do endereço, se fornecidos
        endereco_data = validated_data.pop('endereco', None)

        # Atualizar os campos do cidadão
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Atualizar os campos do endereço, se fornecidos
        if endereco_data:
            endereco = instance.endereco
            for attr, value in endereco_data.items():
                setattr(endereco, attr, value)
            endereco.save()

        return instance

class PrefeituraSerializer(serializers.ModelSerializer):
    endereco = EnderecoSerializer()

    class Meta:
        model = Prefeitura
        fields = ['id', 'nome', 'descricao', 'gestor', 'cidade', 'email', 'telefone', 'password', 'endereco']

    def create(self, validated_data):
        endereco_data = validated_data.pop('endereco')
        endereco = Endereco.objects.create(**endereco_data)
        return Prefeitura.objects.create(endereco=endereco, **validated_data)

     
    def update(self, instance, validated_data):
        # Extrair os dados do endereço, se fornecidos
        endereco_data = validated_data.pop('endereco', None)

        # Atualizar os campos do cidadão
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Atualizar os campos do endereço, se fornecidos
        if endereco_data:
            endereco = instance.endereco
            for attr, value in endereco_data.items():
                setattr(endereco, attr, value)
            endereco.save()

        return instance
    
class SecretariaSerializer(serializers.ModelSerializer):
    endereco = EnderecoSerializer()

    class Meta:
        model = Secretaria
        fields = ['id', 'nome', 'descricao', 'email', 'telefone', 'prefeitura_rel', 'password', 'endereco']

    def create(self, validated_data):
        endereco_data = validated_data.pop('endereco')
        endereco = Endereco.objects.create(**endereco_data)
        return Secretaria.objects.create(endereco=endereco, **validated_data)
    
     
    def update(self, instance, validated_data):
        # Extrair os dados do endereço, se fornecidos
        endereco_data = validated_data.pop('endereco', None)

        # Atualizar os campos do cidadão
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Atualizar os campos do endereço, se fornecidos
        if endereco_data:
            endereco = instance.endereco
            for attr, value in endereco_data.items():
                setattr(endereco, attr, value)
            endereco.save()

        return instance
    
class PostagemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Postagem
        fields = ['id', 'conteudo', 'imagem', 'data_criacao', 'status', 'qtd_up', 'qtd_down', 'prefeitura', 'imagem']
        read_only_fields = ['prefeitura', 'data_criacao', 'qtd_up', 'qtd_down', 'status']

class ManifestacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manifestacao
        fields = ['id', 'tipo', 'conteudo', 'data_criacao', 'status', 'qtd_up', 'qtd_down', 'secretaria', 'imagem']
        read_only_fields = ['data_criacao', 'qtd_up', 'qtd_down', 'status']


class RespostaSerializer(serializers.ModelSerializer):
    nome_usuario = serializers.SerializerMethodField()

    class Meta:
        model = Resposta
        fields = ['id', 'conteudo', 'manifestacao', 'nome_usuario', 'data_criacao']
        read_only_fields = ['data_criacao', 'nome_usuario']

    @extend_schema_field(str)
    def get_nome_usuario(self, obj) -> Optional[str]:
        return obj.usuario.email if obj.usuario else None


# Serializer para criação (POST)
class RespostaCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resposta
        fields = ['id', 'conteudo', 'manifestacao', 'usuario', 'data_criacao']
        read_only_fields = ['data_criacao', 'usuario']


# Serializer para atualização (PUT/PATCH)
class RespostaUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resposta
        fields = ['id', 'conteudo']


class ManifestacaoRespostasSerializer(serializers.ModelSerializer):
    respostas = RespostaSerializer(many=True, read_only=True)

    class Meta:
        model = Manifestacao
        fields = ['id', 'tipo', 'conteudo', 'data_criacao', 'status', 'qtd_up', 'qtd_down', 'cidadao', 'secretaria', 'respostas']
        read_only_fields = ['data_criacao', 'qtd_up', 'qtd_down']


class RespostaPorManifestacaoSerializer(serializers.ModelSerializer):
    nome_usuario = serializers.SerializerMethodField()

    class Meta:
        model = Resposta
        fields = ['id', 'conteudo', 'data_criacao', 'nome_usuario']
        read_only_fields = ['data_criacao', 'nome_usuario']

    @extend_schema_field(str)
    def get_nome_usuario(self, obj) -> Optional[str]:
        return obj.usuario.email if obj.usuario else None


class ViewInfoSerializer(serializers.Serializer):
    tipo_usuario = serializers.CharField()
    dados = serializers.DictField()

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()