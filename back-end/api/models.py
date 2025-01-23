from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.core.exceptions import ValidationError
from django.db import models

def validate_imagem(imagem):
    if not imagem.name.lower().endswith(('jpg', 'jpeg', 'png')):  # Garante a verificação com letras minúsculas
        raise ValidationError('Apenas arquivos JPG, JPEG e PNG são permitidos.')
    
def validate_tamanho(imagem):
    max_tamanho = 5 * 1024 * 1024  # 2 MB
    if imagem.size > max_tamanho:
        raise ValidationError('O tamanho do arquivo não pode exceder 5 MB.')


class UsuarioManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("O campo email é obrigatório.")
        if not password:
            raise ValueError("O campo senha é obrigatório.")
        
        # Normaliza o email e hasheia a senha
        email = self.normalize_email(email)
        usuario = self.model(email=email, **extra_fields)
        usuario.set_password(password)  # Hasheia a senha
        usuario.save(using=self._db)
        return usuario


class Usuario(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, max_length=254, null=False, blank=False)
    telefone = models.CharField(max_length=15, blank=True, null=True)
    status = models.CharField(max_length=15)
    data_criacao = models.DateTimeField(auto_now_add=True)
    endereco = models.ForeignKey('Endereco', on_delete=models.CASCADE, null=True, blank=True)
    is_active = models.BooleanField(default=True)  # Necessário para autenticação
    # is_staff = models.BooleanField(default=False)  # Necessário para Django Admin
    imagem_perfil = models.ImageField(
    upload_to='perfil/',
    null=True,
    blank=True,
    validators=[validate_imagem, validate_tamanho]
    )
    imagem_background = models.ImageField(
    upload_to='background/',
    null=True,
    blank=True,
    validators=[validate_imagem, validate_tamanho]
    )

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
    nome = models.CharField(max_length=255, null=False, blank=False)
    cpf = models.CharField(max_length=14, unique=True, null=False, blank=False)
    data_nascimento = models.DateField(null=False, blank=False)

    class Meta:
        ordering = ['nome']  # Ordena por nome crescente
    

class Administrador(Usuario):
    nome = models.CharField(max_length=255, null=False, blank=False)
    cpf = models.CharField(max_length=14, unique=True, null=False, blank=False)
    data_nascimento = models.DateField(null=False, blank=False)

    class Meta:
        ordering = ['nome']  # Ordena por nome crescente
    
class Prefeitura(Usuario):
    cidade = models.CharField(max_length=255, null=False, blank=False, unique=True)
    descricao = models.CharField(max_length=255, null=True, blank=True)
    gestor = models.CharField(max_length=255)
    cnpj = models.CharField(max_length=18, unique=True, blank=False, null=False)

    class Meta:
        ordering = ['cidade']  # Ordena por nome crescente

class Orgao(Usuario):
    nome = models.CharField(max_length=255, null=False, blank=False)
    descricao = models.CharField(max_length=255, null=True, blank=True)
    prefeitura_rel = models.ForeignKey(Prefeitura, on_delete=models.CASCADE, related_name="orgaos")

    class Meta:
        ordering = ['nome']  # Ordena por nome crescente

class Endereco(models.Model):
    estado = models.CharField(max_length=100)
    cidade = models.CharField(max_length=100)
    logradouro = models.CharField(max_length=255)
    numero = models.CharField(max_length=20)
    bairro = models.CharField(max_length=100)
    cep = models.CharField(max_length=20)


class Postagem(models.Model):
    STATUS_CHOICES = [
        ('Publico', 'Público'),
        ('Privado', 'Privado'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Publico', null=True, blank=True)
    conteudo = models.TextField(null=False, blank=False, max_length=25000)
    data_criacao = models.DateTimeField(auto_now_add=True)
    prefeitura = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='postagens')
    qtd_up = models.PositiveIntegerField(default=0)
    qtd_down = models.PositiveIntegerField(default=0)
    imagem = models.ImageField(
    upload_to='postagem/',
    null=True,
    blank=True,
    validators=[validate_imagem, validate_tamanho]
    )

    class Meta:
        ordering = ['-data_criacao']  # Ordena por data de criação decrescente


class Manifestacao(models.Model):
    TIPO_CHOICES = [
        ('Denuncia', 'Denúncia'),
        ('Ajuda', 'Ajuda'),
        ('Solicitacao', 'Solicitação'),
        ('Elogio', 'Elogio'),
        ('Sugestao', 'Sugestão'),
        ('Esclarecimento', 'Esclarecimento')
    ]
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    STATUS_CHOICES = [
        ('Publico', 'Público'),
        ('Privado', 'Privado'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Publico', null=True, blank=True)
    conteudo = models.TextField(null=False, blank=False, max_length=400)
    data_criacao = models.DateTimeField(auto_now_add=True)
    qtd_up = models.PositiveIntegerField(default=0)
    qtd_down = models.PositiveIntegerField(default=0)
    cidadao = models.ForeignKey(Cidadao, on_delete=models.CASCADE)
    orgao = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='manifestacoes')
    imagem = models.ImageField(
    upload_to='manifestacao/',
    null=True,
    blank=True,
    validators=[validate_imagem, validate_tamanho]
    )
    class Meta:
        ordering = ['-data_criacao']  # Ordena por data de criação decrescente

class Resposta(models.Model):
    conteudo = models.TextField(null=False, blank=False, max_length=280)
    data_criacao = models.DateTimeField(auto_now_add=True)
    manifestacao = models.ForeignKey(
        Manifestacao,
        on_delete=models.CASCADE,
        related_name='respostas'  # Adicionado o related_name
    )
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='respostas')

    class Meta:
        ordering = ['-data_criacao']  # Ordena por data de criação decrescente


