from django.shortcuts import get_object_or_404
from rest_framework import permissions, status
from django.db.models import Q
from rest_framework.response import Response
from rest_framework.generics import (CreateAPIView, DestroyAPIView,
                                     ListAPIView, RetrieveAPIView,
                                     UpdateAPIView)
from rest_framework.response import Response
from rest_framework.views import APIView
from c_integration_app.models import Ci_deploy , Ci_envs , Ci_jobs
from .serializer import CiDeploySerializer , CiEnvSerializer , CijobsSerializer

class CreateCiDeployView(CreateAPIView):
    serializer_class = CiDeploySerializer
    queryset = Ci_deploy.objects.all()

class CreateCiEnvView(CreateAPIView):
    serializer_class = CiEnvSerializer
    queryset = Ci_deploy.objects.all()

class CreateCijobsView(CreateAPIView):
    serializer_class = CijobsSerializer
    queryset = Ci_deploy.objects.all()
