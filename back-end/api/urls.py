from django.urls import path

from .resources.viewsInfo import ViewInfo
from .views import (
    EnderecoListCreateView, EnderecoDetailView,
    CidadaoListCreateView, CidadaoDetailView,
    PrefeituraListCreateView, PrefeituraDetailView,
    SecretariaListCreateView, SecretariaDetailView,
    PostagemListCreateView, PostagemDetailView,
    ManifestacaoListCreateView, ManifestacaoDetailView,
    RespostaListCreateView, RespostaDetailView, AdministradorListCreateView, AdministradorDetailView 
)

from .resources.viewsAuth import LogoutView
from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('info/', ViewInfo.as_view(), name='info'),


    # Endereco
    path('enderecos/', EnderecoListCreateView.as_view(), name='endereco-list-create'),
    path('enderecos/<int:pk>/', EnderecoDetailView.as_view(), name='endereco-detail'),

    # Cidadao
    path('cidadaos/', CidadaoListCreateView.as_view(), name='cidadao-list-create'),
    path('cidadaos/<int:pk>/', CidadaoDetailView.as_view(), name='cidadao-detail'),

    # Prefeitura
    path('prefeituras/', PrefeituraListCreateView.as_view(), name='prefeitura-list-create'),
    path('prefeituras/<int:pk>/', PrefeituraDetailView.as_view(), name='prefeitura-detail'),

    # Prefeitura
    path('administradores/', AdministradorListCreateView.as_view(), name='administrador-list-create'),
    path('administradores/<int:pk>/', AdministradorDetailView.as_view(), name='administrador-detail'),

    # Secretaria
    path('secretarias/', SecretariaListCreateView.as_view(), name='secretaria-list-create'),
    path('secretarias/<int:pk>/', SecretariaDetailView.as_view(), name='secretaria-detail'),

    # Postagem
    path('postagens/', PostagemListCreateView.as_view(), name='postagem-list-create'),
    path('postagens/<int:pk>/', PostagemDetailView.as_view(), name='postagem-detail'),

    # Manifestacao
    path('manifestacoes/', ManifestacaoListCreateView.as_view(), name='manifestacao-list-create'),
    path('manifestacoes/<int:pk>/', ManifestacaoDetailView.as_view(), name='manifestacao-detail'),

    # Resposta
    path('respostas/', RespostaListCreateView.as_view(), name='resposta-list-create'),
    path('respostas/<int:pk>/', RespostaDetailView.as_view(), name='resposta-detail'),
]
