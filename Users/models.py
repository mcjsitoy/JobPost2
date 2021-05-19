from django.db import models
from django.db.models.signals import post_save
from django.conf import settings
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

# Create your models here.
# src/users/model.p
from django.db import models
from django.contrib import admin
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from .managers import CustomUserManager
from rest_framework.authtoken.models import Token



class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    first_name=models.CharField(max_length=50)
    last_name=models.CharField(max_length=50)
    is_employer = models.BooleanField('Account Type', default=False)
    is_employee = models.BooleanField('Account Type', default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    def get_full_name(self):
        
        return "{},{}".format(self.last_name, self.first_name)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

      
        

# class Employee(models.Model):
#     employee = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True)
#     jobpost = models.ManyToManyField(JobPost, through='JobPost')
#     application = models.ManyToManyField(Application, related_name='Application')








