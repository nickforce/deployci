#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import stripe
import json


import os
import sys
#import jenkins
# from flask import Flask, render_template, jsonify, request, send_from_directory
# from dotenv import load_dotenv, find_dotenv
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
#from c_integration_app.models import Ci_deploy , Ci_jobs , Ci_envs
# from jenkins import create_jenkins_version
# app = Flask(__name__, static_url_path="")

# Setup Stripe python client library
# load_dotenv(find_dotenv())

# stripe.api_key = os.getenv('STRIPE_SECRET_KEY')
stripe.api_key = 'sk_live_d9FHE4u6x7EKcdOp5zmchMTM'
# stripe.api_version = os.getenv('STRIPE_API_VERSION')
stripe.api_version = '2020-08-27'


def main():
    #start()
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'c_integration.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)
    


def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(pipelineJobScheduler, 'interval', minutes=0.1)
    scheduler.start()

def testJob():
    print("I'm working..")

def pipelineJobScheduler():
    print("** Pipeline_Job_Scheduler")
    # run every 1-3 minutes, listens for new jobs to be submitted with a status
    #
    # allJobs = Ci_jobs.objects.all()
    # print(allJobs)
    # create_jenkins_version()


# def create_jenkins_version():
#     server = jenkins.Jenkins('http://ec2-18-222-146-212.us-east-2.compute.amazonaws.com:8080/', username='nick-admin-aws', password='upHCjJTCe8E7')
#     jobs = server.get_jobs()
#     print(jobs)
#     user = server.get_whoami()
#     version = server.get_version()
#     debug = 'Hello %s from Jenkins %s and full json payload:\\n %s' % (user['fullName'], version, server.get_jobs())
#     print(debug)
    # return JsonResponse({'jenkins': debug})


def pipelineCycleSaverQueueCheck():
    print("** Pipeline_Cycle_Saver")
    # run every hour to check the pending queue to shut off the pipelineJobScheduler if possible
    #
    


def product_details():
  return {
    'currency': 'USD',
    'amount': 100
  }

# @app.route('/', methods=['GET'])
# def home():
#     return "Hello from API!"
# # pk_live_L8MI47nddDlBdsRIH0Ol6Mu2
# @app.route('/public-key', methods=['GET'])
# def PUBLISHABLE_KEY():
#     return jsonify({
#         'publicKey': 'sk_test_O3NDNIcRRc7sJDlQ1uxITUXn'
#     })
# # os.getenv('STRIPE_PUBLISHABLE_KEY')
# @app.route('/product-details', methods=['GET'])
# def get_product_details():
#     product = product_details()
#     return jsonify(product)

# @app.route('/create-payment-intent', methods=['POST'])
# def post_payment_intent():
#     # Reads application/json and returns a response
#     data = json.loads(request.data or '{}')
#     product = product_details()

#     options = dict()
#     options.update(data)
#     options.update(product)
    
#     # Create a PaymentIntent with the order amount and currency
#     payment_intent = stripe.PaymentIntent.create(**options)

#     try:
#         return jsonify(payment_intent)
#     except Exception as e:
#         return jsonify(error=str(e)), 403

# @app.route('/webhook', methods=['POST'])
# def webhook_received():
#     # You can use webhooks to receive information about asynchronous payment events.
#     # For more about our webhook events check out https://stripe.com/docs/webhooks.
#     webhook_secret = os.getenv('STRIPE_WEBHOOK_SECRET')
#     request_data = json.loads(request.data)

#     if webhook_secret:
#         # Retrieve the event by verifying the signature using the raw body and secret if webhook signing is configured.
#         signature = request.headers.get('stripe-signature')
#         try:
#             event = stripe.Webhook.construct_event(
#                 payload=request.data, sig_header=signature, secret=webhook_secret)
#             data = event['data']
#         except Exception as e:
#             return e
#         # Get the type of webhook event sent - used to check the status of PaymentIntents.
#         event_type = event['type']
#     else:
#         data = request_data['data']
#         event_type = request_data['type']
#     data_object = data['object']
    
#     print('event ' + event_type)

#     if event_type == 'payment_intent.succeeded':
#         # Fulfill any orders, e-mail receipts, etc
#         print("💰 Payment received!")

#     if event_type == 'payment_intent.payment_failed':
#         #Notify the customer that their order was not fulfilled
#         print("❌ Payment failed.")

#     return jsonify({'status': 'success'})




if __name__ == '__main__':
    main()
