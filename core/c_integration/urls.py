
from django.contrib import admin
from django.urls import path  , include



urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls') ),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('', include('c_integration_app.api.urls')),
    

]


# 
