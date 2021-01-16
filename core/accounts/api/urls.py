

from django.urls import path
from .views import GetAccessToken

urlpatterns = [
    path('' , GetAccessToken.as_view() , name="get-access-toke")

]
