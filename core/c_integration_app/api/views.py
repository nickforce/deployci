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
    queryset          = Ci_deploy.objects.all()

class CreateCiEnvView(CreateAPIView):
    serializer_class  = CiEnvSerializer
    queryset          = Ci_envs.objects.all()

class CreateCijobsView(CreateAPIView):
    serializer_class  = CijobsSerializer
    queryset          = Ci_jobs.objects.all()


# List api view
class JobsListApiView(ListAPIView):
    serializer_class  = CijobsSerializer
    queryset          = Ci_jobs.objects.all()


class EnvListApiView(ListAPIView):
    serializer_class  = CiEnvSerializer
    queryset          = Ci_envs.objects.all()


class DeployListApiView(ListAPIView):
    serializer_class  = CiDeploySerializer
    queryset          = Ci_deploy.objects.all()

    