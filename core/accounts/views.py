from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
# from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
# from allauth.socialaccount.providers.oauth2.client import OAuth2Client
# from rest_auth.registration.views import SocialLoginView
# from django.urls import reverse

# class GithubLogin(SocialLoginView):
#     adapter_class = GitHubOAuth2Adapter
#     # callback_url = "http://127.0.0.1:8000/accounts/github/login/callback/"
#     client_class = OAuth2Client








from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter  
#  GitHubOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView

class GithubLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    # callback_url = "http://localhost:8000/accounts/dj-rest-auth/github/"
    callback_url = "http://localhost:3000/accounts/auth/google/"
    client_class = OAuth2Client

 
 


