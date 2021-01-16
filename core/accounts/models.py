from django.db import models

from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class CustomUserManger(BaseUserManager):
    def create_user(self, email , full_name=None  ,username=None , password=None ):
        if not email:
            raise ValueError('email was not provided ')
        user = self.model(
            email= self.normalize_email(email), 
            username = username ,
        )
        user.set_password(password)
        user.save(using=self._db)
        print(user )
        return user

    def create_superuser(self , email  , username=None,password=None ):
        user = self.create_user(email  ,  username=username, password=password)
        user.is_admin  = True
        user.is_staff = True
        user.save(using=self._db)
        return user 

class CustomUser(AbstractBaseUser):
    email        = models.EmailField( 
        max_length=255,
        unique=True)
    is_active            = models.BooleanField(default=True)
    is_admin             = models.BooleanField(default=False)
    is_staff             = models.BooleanField(default=False)     
    username             = models.CharField(max_length=255 , null= True , blank= True)
    first_name             = models.CharField(max_length=255 , null= True , blank= True)
    last_name             = models.CharField(max_length=255 , null= True , blank= True)
    USERNAME_FIELD       = 'email'
    REQUIRED_FIELDS      = []
    objects              = CustomUserManger()

    def __str__(self):
        return self.email

    def has_perm(self, perm , obj= None):
        return True

    def has_module_perms(self , app_label):
        return self.is_admin
