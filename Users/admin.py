from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

# Register your models here.
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('email', 'is_staff', 'is_active','is_employer','is_employee','is_employed')
 
    list_filter = ('email', 'is_staff', 'is_active','is_employer','is_employee','is_employed')
    
    fieldsets = (
       
        (None, {'fields': ('email', 'password','first_name','last_name')}),
        ('Permissions', {'fields': ('is_staff', 'is_active','is_employee','is_employer','is_employed')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            
            'fields': ('email', 'first_name','last_name','password1', 'password2', 'is_staff', 'is_active','is_employee','is_employer','is_employed')}
        ),
    )
    search_fields = ('email',)
    ordering = ('email',)


    
admin.site.register(CustomUser, CustomUserAdmin)
