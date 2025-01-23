from typing import Optional

def get_nome(usuario) -> Optional[str]:
    if usuario:
        if hasattr(usuario, 'cidadao'):
            return usuario.cidadao.nome
        elif hasattr(usuario, 'administrador'):
            return usuario.administrador.nome
        elif hasattr(usuario, 'prefeitura'):
            return usuario.prefeitura.cidade
        elif hasattr(usuario, 'orgao'):
            return usuario.orgao.nome
    return None

def get_tipo(usuario) -> Optional[str]:
    if usuario:
        if hasattr(usuario, 'cidadao'):
            return "Cidadão"
        elif hasattr(usuario, 'administrador'):
            return "Administrador"
        elif hasattr(usuario, 'prefeitura'):
            return "Prefeitura"
        elif hasattr(usuario, 'orgao'):
            return "Orgão Público"
    return None

def get_prefeitura_id(usuario) -> Optional[str]:
    """
    Retorna o ID da prefeitura relacionada ao órgão.
    Se o órgão for uma prefeitura, retorna o próprio ID.
    """
    if usuario:
        if hasattr(usuario, 'prefeitura'):
            return usuario.prefeitura.id
        elif hasattr(usuario, 'orgao'):
             return usuario.orgao.prefeitura_rel.id
    return None
    

def get_imagem_perfil(usuario) -> Optional[str]:
    """
    Retorna a URL da imagem do perfil do usuário, se houver.
    Verifica os diferentes tipos de relacionamento para encontrar a imagem.
    """
    if not usuario:
        return None

    # Lista de possíveis relações que podem ter imagem_perfil
    relacoes = ['cidadao', 'administrador', 'prefeitura', 'orgao']

    for relacao in relacoes:
        if hasattr(usuario, relacao):
            perfil = getattr(usuario, relacao)
            if perfil and getattr(perfil, 'imagem_perfil', None):
                return perfil.imagem_perfil.url

    return None
