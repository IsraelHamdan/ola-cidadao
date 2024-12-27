from django.urls import path
from rest_framework.routers import DefaultRouter
from .views.info_views import ViewInfo
from django.conf import settings
from django.conf.urls.static import static

from .views.user_views import (
    AdministradorViewSet, CidadaoCreateView, CidadaoViewSet,    
    PrefeituraViewSet, 
    SecretariaViewSet 
)

from .views.posts_view import (
    PostagemViewSet,
    RespostasPorManifestacaoView,   
    ManifestacaoViewSet, RespostaViewSet,
    ManifestacaoRespostasListView
)

from .views.auth_views import LogoutView
from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'manifestacoes', ManifestacaoViewSet, basename='manifestacao')
router.register(r'postagens', PostagemViewSet, basename='postagem')
router.register(r'respostas', RespostaViewSet, basename='resposta')
router.register(r'cidadaos', CidadaoViewSet, basename='cidadao')
router.register(r'administradores', AdministradorViewSet, basename='administrador')
router.register(r'prefeituras', PrefeituraViewSet,  basename='prefeitura')
router.register(r'secretarias', SecretariaViewSet, basename='secretaria')

urlpatterns = router.urls

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('info/', ViewInfo.as_view(), name='info'),


    # Postagem
    # path('postagens/', PostagemListCreateView.as_view(), name='postagem-list-create'),
    # path('postagens/<int:pk>/', PostagemDetailView.as_view(), name='postagem-detail'),
    
    path('manifestacoes/respostasporid/<int:manifestacao_id>/', RespostasPorManifestacaoView.as_view(), name='respostas-por-manifestacao'),
    path('manifestacoes/respostas/', ManifestacaoRespostasListView.as_view(), name='manifestacao-list'),
    path('cidadaos/cadastro/', CidadaoCreateView.as_view(), name='cidadao-cadastro'),

    # Resposta
    # path('respostas/', RespostaListCreateView.as_view(), name='resposta-list-create'),
    # path('respostas/<int:pk>/', RespostaDetailView.as_view(), name='resposta-detail'),
]


urlpatterns += router.urls

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)