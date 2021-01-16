
from rest_framework.generics import CreateAPIView  , RetrieveAPIView , views
from rest_framework.views import APIView
from django.http import JsonResponse
from django.contrib.auth.mixins import LoginRequiredMixin
from allauth.socialaccount.models import SocialToken , SocialAccount
from rest_framework import permissions
class GetAccessToken( APIView):

    # serializer_class =permissions.AllowAny
    # queryset = SocialToken.objects.filter(account=   SocialAccount.objects.filter(user = 2).first())
    def get(self , request ,  *args , **kwargs):

        # if request.user.is_authenticated:
            
        user  = request.user
        print(user) 
        social_account  =  SocialAccount.objects.filter(user = user).first()
        token = SocialToken.objects.filter(account= social_account).first()
        print(token)
        return JsonResponse({"code":token.token})
        # else:
        #     return JsonResponse({"error":"Authentication credentials were not provided."})

