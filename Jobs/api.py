from Users.models import CustomUser
from rest_framework import permissions, serializers
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.response import Response
from rest_framework import  viewsets
from .serializers import JobPostSerializer, JobListSerializer,JobSearchSerializer
from Jobs.models import Jobs
from django.shortcuts import get_object_or_404



class PostJobViewSet(viewsets.ViewSet):      
    permission_classes= [AllowAny]    
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
        #get value of search ba
        job_titleSearch = request.GET.get('sj')
        # job_locationSearch= request.GET.get('jl') 
        search = Jobs.objects.filter(job_title__icontains=job_titleSearch)       
            # .filter(location__icontains=job_locationSearch)
            # )
        if(search):
            #serialize value of search
            serializer=JobSearchSerializer(search, many=True)
            return Response(serializer.data, status=200)
        return Response({'error':'No Jobs Posted'},status=404)

class EditJobViewset(viewsets.ViewSet):
    permission_classes=[AllowAny]
    def job_edit(self, request, *args, **kwargs):
         serializer=JobPostSerializer(data=request.data)                
         if serializer.is_valid():         
            serializer.save()
            return Response(serializer.data)
         return Response({'error':'No Jobs Like this'}, status=404)

    

        

        








        

    