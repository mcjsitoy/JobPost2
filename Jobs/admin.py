from django.contrib import admin
from .models import Jobs,JobApplication

# Register your models here.

class JobAdmin(admin.ModelAdmin):
    model = Jobs
    list_display = ('job_title', 'job_description', 'job_poster','date_posted','location','salary_range','img')
    
    fieldsets = (
       
        (None, {'fields': ('job_title', 'job_description','job_poster','location','salary_range','img','category')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            
            'fields': ('job_title', 'job_description','job_poster','location','category', 'salary_range','img','category')}
        ),
    )


class JobApplicationAdmin(admin.ModelAdmin):
    model = Jobs
    list_display = ('email', 'first_name', 'last_name','resume','date_applied','applicant','Job','cover_letter','is_accepted','is_declined','ee_is_accepted','ee_is_declined')
 
    
    
    fieldsets = (
       
        (None, {'fields': ('email', 'first_name','last_name','resume','applicant','Job','cover_letter','is_accepted','is_declined','ee_is_accepted','ee_is_declined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            
            'fields': ('email', 'first_name','last_name','resume','date_applied', 'applicant','Job','cover_letter','is_accepted','is_declined','ee_is_accepted','ee_is_declined')}
        ),
    )

    
admin.site.register(Jobs, JobAdmin)
admin.site.register(JobApplication, JobApplicationAdmin)