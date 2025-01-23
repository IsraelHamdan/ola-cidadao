import os
import django
from faker import Faker
import random

# Configurações do Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "olacidadao.settings")  # Substitua 'seu_projeto' pelo nome do seu projeto
django.setup()

from api.models import Cidadao, Administrador, Prefeitura, Orgao, Postagem, Manifestacao, Resposta, Endereco

# Instância do Faker
faker = Faker(locale="pt_BR")  # Gera dados no formato brasileiro

def criar_endereco():
    """
    Gera um endereço único.
    """
    return Endereco.objects.create(
        # estado=faker.state(),
        estado="Bahia",
        cidade="Jequié",
        # cidade=faker.city()
        logradouro=faker.street_name(),
        numero=faker.building_number(),
        bairro=faker.city_suffix(),
        cep=faker.postcode()
    )

def criar_cidadaos(qtd=10):
    cidadaos = []
    for _ in range(qtd):
        endereco = criar_endereco()  # Gera um endereço para cada cidadão
        senha = "12345"  # Senha padrão para todos os cidadãos
        cidadao = Cidadao(
            email="cidadao@example.com",  # Email padrão para todos os cidadãos
            telefone=faker.phone_number().replace('(', '').replace(')', '').replace('-', '').replace(' ', ''),
            status=random.choice(["Ativo", "Inativo"]),
            nome=faker.name(),
            cpf=faker.cpf().replace('.', '').replace('-', ''),  # CPF sem pontos ou traços
            data_nascimento=faker.date_of_birth(minimum_age=18, maximum_age=80),
            endereco=endereco
        )
        cidadao.set_password(senha)  # Hasheia a senha
        cidadao.save()
        print(f"Cidadão criado com senha: {senha}")  # Mostra a senha gerada
        cidadaos.append(cidadao)
    print(f"{qtd} cidadãos criados!")
    return cidadaos

def criar_prefeituras(qtd=5):
    prefeituras = []
    for _ in range(qtd):
        endereco = criar_endereco()  # Gera um endereço para cada prefeitura
        senha = "12345"
        prefeitura = Prefeitura(
            email="prefeitura@example.com",
            telefone=faker.phone_number().replace('(', '').replace(')', '').replace('-', '').replace(' ', ''),
            status=random.choice(["Ativo"]),
            cidade="Jequié",
            descricao=faker.text(max_nb_chars=50),
            gestor=faker.name(),
            cnpj=faker.cnpj().replace('.', '').replace('-', '').replace('/', ''),  # CNPJ sem caracteres especiais
            endereco=endereco
        )
        prefeitura.set_password(senha)
        prefeitura.save()
        print(f"Prefeitura criada com senha: {senha}")
        prefeituras.append(prefeitura)
    print(f"{qtd} prefeituras criadas!")
    return prefeituras


def criar_orgaos(qtd=10, prefeituras=[]):
    orgaos = []
    for _ in range(qtd):
        endereco = criar_endereco()  # Gera um endereço para cada orgao
        # senha = faker.password()
        senha="12345"
        prefeitura = random.choice(prefeituras)
        orgao = Orgao(
            # email=faker.email(),
            email="secretaria@example.com",
            telefone=faker.phone_number().replace('(', '').replace(')', '').replace('-', '').replace(' ', ''),
            status=random.choice(["Ativo", "Inativo"]),
            nome="Secretaria de Educação",
            descricao=faker.text(max_nb_chars=50),
            prefeitura_rel=prefeitura,
            endereco=endereco
        )
        orgao.set_password(senha)
        orgao.save()
        print(f"Orgao criada com senha: {senha}")
        orgaos.append(orgao)
    print(f"{qtd} orgaos criadas!")
    return orgaos

def criar_postagens(qtd=20, prefeituras=[]):
    postagens = []
    for _ in range(qtd):
        prefeitura = random.choice(prefeituras)
        postagens.append(Postagem.objects.create(
            status=random.choice(["Publico", "Privado"]),
            conteudo=faker.text(max_nb_chars=200),
            prefeitura=prefeitura,
            qtd_up=random.randint(0, 100),
            qtd_down=random.randint(0, 100)
        ))
    print(f"{qtd} postagens criadas!")
    return postagens

def criar_manifestacoes(qtd=20, cidadaos=[], orgaos=[]):
    manifestacoes = []
    for _ in range(qtd):
        cidadao = random.choice(cidadaos)
        orgao = random.choice(orgaos)
        manifestacoes.append(Manifestacao.objects.create(
            tipo=random.choice(["Denuncia", "Ajuda", "Solicitacao", "Elogio", "Sugestao", "Esclarecimento"]),
            status=random.choice(["Publico", "Privado"]),
            conteudo=faker.text(max_nb_chars=280),
            cidadao=cidadao,
            orgao=orgao,
            qtd_up=random.randint(0, 50),
            qtd_down=random.randint(0, 50)
        ))
    print(f"{qtd} manifestações criadas!")
    return manifestacoes

def criar_respostas(qtd=50, manifestacoes=[], usuarios=[]):
    respostas = []
    for _ in range(qtd):
        manifestacao = random.choice(manifestacoes)
        usuario = random.choice(usuarios)
        respostas.append(Resposta.objects.create(
            conteudo=faker.text(max_nb_chars=280),
            manifestacao=manifestacao,
            usuario=usuario
        ))
    print(f"{qtd} respostas criadas!")
    return respostas

if __name__ == "__main__":
    # Criação de dados fake
    cidadaos = criar_cidadaos(1)
    prefeituras = criar_prefeituras(1)
    orgaos = criar_orgaos(1, prefeituras)
    postagens = criar_postagens(30, prefeituras)
    manifestacoes = criar_manifestacoes(30, cidadaos, orgaos)
    respostas = criar_respostas(50, manifestacoes, cidadaos + orgaos + prefeituras)
    #criar_respostas(50, manifestacoes, cidadaos + orgaos + prefeituras)
