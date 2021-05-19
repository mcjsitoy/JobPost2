from Users.models import CustomUser
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework import viewsets
from django.views.generic import TemplateView





# Create your views here.
class HomeView(TemplateView):
    template_name='dashboard.html'
    def get(self,request):
       
        return render(request, self.template_name)

class LandPageView(TemplateView):
    template_name='landpage.html'
    def get(self,request):
        return render(request, self.template_name)
        

       