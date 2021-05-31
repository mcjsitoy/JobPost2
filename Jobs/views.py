from django.views.decorators.csrf import ensure_csrf_cookie
from Users.models import CustomUser
from django.shortcuts import render, redirect
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework import viewsets
from django.views.generic import TemplateView
from Jobs.models import JobApplication, Jobs
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import ensure_csrf_cookie

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
        if request.user.is_authenticated:
            job_poster= request.user
            return render(request, 'jobs/post_job.html',{'job_poster':job_poster})
        return redirect('Users:signup')


class JobListView(TemplateView):
    template_name='job_list.html'
    def get(self,request,*args,**kwargs):
        jobs = Jobs.objects.all()
        return render(request, 'jobs/job_list.html',{'jobs':jobs})


class EditJobView(TemplateView):
    template_name='jobs/editjob.html'
    def get(self, request, *awgs, **kwargs):
         if request.user.is_authenticated:
            pk = self.kwargs.get('pk')                  
            jobs = get_object_or_404(Jobs, pk=pk)        
            return render(request,self.template_name, {'jobs':jobs})
         return redirect('Users:signup')


class ApplyJobView(TemplateView):
    template_name='jobs/apply.html'
    def get(self,request,*args,**kwargs):
        if request.user.is_authenticated:
            pk = self.kwargs.get('pk')
            jobs = get_object_or_404(Jobs, pk=pk)
            applicant_id = request.user.id
            context={
                'jobs':jobs,
                'applicant_id':applicant_id
            }
            return render(request, self.template_name, context)   
        return redirect('Users:signup')


class ViewApplicantsView(TemplateView):
    template_name='jobs/view_applicants.html'
    def get(self,request,*args,**kwargs):
        if request.user.is_authenticated: 
            pk = self.kwargs.get('pk')         
            jobs = get_object_or_404(Jobs, pk=pk)
            applicant = JobApplication.objects.filter(Job=jobs) 
            context={
                'jobs':jobs,
                'applicant':applicant,
            }        
            return render(request,'jobs/view_applicants.html',context)
        return redirect('Users:signup')


class PostedJobsView(TemplateView):
    template_name='jobs/view_posted_jobs.hmtl'
    def get(self,request,*args,**kwargs):
        if request.user.is_authenticated: 
            pk=self.kwargs.get('pk')
            user=get_object_or_404(CustomUser, pk=pk)       
            posted_jobs=Jobs.objects.filter(job_poster=user)
            context={
                'user':user,
                'posted_jobs':posted_jobs,
            }
            return render(request, 'jobs/posted_jobs.html',context)
        return redirect('Users:signup')


class EmployeeApplicationView(TemplateView):
    template_name='jobs/view_applications.html'
    def get(self,request,*args,**kwargs):
        if request.user.is_authenticated:  
            user = request.user
            context={               
            'user':user,
            }
            return render(request,'jobs/view_application.html',context)
        return redirect('Users:signup')



       