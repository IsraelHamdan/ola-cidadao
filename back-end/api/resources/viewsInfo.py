from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

class ViewInfo(APIView):
    """
    Retorna o tipo de usuário logado e suas informações básicas.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        usuario = request.user

        if hasattr(usuario, 'cidadao'):
            tipo = "Cidadão"
            dados = {
                "nome": usuario.cidadao.nome,
                "cpf": usuario.cidadao.cpf,
                "data_nascimento": usuario.cidadao.data_nascimento,
            }
        elif hasattr(usuario, 'administrador'):
            tipo = "Administrador"
            dados = {
                "nome": usuario.administrador.nome,
                "cpf": usuario.administrador.cpf,
                "data_nascimento": usuario.administrador.data_nascimento,
            }
        elif hasattr(usuario, 'prefeitura'):
            tipo = "Prefeitura"
            dados = {
                "gestor": usuario.prefeitura.gestor,
                "cidade": usuario.prefeitura.cidade,
                "cnpj": usuario.prefeitura.cnpj,
            }
        elif hasattr(usuario, 'secretaria'):
            tipo = "Secretaria"
            dados = {
                "nome": usuario.secretaria.nome,
                "descricao": usuario.secretaria.descricao,
            }
        else:
            tipo = "Desconhecido"
            dados = {}

        return Response({
            "tipo_usuario": tipo,
            "dados": dados,
        })