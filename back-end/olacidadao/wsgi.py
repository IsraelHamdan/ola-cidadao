"""
WSGI config for olacidadao project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/wsgi/
"""

import os
from django.core.wsgi import get_wsgi_application
from whitenoise import WhiteNoise

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'olacidadao.settings')

# Inicializa o WSGI application padrão do Django
application = get_wsgi_application()

# Configura o WhiteNoise para servir arquivos estáticos em produção
application = WhiteNoise(application)

