from django.db import models

# Create your models here.

class Usuario(models.Model):
    email = models.EmailField(max_length=255, unique=True)
    senha = models.CharField(max_length=255)
    status = models.CharField(max_length=255)
    telefone = models.CharField(max_length=15)
    data_criacao = models.DateField(auto_now_add=True)

    class Meta:
        db_table = 'USUARIO'


class Endereco(models.Model):
    logradouro = models.CharField(max_length=255)
    cidade = models.CharField(max_length=255)
    estado = models.CharField(max_length=255)
    numero = models.CharField(max_length=10)
    bairro = models.CharField(max_length=255)
    cep = models.CharField(max_length=10)

    class Meta:
        db_table = 'ENDERECO'


class Cidadao(models.Model):
    MASCULINO = "M"
    FEMININO = "F"
    ESCOLHA_GENERO = (
        (MASCULINO, "M"),
        (FEMININO, "M"),
    )
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, primary_key=True)
    data_nasc = models.DateField()
    sexo = models.CharField(
        max_length=2,
        choices=ESCOLHA_GENERO,
        default=MASCULINO,
    )
    nome = models.CharField(max_length=255)
    cpf = models.CharField(max_length=14, unique=True)
    endereco = models.ForeignKey(Endereco, on_delete=models.CASCADE)

    class Meta:
        db_table = 'CIDADAO'


class Prefeitura(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, primary_key=True)
    periodo_mandato = models.CharField(max_length=255)
    gestor = models.CharField(max_length=255)
    cidade = models.CharField(max_length=255)
    cnpj = models.CharField(max_length=17, unique=True)

    class Meta:
        db_table = 'PREFEITURA'


class Secretaria(models.Model):
    id = models.AutoField(primary_key=True)
    secretario = models.CharField(max_length=255)
    data_criacao = models.DateField(auto_now_add=True)
    prefeitura = models.ForeignKey(Prefeitura, on_delete=models.CASCADE)

    class Meta:
        db_table = 'SECRETARIA'


class Manifestacao(models.Model):
    conteudo = models.TextField()
    qtd_up = models.IntegerField()
    qtd_down = models.IntegerField()
    data_criacao = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=255)
    cidadao = models.ForeignKey(Cidadao, on_delete=models.CASCADE)
    secretaria = models.ForeignKey(Secretaria, on_delete=models.CASCADE)

    class Meta:
        db_table = 'MANIFESTACAO'


class Avaliacao(models.Model):
    cidadao = models.ForeignKey(Cidadao, on_delete=models.CASCADE)
    manifestacao = models.ForeignKey(Manifestacao, on_delete=models.CASCADE)
    tipo = models.CharField(max_length=255)

    class Meta:
        db_table = 'AVALIACAO'
        unique_together = (('cidadao', 'manifestacao'),)


class Denuncia(models.Model):
    cidadao = models.ForeignKey(Cidadao, on_delete=models.CASCADE)
    manifestacao = models.ForeignKey(Manifestacao, on_delete=models.CASCADE)
    conteudo = models.TextField()
    data_criacao = models.DateField(auto_now_add=True)

    class Meta:
        db_table = 'DENUNCIA'
        unique_together = (('cidadao', 'manifestacao'),)


class Resposta(models.Model):
    manifestacao = models.ForeignKey(Manifestacao, on_delete=models.CASCADE)
    secretaria = models.ForeignKey(Secretaria, on_delete=models.CASCADE)
    conteudo = models.TextField()
    data_criacao = models.DateField(auto_now_add=True)

    class Meta:
        db_table = 'RESPOSTA'
        unique_together = (('manifestacao', 'secretaria'),)


class Postagem(models.Model):
    conteudo = models.TextField()
    data_criacao = models.DateField(auto_now_add=True)
    prefeitura = models.ForeignKey(Prefeitura, on_delete=models.CASCADE)

    class Meta:
        db_table = 'POSTAGEM'


class Admin(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, primary_key=True)

    class Meta:
        db_table = 'ADMIN'
