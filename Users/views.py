from re import template
from django.views.generic.base import TemplateView
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from Users.models import CustomUser
from django.shortcuts import render, redirect
from rest_framework import serializers, viewsets
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework import authentication, permissions
from rest_framework.authtoken.models import Token
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import logout

# Create your views here.

class SignupView(TemplateView): 
    
    def get(self, request):   
        user=CustomUser.objects.all()                       
        return render(request, 'users/signup.html',{'user':user})



class LoginView(TemplateView):
    def get(self,request): 
        return render(request,'users/login.html')


class EditProfileView(TemplateView):
    def get(self,request,*args, **kwargs):
        pk=self.kwargs.get('pk')
        user=get_object_or_404(CustomUser, pk=pk)
        if request.user.id == user.id:
            return render(request, 'users/edit_profile.html', {'user':user})
        return redirect('Jobs:no_access')


class ProfileDetailsView(TemplateView):
    def get(self,request,*args,**kwargs):
        pk=self.kwargs.get('pk')
        user=get_object_or_404(CustomUser, pk=pk)
        return render(request,'users/profile_details.html', {'user':user})













          
        

    
