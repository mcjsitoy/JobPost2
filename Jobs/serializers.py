from .models import JobApplication, Jobs
from django.core.validators import MaxValueValidator, MinValueValidator
from rest_framework import serializers

class JobPostSerializer(serializers.ModelSerializer):
    job_title=serializers.CharField(max_length=100)
    job_description=serializers.CharField(max_length=400)
    location=serializers.CharField(max_length=250)
    salary_range=serializers.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(900000)]),
    category =serializers.CharField(max_length=100)
    
    
    # add file and imagefield

        
    class Meta:
        model = Jobs
        fields=('id','job_title', 'job_description','location','salary_range','category')


class EditJobSerializer(serializers.ModelSerializer):
    job_title=serializers.CharField(max_length=100)
    job_description=serializers.CharField(max_length=400)
    location=serializers.CharField(max_length=250)
    salary_range=serializers.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(900000)]),
    category =serializers.CharField(max_length=100)

        
    class Meta:
        model = Jobs
        fields=('id','job_poster','job_title', 'job_description','location','salary_range','category')



class JobListSerializer(serializers.ModelSerializer):
    job_title=serializers.CharField(max_length=100)
    job_description=serializers.CharField(max_length=400)
    location=serializers.CharField(max_length=250)
    salary_range=serializers.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(900000)])
    category =serializers.CharField(max_length=100)

     
    class Meta:
        model = Jobs
        fields=('id','job_poster','job_title', 'job_description','location','salary_range','category')
        depth=1

class JobSearchSerializer(serializers.Serializer):
   job_title=serializers.CharField(max_length=100)
   job_description=serializers.CharField(max_length=400)
   location=serializers.CharField(max_length=250)
   salary_range=serializers.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(900000)])
   category =serializers.CharField(max_length=100)
     

   class Meta:
    model = Jobs
    fields=('job_title', 'job_description','location','salary_range','category')


class ApplyJobSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=250 ,default="default@default.com")
    first_name=serializers.CharField(max_length=250, default="default_first")   
    last_name=serializers.CharField(max_length=250, default="default_last")
    cover_letter=serializers.CharField(max_length=500, default="This is my Cover Letter")
    is_accepted=serializers.BooleanField(default=False)
    is_declined=serializers.BooleanField(default=False) 
    resume = serializers.FileField(default="static/resume/default_resume.pdf")
    

    class Meta:
        model = JobApplication
        fields=('id','applicant','Job','email','first_name','last_name', 'cover_letter','is_accepted','is_declined','resume')


class EmployeeApplicationsSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=250 ,default="default@default.com")
    ee_is_accepted=serializers.BooleanField(default=False)
    ee_is_declined=serializers.BooleanField(default=False)
    is_accepted=serializers.BooleanField(default=False)
    is_declined=serializers.BooleanField(default=False)
    
    class Meta:
        model=JobApplication
        fields=('id','applicant','Job','email','ee_is_accepted','ee_is_declined','is_accepted','is_declined')
        depth = 1





# class ApplicantViewsetSerializer(serializers.Serializer):
    



    

   