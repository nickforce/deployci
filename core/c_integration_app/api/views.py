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
import jenkins
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
    return JsonResponse({'publicKey': 'pk_live_L8MI47nddDlBdsRIH0Ol6Mu2'})





def create_jenkins_version(request):
    print('jenkins')
    print('jenkins')
    server = jenkins.Jenkins('http://ec2-18-222-146-212.us-east-2.compute.amazonaws.com:8080/', username='nick-admin-aws', password='upHCjJTCe8E7')
    jobs = server.get_jobs()
    print(jobs)
    user = server.get_whoami()
    version = server.get_version()
    debug = 'Hello %s from Jenkins %s and full json payload:\\n %s' % (user['fullName'], version, server.get_jobs())
    print(debug)
    return JsonResponse({'test':'test'})
    

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
    # data = json.loads(request.data or '{}')
    data = json.loads('{}')
    product = product_details()

    options = dict()
    options.update(data)
    options.update(product)
    
    # Create a PaymentIntent with the order amount and currency
    print(options)
    payment_intent = stripe.PaymentIntent.create(**options)
    print(payment_intent)
    return JsonResponse(payment_intent)
    # return render(request, 'card')
    # try:
    #     return JsonResponse(payment_intent)
    # except Exception as e:
    #     return JsonResponse(payment_intent)
    #     #return JsonResponse(error=str(e))#, 403)
@csrf_exempt
def webhook_received():
     # You can use webhooks to receive information about asynchronous payment events.
    # For more about our webhook events check out https://stripe.com/docs/webhooks.
    webhook_secret = os.getenv('STRIPE_WEBHOOK_SECRET')
    request_data = json.loads(request.data)

    if webhook_secret:
        # Retrieve the event by verifying the signature using the raw body and secret if webhook signing is configured.
        signature = request.headers.get('stripe-signature')
        try:
            event = stripe.Webhook.construct_event(
                payload=request.data, sig_header=signature, secret=webhook_secret)
            data = event['data']
        except Exception as e:
            return e
        # Get the type of webhook event sent - used to check the status of PaymentIntents.
        event_type = event['type']
    else:
        data = request_data['data']
        event_type = request_data['type']
    data_object = data['object']
    
    print('event ' + event_type)

    if event_type == 'payment_intent.succeeded':
        # Fulfill any orders, e-mail receipts, etc
        print("💰 Payment received!")

    if event_type == 'payment_intent.payment_failed':
        #Notify the customer that their order was not fulfilled
        print("❌ Payment failed.")

    return JsonResponse({'status': 'success'})