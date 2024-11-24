from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# Create your models here.

class UsuarioManager(BaseUserManager):
    def create_user(self, email, senha=None, **extra_fields):
        if not email:
            raise ValueError("O email é obrigatório")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(senha)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, senha=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError("Superusuário deve ter is_staff=True.")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError("Superusuário deve ter is_superuser=True.")

        return self.create_user(email, senha, **extra_fields)


class Usuario(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    status = models.CharField(max_length=255)
    telefone = models.CharField(max_length=15, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    data_criacao = models.DateTimeField(auto_now_add=True)

    # Adicionando related_name para evitar conflito
    groups = models.ManyToManyField(
        'auth.Group',
        related_name="usuario_groups",  # Nome customizado do acessor reverso
        blank=True,
        help_text="Os grupos aos quais este usuário pertence.",
        verbose_name="grupos",
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name="usuario_permissions",  # Nome customizado do acessor reverso
        blank=True,
        help_text="As permissões específicas para este usuário.",
        verbose_name="permissões de usuário",
    )

    objects = UsuarioManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nome']

    class Meta:
        db_table = 'USUARIO'

    def __str__(self):
        return self.email

class Endereco(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, related_name="endereco")
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
