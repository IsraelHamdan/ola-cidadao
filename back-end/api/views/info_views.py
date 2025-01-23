from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView

from ..utils.permissions import IsAllowReader
from ..models import Orgao, Prefeitura
from ..serializers.serializers import OrgaoNomeSerializer, PrefeituraNomeSerializer, ViewInfoSerializer

class ViewInfo(APIView):
    """
    Retorna o tipo de usuário logado e suas informações básicas.
    """
    serializer_class = ViewInfoSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        usuario = request.user

        if hasattr(usuario, 'cidadao'):
            tipo = "Cidadão"
            dados = {
                "nome": usuario.cidadao.nome,
                "cpf": usuario.cidadao.cpf,
                "data_nascimento": usuario.cidadao.data_nascimento,
                "email": usuario.cidadao.email,
            }
        elif hasattr(usuario, 'administrador'):
            tipo = "Administrador"
            dados = {
                "nome": usuario.administrador.nome,
                "cpf": usuario.administrador.cpf,
                "data_nascimento": usuario.administrador.data_nascimento,
                "email": usuario.administrador.email,
            }
        elif hasattr(usuario, 'prefeitura'):
            tipo = "Prefeitura"
            dados = {
                "gestor": usuario.prefeitura.gestor,
                "cidade": usuario.prefeitura.cidade,
                "cnpj": usuario.prefeitura.cnpj,
                "email": usuario.prefeitura.email,
            }
        elif hasattr(usuario, 'orgao'):
            tipo = "Orgao"
            dados = {
                "nome": usuario.orgao.nome,
                "descricao": usuario.orgao.descricao,
                "email": usuario.orgao.email,
            }
        else:
            tipo = "Desconhecido"
            dados = {}

        # Usando o serializador para formatar os dados
        response_data = {"tipo_usuario": tipo, "dados": dados}
        serializer = self.serializer_class(data=response_data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data)

class ViewOrgaosNomes(ListAPIView):
    queryset = Orgao.objects.all()
    serializer_class = OrgaoNomeSerializer
    permission_classes = [IsAllowReader]
    pagination_class = None
    
class ViewPrefeiturasNomes(ListAPIView):
    queryset = Prefeitura.objects.all()
    serializer_class = PrefeituraNomeSerializer
    permission_classes = [IsAllowReader]
    pagination_class = None
   