from rest_framework import serializers
from .models import (
    Usuario, Endereco, Cidadao, Prefeitura, Secretaria,
    Manifestacao, Avaliacao, Denuncia, Resposta, Postagem, Admin
)

# Serializador para o Endereço
class EnderecoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Endereco
        fields = ['id', 'logradouro', 'cidade', 'estado', 'numero', 'bairro', 'cep']
        read_only_fields = ['id']


# Serializador para o Usuário
class UsuarioSerializer(serializers.ModelSerializer):
    endereco = EnderecoSerializer(required=False)  # Inclui o endereço do usuário

    class Meta:
        model = Usuario
        fields = ['id', 'email', 'status', 'telefone', 'is_active', 'is_staff', 'data_criacao', 'endereco']
        read_only_fields = ['id', 'is_active', 'is_staff', 'data_criacao']

    def create(self, validated_data):
        endereco_data = validated_data.pop('endereco', None)
        usuario = Usuario.objects.create(**validated_data)
        if endereco_data:
            Endereco.objects.create(usuario=usuario, **endereco_data)
        return usuario

    def update(self, instance, validated_data):
        endereco_data = validated_data.pop('endereco', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if endereco_data:
            Endereco.objects.update_or_create(usuario=instance, defaults=endereco_data)
        return instance


# Serializador para o Cidadão
class CidadaoSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer()  # Inclui as informações do usuário

    class Meta:
        model = Cidadao
        fields = ['usuario', 'data_nasc', 'sexo', 'nome', 'cpf', 'endereco']
        read_only_fields = ['usuario']


# Serializador para a Prefeitura
class PrefeituraSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer()  # Inclui as informações do usuário

    class Meta:
        model = Prefeitura
        fields = ['usuario', 'periodo_mandato', 'gestor', 'cidade', 'cnpj']
        read_only_fields = ['usuario']


# Serializador para a Secretaria
class SecretariaSerializer(serializers.ModelSerializer):
    prefeitura = PrefeituraSerializer()  # Inclui as informações da prefeitura

    class Meta:
        model = Secretaria
        fields = ['id', 'secretario', 'data_criacao', 'prefeitura']
        read_only_fields = ['id', 'data_criacao']


# Serializador para a Manifestação
class ManifestacaoSerializer(serializers.ModelSerializer):
    cidadao = CidadaoSerializer()  # Inclui as informações do cidadão
    secretaria = SecretariaSerializer()  # Inclui as informações da secretaria

    class Meta:
        model = Manifestacao
        fields = ['id', 'conteudo', 'qtd_up', 'qtd_down', 'data_criacao', 'status', 'cidadao', 'secretaria']
        read_only_fields = ['id', 'data_criacao']


# Serializador para a Avaliação
class AvaliacaoSerializer(serializers.ModelSerializer):
    cidadao = CidadaoSerializer()  # Inclui as informações do cidadão
    manifestacao = ManifestacaoSerializer()  # Inclui as informações da manifestação

    class Meta:
        model = Avaliacao
        fields = ['id', 'cidadao', 'manifestacao', 'tipo']
        read_only_fields = ['id']


# Serializador para a Denúncia
class DenunciaSerializer(serializers.ModelSerializer):
    cidadao = CidadaoSerializer()  # Inclui as informações do cidadão
    manifestacao = ManifestacaoSerializer()  # Inclui as informações da manifestação

    class Meta:
        model = Denuncia
        fields = ['id', 'cidadao', 'manifestacao', 'conteudo', 'data_criacao']
        read_only_fields = ['id', 'data_criacao']


# Serializador para a Resposta
class RespostaSerializer(serializers.ModelSerializer):
    manifestacao = ManifestacaoSerializer()  # Inclui as informações da manifestação
    secretaria = SecretariaSerializer()  # Inclui as informações da secretaria

    class Meta:
        model = Resposta
        fields = ['id', 'manifestacao', 'secretaria', 'conteudo', 'data_criacao']
        read_only_fields = ['id', 'data_criacao']


# Serializador para a Postagem
class PostagemSerializer(serializers.ModelSerializer):
    prefeitura = PrefeituraSerializer()  # Inclui as informações da prefeitura

    class Meta:
        model = Postagem
        fields = ['id', 'conteudo', 'data_criacao', 'prefeitura']
        read_only_fields = ['id', 'data_criacao']


# Serializador para o Admin
class AdminSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer()  # Inclui as informações do usuário

    class Meta:
        model = Admin
        fields = ['usuario']
        read_only_fields = ['usuario']