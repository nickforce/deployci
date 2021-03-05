

from django.urls import path
from .views import GetAccessToken , get_custom_access_token

urlpatterns = [
    path('' , GetAccessToken.as_view() , name="get-access-toke"), 
    path('custom/token/' , get_custom_access_token)

]
