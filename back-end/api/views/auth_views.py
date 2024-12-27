from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..serializers.serializers import LogoutSerializer

class LogoutView(APIView):
    """
    View para realizar logout do usuário invalidando o token de refresh.
    """
    serializer_class = LogoutSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        refresh_token = serializer.validated_data["refresh"]
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(
                {"message": "Logout realizado com sucesso."},
                status=status.HTTP_205_RESET_CONTENT,
            )
        except Exception as e:
            return Response(
                {"error": f"Falha ao realizar logout: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )
