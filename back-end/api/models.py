from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class UsuarioManager(BaseUserManager):
    def create_user(self, email, senha=None, **extra_fields):
        if not email:
            raise ValueError("O campo email é obrigatório.")
        if not senha:
            raise ValueError("O campo senha é obrigatório.")
        
        # Normaliza o email e hasheia a senha
        email = self.normalize_email(email)
        usuario = self.model(email=email, **extra_fields)
        usuario.set_password(senha)  # Hasheia a senha
        usuario.save(using=self._db)
        return usuario


    # def create_superuser(self, email, senha=None, **extra_fields):
    #     """
    #     Cria e retorna um superusuário com permissões de administrador.
    #     """
    #     extra_fields.setdefault('is_staff', True)
    #     extra_fields.setdefault('is_superuser', True)

    #     if extra_fields.get('is_staff') is not True:
    #         raise ValueError("O superusuário precisa ter is_staff=True.")
    #     if extra_fields.get('is_superuser') is not True:
    #         raise ValueError("O superusuário precisa ter is_superuser=True.")

    #     return self.create_user(email, senha, **extra_fields)


class Usuario(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    telefone = models.CharField(max_length=15, blank=True, null=True)
    status = models.BooleanField(default=True)
    data_criacao = models.DateTimeField(auto_now_add=True)
    endereco = models.ForeignKey('Endereco', on_delete=models.SET_NULL, null=True, blank=True)
    is_active = models.BooleanField(default=True)  # Necessário para autenticação
    # is_staff = models.BooleanField(default=False)  # Necessário para Django Admin

    objects = UsuarioManager()

    # Sobrescrevendo campos do PermissionsMixin
    groups = None
    user_permissions = None

    USERNAME_FIELD = 'email'  # Identificador único para login
    REQUIRED_FIELDS = []

    def save(self, *args, **kwargs):
        """
        Sobrescreve o método save para garantir que senhas definidas diretamente sejam hasheadas.
        """
        # Se a senha foi definida e não está hasheada, aplicar o hasheamento
        if self.password and not self.password.startswith('pbkdf2_'):
            self.set_password(self.password)
        super().save(*args, **kwargs)


class Cidadao(Usuario):
    nome = models.CharField(max_length=255)
    cpf = models.CharField(max_length=14, unique=True)
    data_nascimento = models.DateField()
    

class Administrador(Usuario):
    nome = models.CharField(max_length=255)
    cpf = models.CharField(max_length=14, unique=True)
    data_nascimento = models.DateField()
    
class Prefeitura(Usuario):
    gestor = models.CharField(max_length=255)
    cidade = models.CharField(max_length=100)
    cnpj = models.CharField(max_length=18, unique=True)
    periodo_mandato = models.CharField(max_length=100, null=True, blank=True)

class Secretaria(Usuario):
    nome = models.CharField(max_length=255)
    descricao = models.CharField(max_length=255)
    tipo = "Secretaria"


class Endereco(models.Model):
    estado = models.CharField(max_length=100)
    cidade = models.CharField(max_length=100)
    logradouro = models.CharField(max_length=255)
    numero = models.CharField(max_length=20)
    bairro = models.CharField(max_length=100)
    cep = models.CharField(max_length=20)


class Postagem(models.Model):
    conteudo = models.TextField()
    data_criacao = models.DateTimeField(auto_now_add=True)
    prefeitura = models.ForeignKey(Prefeitura, on_delete=models.CASCADE)

class Manifestacao(models.Model):
    TIPO_CHOICES = [
        ('Denuncia', 'Denúncia'),
        ('Ajuda', 'Ajuda'),
    ]
    tipo = models.CharField(max_length=50, choices=TIPO_CHOICES)
    conteudo = models.TextField()
    data_criacao = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=100)
    qtd_up = models.PositiveIntegerField(default=0)
    qtd_down = models.PositiveIntegerField(default=0)
    cidadao = models.ForeignKey(Cidadao, on_delete=models.CASCADE)
    secretaria = models.ForeignKey(Secretaria, on_delete=models.CASCADE, null=True, blank=True)

class Resposta(models.Model):
    conteudo = models.TextField()
    data_criacao = models.DateTimeField(auto_now_add=True)
    manifestacao = models.ForeignKey(Manifestacao, on_delete=models.CASCADE)
    secretaria = models.ForeignKey(Secretaria, on_delete=models.CASCADE)

