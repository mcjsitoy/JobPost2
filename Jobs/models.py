from django.db import models
from Users.models import CustomUser
from django.core.validators import MaxValueValidator, MinValueValidator


# Create your models here.
class Jobs(models.Model):
    job_title=models.CharField(max_length=100)
    job_description=models.TextField()
    job_poster=models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    date_posted=models.DateField(auto_now_add=True)
    location=models.CharField(max_length=250, null=True, blank=True)
    salary_range=models.CharField(max_length=250)
   
    
    JOB_CATEGORIES=[
        ("1", "Computer"),
        ("2", "Finance"),
        ("3", "Entertainment"),
    ]
    category = models.CharField(
        max_length = 30,
        choices = JOB_CATEGORIES,
        default = "1"
        )
    def __str__(self):
        return self.job_title
    

class JobApplication(models.Model):
    applicant=models.ForeignKey(CustomUser, on_delete=models.CASCADE)    
    Job=models.ForeignKey(Jobs, on_delete=models.CASCADE)
    email = models.EmailField(max_length=250 ,default="default@default.com")
    first_name=models.CharField(max_length=250, default="default_first")   
    last_name=models.CharField(max_length=250, default="default_last")
    resume = models.FileField(upload_to="static/resume/", default="static/resume/default_resume.pdf")
    cover_letter=models.TextField(max_length=500 ,default="This is my cover letter")
    date_applied=models.DateField(auto_now_add=True)
    is_accepted=models.BooleanField(default=False)
    is_declined=models.BooleanField(default=False)  
    ee_is_accepted=models.BooleanField(default=False)
    ee_is_declined=models.BooleanField(default=False)
    





    


