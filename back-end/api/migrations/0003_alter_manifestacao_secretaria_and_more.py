# Generated by Django 5.1.4 on 2024-12-27 15:26

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_remove_resposta_secretaria_resposta_usuario_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='manifestacao',
            name='secretaria',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='manifestacoes', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='postagem',
            name='prefeitura',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='postagens', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='resposta',
            name='usuario',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='respostas', to=settings.AUTH_USER_MODEL),
        ),
    ]