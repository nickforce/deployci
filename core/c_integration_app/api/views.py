from django.http import HttpResponse, HttpResponseRedirect
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render
from django.template import RequestContext
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
import stripe
import json
from django.views.decorators.csrf import csrf_exempt

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

def public_key(request):
    print('hello def')
    # sk_test_O3NDNIcRRc7sJDlQ1uxITUXn
    # pk_test_eCbgzFtyfF8eZY8RIlXrx3EP
    # pk_live_L8MI47nddDlBdsRIH0Ol6Mu2
    return JsonResponse({'publicKey': 'pk_test_eCbgzFtyfF8eZY8RIlXrx3EP'})

def get_product_details(request):
    product = product_details()
    return JsonResponse(product)

def product_details():
  return {
    'currency': 'USD',
    'amount': 100
  }
@csrf_exempt
def create_payment_intent(request):
    # Reads application/json and returns a response
    data = json.loads(request.data or '{}')
    product = product_details()

    options = dict()
    options.update(data)
    options.update(product)
    
    # Create a PaymentIntent with the order amount and currency
    payment_intent = stripe.PaymentIntent.create(**options)
    print(payment_intent)
    return JsonResponse(payment_intent)
    # return render(request, 'card')
    # try:
    #     return JsonResponse(payment_intent)
    # except Exception as e:
    #     return JsonResponse(payment_intent)
    #     #return JsonResponse(error=str(e))#, 403)

    