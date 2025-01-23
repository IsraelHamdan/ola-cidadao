from rest_framework.permissions import BasePermission
from rest_framework.permissions import SAFE_METHODS, BasePermission

class IsCidadao(BasePermission):
    """
    Permissão que permite acesso apenas a cidadãos.
    """
    def has_permission(self, request, view):
        return hasattr(request.user, 'cidadao')

class IsAdministrador(BasePermission):
    """
    Permissão que permite acesso apenas a administradores.
    """
    def has_permission(self, request, view):
        return hasattr(request.user, 'administrador')


class IsPrefeitura(BasePermission):
    """
    Permissão que permite acesso apenas a prefeituras.
    """
    def has_permission(self, request, view):
        return hasattr(request.user, 'prefeitura')


class IsOrgao(BasePermission):
    """
    Permissão que permite acesso apenas a secretarias.
    """
    def has_permission(self, request, view):
        return hasattr(request.user, 'secretaria')


class IsAllowReader(BasePermission):
    """
    Permissão personalizada para permitir acesso público apenas a métodos de leitura (GET).
    """

    def has_permission(self, request, view):
        # Permitir acesso público para métodos de leitura (SAFE_METHODS inclui GET, HEAD e OPTIONS)
        if request.method in SAFE_METHODS:
            return True
        # Para outros métodos, exigir autenticação
        return request.user and request.user.is_authenticated
    
# Permissão personalizada
class IsCreatorOrReadOnly(BasePermission):
    """
    Permissão que permite apenas ao criador editar a postagem.
    Outros usuários podem apenas visualizar.
    """
    def has_object_permission(self, request, view, obj):
        # Permite leitura para todos os usuários autenticados
        if request.method in SAFE_METHODS:  # SAFE_METHODS inclui GET, HEAD, OPTIONS
            return True
        # Permite edição apenas ao criador (prefeitura)
        return request.user == obj.prefeitura