from rest_framework import permissions
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.response import Response
from rest_framework import  viewsets
from .serializers import EditProfileSerializer, RegistrationSerializer, UserLoginSerializer
from .models import CustomUser
from django.shortcuts import get_object_or_404, render, redirect
from rest_framework.decorators import permission_classes
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login,logout

from Users import serializers



class SignupViewset(viewsets.ViewSet):      
    template_name = 'users/signup.html'
    permission_classes= [AllowAny]
    # authentication_classes = [SessionAuthentication, BasicAuthentication]
    serializer=RegistrationSerializer()
       
    def signup(self, request): 
        user=CustomUser.objects.all()
        serializer = RegistrationSerializer(data=request.data)   
        if serializer.is_valid():  
            serializer.save()
            return Response(serializer.data, status=200)
        return Response({'error':'Something is missing'}, status=404)

    # def post(self, request):
    #     serializer=RegistrationSerializer()       
    #     if not serializer.is_valid():
    #         return Response({'serializer': serializer,})
    #     serializer.save()      
    #     return Response(serializer.data)
        
        

class LoginViewset(viewsets.ViewSet):
    template_name='users/login.html'
    permission_classes=[AllowAny]
    
    def login(self, request):
       serializer=UserLoginSerializer()
       data = request.data
       
       email=data.get('email', None)
       password=data.get('password', None)
       user=authenticate(email=email,password=password)
       token = user.auth_token.key

       if user:
           login(request, user)
           return Response({'email':email,'token':token}, status=200)
       return Response({'serializer':serializer})


class LogoutViewset(viewsets.ViewSet):
    permission_classes=[IsAuthenticated]
    def logout(self,request):
         logout(request)
         return Response({'success':'Logged out'},status=200)
   

class EditProfileViewset(viewsets.ViewSet):
    permission_classes=[IsAuthenticated]
    def edit_profile(self,request,*args,**kwargs):
        pk=self.kwargs.get('pk')
        profile=get_object_or_404(CustomUser,pk=pk)
        serializer=EditProfileSerializer(instance=profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response({'error':'Serializer not valid'}, status=404)


# class ProfileDetailsViewset(viewsets.ViewSet):
#     permission_classes=[IsAuthenticated]
#     def profile_details(self,request,*args,**kwargs):
#         pk=self.kwargs.get('pk')
#         profile=get_object_or_404(CustomUser,pk=pk)
#         applicant=get_object_or_404()
        
    


        
    




   