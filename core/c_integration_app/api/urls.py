

from django.urls import path 

from .views import (
    CreateCiDeployView, 
   CreateCiEnvView, 
  CreateCijobsView
  )
urlpatterns = [
     
     path('ci/deploy/create/' , CreateCiDeployView.as_view() , name="ci-deploy-view"), 
     path('ci/envs/create/' , CreateCiEnvView.as_view() , name="ci-envs-view"), 
     path('ci/cijobs/create/' , CreateCijobsView.as_view() , name="cijobs-create-view"), 
]
