
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


from django.http.response import JsonResponse

import requests
import json 
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def get_custom_access_token(request):
    code = request.GET.get('code')
    print(code)
    url  = f"https://github.com/login/oauth/access_token?client_id=973f2ad639a04981c414&redirect_uri=http://localhost:3000/accounts/auth/custom/github/frontend&client_secret=2f68b0e25bda1086e0f8c604676ea31090f4719d&code={code}"
    res = requests.post(url)
    
    json_data = json.dumps(res.text)
    print(json_data)
    d= json_data.split('=')[1].split('&')[0]
    if d == 'bad_verification_code':
        return JsonResponse(  {'bad_verification':d} , status=400 , safe= False )

    return JsonResponse({'code':d} , safe= False , status=200)





