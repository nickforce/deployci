from django.shortcuts import get_object_or_404
from rest_framework import serializers

from c_integration_app.models import Ci_deploy , Ci_envs , Ci_jobs


class CiDeploySerializer(serializers.ModelSerializer):
    class Meta:
        model = Ci_deploy
        fields =[
            'name',  
            'type'
        ]

class CiEnvSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ci_envs
        fields =[
            'name', 
            'type', 
            'url_repo', 
            'ci_deploy'
        ]

class CijobsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ci_jobs
        fields =[
            'name',  
            'type', 
            'deploy'
        ]

