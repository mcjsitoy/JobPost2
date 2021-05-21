from django.contrib import admin
from .models import Jobs

# Register your models here.

class JobAdmin(admin.ModelAdmin):
    model = Jobs
    list_display = ('job_title', 'job_description', 'job_poster','date_posted','location','salary_range')
 
    
    
    fieldsets = (
       
        (None, {'fields': ('job_title', 'job_description','job_poster','location','category','salary_range')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            
            'fields': ('job_title', 'job_description','job_psoter','location','category', 'salary_range')}
        ),
    )


    
admin.site.register(Jobs, JobAdmin)