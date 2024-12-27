from rest_framework.permissions import BasePermission

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


class IsSecretaria(BasePermission):
    """
    Permissão que permite acesso apenas a secretarias.
    """
    def has_permission(self, request, view):
        return hasattr(request.user, 'secretaria')
