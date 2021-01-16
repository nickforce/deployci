# Generated by Django 3.0.7 on 2020-12-31 17:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('c_integration_app', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ci_deploy',
            name='envs',
        ),
        migrations.AddField(
            model_name='ci_envs',
            name='ci_deploy',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='c_integration_app.Ci_deploy'),
            preserve_default=False,
        ),
    ]
