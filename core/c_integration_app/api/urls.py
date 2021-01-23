from django.urls import path 
from . import views

from .views import (
   CreateCiDeployView, 
   CreateCiEnvView, 
   CreateCijobsView, 

      # list api view 
      JobsListApiView, 
     EnvListApiView, 
     DeployListApiView
  )
urlpatterns = [
     
     path('ci/deploy/create/' , CreateCiDeployView.as_view() , name="ci-deploy-view"), 
     path('ci/envs/create/' , CreateCiEnvView.as_view() , name="ci-envs-view"), 
     path('ci/cijobs/create/' , CreateCijobsView.as_view() , name="cijobs-create-view"), 
     #  list api view
     path('ci/jobs/' , JobsListApiView.as_view() , name="jobs-list"), 
     path('ci/envs/' , EnvListApiView.as_view() , name="jobs-list"), 
     path('ci/deploy/' , DeployListApiView.as_view() , name="jobs-list"),
     path('public-key', views.public_key),
     path('product-details', views.get_product_details),
     path('create-payment-intent', views.create_payment_intent),
     path('jenkins-test', views.create_jenkins_version)
]
