from django.shortcuts import get_object_or_404
from rest_framework import permissions, status
from django.db.models import Q
from rest_framework.response import Response
from rest_framework.generics import (CreateAPIView, DestroyAPIView,
                                     ListAPIView, RetrieveAPIView,
                                     UpdateAPIView)
from rest_framework.response import Response
from rest_framework.views import APIView
from c_integration_app.models import Ci_deploy , Ci_jobs , Ci_envs
from .serializer import CiDeploySerializer , CiEnvSerializer , CijobsSerializer

class CreateCiDeployView(CreateAPIView):
    serializer_class  = CiDeploySerializer

    def get_queryset(self):
        return Ci_deploy.objects.filter(author= self.request.user)

    def get_serializer_context(self):
        request  = self.request
        return {'request':request}
    
class CreateCiEnvView(CreateAPIView):
    serializer_class  = CiEnvSerializer

    def get_queryset(self):
        return Ci_envs.objects.filter(author= self.request.user)
         

    def get_serializer_context(self):
        request  = self.request
        return {'request':request}

 

class CreateCijobsView(CreateAPIView):
    serializer_class  = CijobsSerializer
    # queryset          = Ci_jobs.objects.filter(author= self.request.user)
    def get_queryset(self):
        return Ci_jobs.objects.filter(author= self.request.user)
    
    def get_serializer_context(self):
        request  = self.request
        return {'request':request}


# List api view
class JobsListApiView(ListAPIView):
    serializer_class  = CijobsSerializer
    queryset          = Ci_jobs.objects.all()
    def get_queryset(self):
        return Ci_jobs.objects.filter(author= self.request.user)
  


class EnvListApiView(ListAPIView):
    serializer_class  = CiEnvSerializer
    queryset          = Ci_envs.objects.all()

    def get_queryset(self):
        return Ci_envs.objects.filter(author= self.request.user)
  


class DeployListApiView(ListAPIView):
    serializer_class  = CiDeploySerializer
    queryset          = Ci_deploy.objects.all()

    def get_queryset(self):
        return Ci_deploy.objects.filter(author= self.request.user)
  

    