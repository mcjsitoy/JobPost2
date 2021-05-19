from rest_framework import permissions
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.response import Response
from rest_framework import  viewsets
from .serializers import EmployeeRegistrationSerializer, UserLoginSerializer
from .models import CustomUser
from django.shortcuts import get_object_or_404, render, redirect
from rest_framework.decorators import permission_classes
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login



class SignupViewset(viewsets.ViewSet):      
    template_name = 'users/signup.html'
    permission_classes= [AllowAny]
    # authentication_classes = [SessionAuthentication, BasicAuthentication]
    serializer=EmployeeRegistrationSerializer()
       
    def signup(self, request): 
        user=CustomUser.objects.all()
        serializer = EmployeeRegistrationSerializer(user, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer=EmployeeRegistrationSerializer(data=request.data)
       
        if not serializer.is_valid():
            return Response({'serializer': serializer,})
        serializer.save()
        return Response(serializer.data)
        
        

class LoginViewset(viewsets.ViewSet):
    template_name='users/login.html'
    permission_classes=[AllowAny]
    serializer=UserLoginSerializer()
    def login(self, request):
       data = request.data
       
       email=data.get('email', None)
       password=data.get('password', None)
       user=authenticate(email=email,password=password)
       token = user.auth_token.key

       if user:
           login(request, user)
           return Response({'email':email,'token':token}, status=200)
       return Response(status=404)
    
    # def post(self, request):
    #     import pdb;pdb.set_trace()
    #     serializer=UserLoginSerializer(data=request.data)
       
    #     if not serializer.is_valid():
    #         return Response({'serializer': serializer,})
    #     serializer.save()
    #     return Response(serializer.data)


# class LandingPageViewset(viewsets.ViewSet):
#     permission_classes=[IsAuthenticated]
    


        
    




   