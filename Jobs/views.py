from Users.models import CustomUser
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework import viewsets
from django.views.generic import TemplateView
from Jobs.models import Jobs
from django.shortcuts import get_object_or_404





# Create your views here.
class HomeView(TemplateView):
    template_name='dashboard.html'
    def get(self,request):
       
        return render(request, self.template_name)

class LandPageView(TemplateView):
    template_name='landpage.html'
    def get(self,request):
        return render(request, self.template_name)

class PostJobView(TemplateView):
    template_name='post_job.html'
    def get(self,request,*args, **kwargs):
       return render(request, 'jobs/post_job.html')

class JobListView(TemplateView):
    template_name='job_list.html'
    def get(self,request,*args,**kwargs):
        jobs = Jobs.objects.all()
        return render(request, 'jobs/job_list.html',{'jobs':jobs})

class ApplyJobView(TemplateView):
    template_name='jobs/apply.html'
    def get(self,request,*args,**kwargs):
        return render(request, self.template_name)

class EditJobView(TemplateView):
    template_name='jobs/editjob.html'
    def get(self, request, *awgs, **kwargs):
         pk = self.kwargs.get('pk')                  
         jobs = get_object_or_404(Jobs, pk=pk)
         return render(request,self.template_name, {'jobs':jobs})



       