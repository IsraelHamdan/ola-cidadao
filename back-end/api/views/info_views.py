from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..serializers.serializers import ViewInfoSerializer

class ViewInfo(APIView):
    """
    Retorna o tipo de usuário logado e suas informações básicas.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = ViewInfoSerializer

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

        # Usando o serializador para formatar os dados
        response_data = {"tipo_usuario": tipo, "dados": dados}
        serializer = self.serializer_class(data=response_data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data)
