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
    def create(self , validated_data):
        request  = self.context.get('request')
        author = request.user
        ci = Ci_deploy.objects.create(author= author , **validated_data)
        return ci

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
    def create(self , validated_data):
        request  = self.context.get('request')
        author = request.user
        ci = Ci_envs.objects.create(author= author , **validated_data)
        return ci


class CijobsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ci_jobs
        fields =[
            'id',
            'name',  
            'type', 
            'deploy'
        ]
    def create(self , validated_data):
        request  = self.context.get('request')
        author = request.user
        ci = Ci_jobs.objects.create(author= author , **validated_data)
        return ci

