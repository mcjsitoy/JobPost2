from .models import Jobs
from django.core.validators import MaxValueValidator, MinValueValidator
from rest_framework import serializers

class JobPostSerializer(serializers.ModelSerializer):
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
        fields=('id', 'job_title', 'job_description','location','salary_range','category')

class JobSearchSerializer(serializers.Serializer):
   job_title=serializers.CharField(max_length=100)
   location=serializers.CharField(max_length=250)
   salary_range=serializers.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(900000)])
   category =serializers.CharField(max_length=100)
     

   class Meta:
    model = Jobs
    fields=('job_title', 'job_description','location','salary_range','category')


    

   