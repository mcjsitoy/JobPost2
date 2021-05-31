from django.http.response import JsonResponse
from Users.models import CustomUser
from rest_framework import permissions, serializers
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.response import Response
from rest_framework import  viewsets
from rest_framework.parsers import FileUploadParser, FormParser, MultiPartParser
from .serializers import EmployeeApplicationsSerializer, JobPostSerializer, JobListSerializer,JobSearchSerializer, ApplyJobSerializer, EditJobSerializer
from Jobs.models import JobApplication, Jobs
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import ensure_csrf_cookie, requires_csrf_token



class PostJobViewSet(viewsets.ViewSet):      
    permission_classes= [IsAuthenticated]    
    def post_job(self, request):         
        serializer=JobPostSerializer(data=request.data)               
        if serializer.is_valid():         
            serializer.save(job_poster=request.user)         
            return Response(serializer.data, status=200)
        return Response(serializer.errors)


class JobListViewSet(viewsets.ViewSet):
    permission_classes=[AllowAny]
    def job_list(self, request):
        jobs=Jobs.objects.all()
        if(jobs):        
            serializer=JobListSerializer(jobs, many=True)
            return Response(serializer.data, status=200)
        return Response({'error':'No Jobs Posted'}, status=404)


class SearchViewset(viewsets.ViewSet):
    permission_classes=[AllowAny]
    def job_search(self,request):
        #get value of search bar
        job_titleSearch = request.GET.get('sj')
        job_locationSearch= request.GET.get('jl') 
        job_categorySearch= request.GET.get('cat')
        job_salRange=request.GET.get('sal_range') 
        search = Jobs.objects.filter(job_title__icontains=job_titleSearch, location__icontains=job_locationSearch,category__icontains=job_categorySearch,salary_range__icontains=job_salRange)       
        if(search):
            #serialize value of search
            serializer=JobSearchSerializer(search, many=True)
            return Response(serializer.data, status=200)
        return Response({'error':'No Jobs Posted'},status=404)


class EditJobViewset(viewsets.ViewSet):
    permission_classes=[IsAuthenticated]
    def job_edit(self, request, *args, **kwargs):
         pk = self.kwargs.get('pk')
         jobs = get_object_or_404(Jobs, pk=pk)
         serializer=EditJobSerializer(instance=jobs, data=request.data)                
         if serializer.is_valid():         
            serializer.save(job_poster=request.user)
            return Response(serializer.data,status =200)
         return Response({'error':'No Jobs Like this'}, status=404)


class ApplyJobViewset(viewsets.ViewSet):
    permission_classes=[IsAuthenticated]
    # parser_classes = [FormParser]
    parser_classes = [MultiPartParser] 
    # parser_classes=[FileUploadParser]
      
    def apply(self,request, *args, **kwargs):
         import pdb; pdb.set_trace();
         serializer=ApplyJobSerializer(data=request.data)                
         if serializer.is_valid():         
            serializer.save()         
            return Response(serializer.data, status=200)
         return Response(serializer.errors)


class ApplicantsViewset(viewsets.ViewSet):
    permission_classes=[IsAuthenticated]
    def applicant_list(self, request, *args, **kwargs):
        pk=self.kwargs.get('pk')
        jobs=get_object_or_404(Jobs, pk=pk)      
        applicants=JobApplication.objects.filter(Job=jobs)
        if(applicants):        
            serializer=ApplyJobSerializer(applicants, many=True)
            return Response(serializer.data, status=200)
        return Response({'error':'No Application'}, status=404)


class ApplicationsViewset(viewsets.ViewSet):
    permission_classes=[IsAuthenticated]
    def application_list(self,request,*args,**kwargs):
        applications=JobApplication.objects.filter(applicant=request.user.id)        
        if(applications):
            serializer=EmployeeApplicationsSerializer(applications, many=True)
            return Response (serializer.data, status=200)
        return Response({'error':'No Application'}, status=404)


class PostedJobsViewset(viewsets.ViewSet):
    permission_classes=[IsAuthenticated]
    def job_list(self, request,*args,**kwargs):
        jobs=Jobs.objects.filter(job_poster=request.user)
        if(jobs):        
            serializer=JobListSerializer(jobs, many=True)
            return Response(serializer.data, status=200)
        return Response({'error':'No Jobs Posted'}, status=404)


class ErAcceptApplicationViewset(viewsets.ViewSet):
    permission_classes=[IsAuthenticated]
    def accept(self,request,*args,**kwargs):
        pk=self.kwargs.get('pk')
        application=get_object_or_404(JobApplication, pk=pk)
        application.is_accepted= not application.is_accepted
        application.save()                 
        return Response(application.is_accepted, status=200)
   
        
class ErDeclineApplicationViewset(viewsets.ViewSet):
    permission_classes=[IsAuthenticated]
    def decline(self,request,*args,**kwargs):
        pk=self.kwargs.get('pk')
        application=get_object_or_404(JobApplication, pk=pk)
        application.is_declined= not application.is_declined
        application.save()
        return Response(application.is_declined,status=200)


class EeAcceptJobViewset(viewsets.ViewSet):
    permission_classes=[IsAuthenticated]
    def accept(self,request,*args,**kwargs):
        pk=self.kwargs.get('pk')
        application=get_object_or_404(JobApplication, pk=pk)
        application.ee_is_accepted=not application.ee_is_accepted
        user=get_object_or_404(CustomUser, pk=request.user.id)
        user.is_employed = not user.is_employed
        application.save()
        user.save()
        context={
        'application.ee_is__accepted':application.ee_is_accepted,
        'user.is_employed':user.is_employed,
        }
        return Response(context,status=200)


class EeDeclineJobViewset(viewsets.ViewSet):
    permission_classes=[IsAuthenticated]
    def decline(self,request,*args,**kwargs):
        pk=self.kwargs.get('pk')
        application=get_object_or_404(JobApplication, pk=pk)
        application.ee_is_declined=not application.ee_is_declined
        application.save()
        return Response(application.ee_is_declined,status=200)
        
        





    

        

        








        

    