# Generated by Django 5.1.4 on 2024-12-27 16:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_manifestacao_secretaria_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='postagem',
            name='qtd_down',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='postagem',
            name='qtd_up',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='postagem',
            name='status',
            field=models.CharField(blank=True, choices=[('Publico', 'Público'), ('Privado', 'Privado')], default='Publico', max_length=50, null=True),
        ),
    ]