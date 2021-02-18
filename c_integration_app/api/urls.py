

from django.urls import path 

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

]
