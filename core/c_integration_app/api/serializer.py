from django.shortcuts import get_object_or_404
from rest_framework import serializers

from c_integration_app.models import Ci_deploy , Ci_envs , Ci_jobs


class CiDeploySerializer(serializers.ModelSerializer):
    env_name = serializers.SerializerMethodField(read_only= True)
    class Meta:
        model = Ci_deploy
        fields =[
            'id',  
            'name',  
            'type', 
            'env1',
            'env_name'
        ]
    def get_env_name(self , obj):
        return obj.env1.name 

class CiEnvSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ci_envs
        fields =[
            'id',
            'name', 
            'type', 
            'url_repo', 
        ]

class CijobsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ci_jobs
        fields =[
            'id',
            'name',  
            'type', 
            'deploy'
        ]
