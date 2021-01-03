
from django.urls import path
from .views import GithubLogin


urlpatterns = [

    path('dj-rest-auth/github/', GithubLogin.as_view(), name='github_login'),
    # path('auth/github/', github_callback, name='github_callback'),

]
 