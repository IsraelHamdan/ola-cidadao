from rest_framework import serializers
from typing import Optional
from ..models import Endereco, Usuario, Cidadao, Prefeitura, Orgao, Postagem, Manifestacao, Resposta, Administrador
from drf_spectacular.utils import extend_schema_field
from drf_spectacular.types import OpenApiTypes
from rest_framework.views import APIView
from ..utils.username import get_imagem_perfil, get_nome, get_prefeitura_id, get_tipo

class EnderecoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Endereco
        fields = '__all__'

class CidadaoSerializer(serializers.ModelSerializer):
    endereco = EnderecoSerializer()  # Serializer aninhado
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Cidadao
        fields = ['id', 'nome', 'cpf', 'data_nascimento',  'email', 'telefone', 'password','imagem_perfil', 'imagem_background', 'endereco']
        read_only_fields = ['id', 'password']


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
    password = serializers.CharField(write_only=True)


    class Meta:
        model = Administrador
        fields = ['id', 'nome', 'cpf', 'data_nascimento', 'email', 'telefone', 'password', 'imagem_perfil', 'imagem_background', 'endereco']

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
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Prefeitura
        fields = ['id', 'cidade', 'descricao', 'gestor', 'email', 'telefone', 'password', 'cnpj', 'imagem_perfil', 'imagem_background', 'endereco']

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

class OrgaoSerializer(serializers.ModelSerializer):
    endereco = EnderecoSerializer()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Orgao
        fields = ['id', 'nome', 'descricao', 'email', 'telefone', 'prefeitura_rel', 'password', 'imagem_perfil', 'imagem_background', 'endereco']
        read_only_fields = ['prefeitura_rel']

    def create(self, validated_data):
        endereco_data = validated_data.pop('endereco')
        endereco = Endereco.objects.create(**endereco_data)
        return Orgao.objects.create(endereco=endereco, **validated_data)
    
     
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

class OrgaoNomeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Orgao
        fields = ['id', 'nome']  
        read_only_fields = ['nome']

class PrefeituraNomeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Prefeitura
        fields = ['id', 'cidade']  
        read_only_fields = ['nome']
 
class PostagemSerializer(serializers.ModelSerializer):
    nome_prefeitura = serializers.SerializerMethodField()

    class Meta:
        model = Postagem
        fields = ['id', 'conteudo', 'data_criacao', 'status', 'qtd_up', 'qtd_down', 'prefeitura', 'nome_prefeitura', 'imagem']
        read_only_fields = ['prefeitura', 'data_criacao', 'qtd_up', 'qtd_down', 'status','nome_prefeitura']

    @extend_schema_field(str)
    def get_nome_prefeitura(self, obj) -> Optional[str]:
        return get_nome(obj.prefeitura)
    
class ManifestacaoSerializer(serializers.ModelSerializer):
    nome_orgao = serializers.SerializerMethodField()
    nome_cidadao = serializers.SerializerMethodField()
    prefeitura = serializers.SerializerMethodField()
    
    class Meta:
        model = Manifestacao
        fields = ['id', 'tipo', 'conteudo', 'data_criacao', 'status', 'qtd_up', 'qtd_down', 'cidadao', 'prefeitura','nome_cidadao', 'orgao', 'nome_orgao',  'imagem']
        read_only_fields = ['data_criacao', 'qtd_up', 'qtd_down', 'status', 'nome_orgao', 'cidadao', 'prefeitura_rel']

    @extend_schema_field(str)
    def get_nome_cidadao(self, obj) -> Optional[str]:
        return get_nome(obj.cidadao)
    
    @extend_schema_field(str)
    def get_nome_orgao(self, obj) -> Optional[str]:
        return get_nome(obj.orgao)   
         
    def get_prefeitura(self, obj) -> Optional[str]:
        return get_prefeitura_id(obj.orgao) 


class RespostaSerializer(serializers.ModelSerializer):
    nome_usuario = serializers.SerializerMethodField()
    tipo_usuario = serializers.SerializerMethodField()
    imagem = serializers.SerializerMethodField()


    class Meta:
        model = Resposta
        fields = ['id', 'conteudo', 'manifestacao', 'usuario', 'nome_usuario', 'tipo_usuario', 'data_criacao', 'imagem']
        read_only_fields = ['data_criacao', 'nome_usuario', 'tipo_usuario', 'imagem_perfil']

    @extend_schema_field(str)
    def get_nome_usuario(self, obj) -> Optional[str]:
        return get_nome(obj.usuario)
    
    @extend_schema_field(str)
    def get_tipo_usuario(self, obj) -> Optional[str]:
        return get_tipo(obj.usuario)
    
    @extend_schema_field(str)
    def get_imagem(self, obj) -> Optional[str]:
        return get_imagem_perfil(obj.usuario)


# Serializer para criação (POST)
class RespostaCreateSerializer(serializers.ModelSerializer):
    nome_usuario = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Resposta
        fields = ['id', 'conteudo', 'manifestacao', 'usuario', 'data_criacao', 'nome_usuario']
        read_only_fields = ['data_criacao', 'usuario', 'nome_usuario']

    @extend_schema_field(str)
    def get_nome_usuario(self, obj) -> Optional[str]:
        return get_nome(obj.usuario)


# Serializer para atualização (PUT/PATCH)
class RespostaUpdateSerializer(serializers.ModelSerializer):
    nome_usuario = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Resposta
        fields = ['id', 'conteudo', 'usuario', 'data_criacao', 'nome_usuario']
        read_only_fields = ['data_criacao', 'usuario', 'nome_usuario']

    @extend_schema_field(str)
    def get_nome_usuario(self, obj) -> Optional[str]:
        return get_nome(obj.usuario)


class ManifestacaoRespostasSerializer(serializers.ModelSerializer):
    nome_cidadao = serializers.SerializerMethodField()
    nome_orgao = serializers.SerializerMethodField()
    respostas = RespostaSerializer(many=True, read_only=True)
    prefeitura = serializers.SerializerMethodField()

    class Meta:
        model = Manifestacao
        fields = ['id', 'tipo', 'conteudo', 'data_criacao', 'status', 'qtd_up', 'qtd_down', 'cidadao', 'nome_cidadao', 'prefeitura', 'orgao', 'nome_orgao', 'imagem', 'respostas']
        read_only_fields = ['data_criacao', 'qtd_up', 'qtd_down']
    
    @extend_schema_field(str)
    def get_nome_cidadao(self, obj) -> Optional[str]:
        return get_nome(obj.cidadao)
    
    @extend_schema_field(str)
    def get_nome_orgao(self, obj) -> Optional[str]:
        return get_nome(obj.orgao)    
    
    def get_prefeitura(self, obj) -> Optional[str]:
        return get_prefeitura_id(obj.orgao) 

class RespostaPorManifestacaoSerializer(serializers.ModelSerializer):
    nome_usuario = serializers.SerializerMethodField()

    class Meta:
        model = Resposta
        fields = ['id', 'conteudo', 'data_criacao', 'usuario', 'nome_usuario']
        read_only_fields = ['data_criacao', 'nome_usuario']

    @extend_schema_field(str)
    def get_nome_usuario(self, obj) -> Optional[str]:
        return get_nome(obj.usuario)

    
class ViewInfoSerializer(serializers.Serializer):
    tipo_usuario = serializers.CharField()
    dados = serializers.DictField()

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

class ManifestacaoRespostasSerializer(serializers.ModelSerializer):
    nome_cidadao = serializers.SerializerMethodField()
    nome_orgao = serializers.SerializerMethodField()
    respostas = RespostaSerializer(many=True, read_only=True)
    prefeitura = serializers.SerializerMethodField()

    class Meta:
        model = Manifestacao
        fields = ['id', 'tipo', 'conteudo', 'data_criacao', 'status', 'qtd_up', 'qtd_down', 'cidadao', 'nome_cidadao', 'prefeitura', 'orgao', 'nome_orgao', 'imagem', 'respostas']
        read_only_fields = ['data_criacao', 'qtd_up', 'qtd_down']
    
    @extend_schema_field(str)
    def get_nome_cidadao(self, obj) -> Optional[str]:
        return get_nome(obj.cidadao)
    
    @extend_schema_field(str)
    def get_nome_orgao(self, obj) -> Optional[str]:
        return get_nome(obj.orgao)    
    
    def get_prefeitura(self, obj) -> Optional[str]:
        return get_prefeitura_id(obj.orgao) 

