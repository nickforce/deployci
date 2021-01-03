from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.authtoken.models import Token 
from rest_framework_jwt.settings import api_settings

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

User = get_user_model()
 

class UserSerializer(serializers.ModelSerializer):
    token    = serializers.SerializerMethodField(read_only = True)
    password = serializers.CharField(write_only= True)
    password2 = serializers.CharField(write_only= True)   

    class Meta:
        model = User
        fields = ['email' ,  'password' , 'password2' , 'token' , 'merchent' , 'is_merchant' , 'is_buyer']
    
    def validate(self , data):
        pw = data.get('password')
        pw2 = data.pop('password2')
        if pw != pw2:
            raise serializers.ValidationError("password dose not match")
        return data 

    def create(self, validated_data):
        merchant = validated_data.pop('merchent')
        user = User(**validated_data)
        # Hash the user's password.
        user.set_password(validated_data['password'])
        user.save()
        return user

    def get_token(self , obj):
        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token


 