from Users.api import LogoutViewset, SignupViewset, LoginViewset,EditProfileViewset
from Users.views import EditProfileView, LoginView, SignupView
from django.urls import path
from django.urls import include, path
from rest_framework import routers
from rest_framework.authtoken import views
from rest_framework.authtoken.views import obtain_auth_token

app_name = 'Users'

urlpatterns = [   
    path('login/', LoginViewset.as_view({'post': 'login'})), 
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/signup/',SignupView.as_view(), name='signup'),
    path('signup/',SignupViewset.as_view({'post': 'signup'})),
    path('logout/',LogoutViewset.as_view({'get':'logout'}), name='logout'),
    path('edit_profile/<int:pk>',EditProfileView.as_view(), name='edit_profile'),
    path('api/edit_profile/<int:pk>',EditProfileViewset.as_view({'post':'edit_profile'})),
    # path('api-token-auth/', CustomAuthToken.as_view(), name='login'),
    
]






