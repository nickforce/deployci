# Generated by Django 3.1.4 on 2021-01-12 10:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('c_integration_app', '0004_auto_20210112_1529'),
    ]

    operations = [
        migrations.RenameField(
            model_name='ci_deploy',
            old_name='envs',
            new_name='env1',
        ),
    ]
