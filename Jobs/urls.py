
from Jobs.api import ApplicantsViewset, ApplicationsViewset,ErDeclineApplicationViewset, ErAcceptApplicationViewset, JobDetailsViewset, JobListViewSet, PostJobViewSet, SearchViewset, EditJobViewset, ApplyJobViewset, PostedJobsViewset
from Jobs.api import EeAcceptJobViewset,EeDeclineJobViewset
from Jobs.views import ApplyJobView, EmployeeApplicationView, PostJobView, JobListView, ApplyJobView,EditJobView, PostedJobsView, ViewApplicantsView,JobDetailsView,NoAccessView
from django.urls import path


app_name = 'Jobs'

urlpatterns = [   
    path('post_job',PostJobViewSet.as_view({'post': 'post_job'})),
    path('api/job_post/',PostJobView.as_view(), name='job_post'),
    path('api/job_list',JobListViewSet.as_view({'get':'job_list'})),
    path('job_list', JobListView.as_view(),name='job_list'),
    path('api/job_search',SearchViewset.as_view({'get':'job_search'})),
    path('apply_job/<int:pk>',ApplyJobView.as_view(),name='apply_job'),
    path('api/apply_job/<int:pk>',ApplyJobViewset.as_view({'post':'apply'})),
    path('edit_job/<int:pk>',EditJobView.as_view(),name='edit_job'),
    path('api/edit_job/<int:pk>',EditJobViewset.as_view({'post': 'job_edit'})),
    path('view_applicants/<int:pk>', ViewApplicantsView.as_view(), name='view_applicants'),
    path('api/view_applicants/<int:pk>',ApplicantsViewset.as_view({'get':'applicant_list'})),
    path('posted_jobs/<int:pk>',PostedJobsView.as_view(), name='posted_jobs'),
    path('api/posted_jobs/<int:pk>',PostedJobsViewset.as_view({'get':'job_list'})),
    path('api/employer_accept/<int:pk>',ErAcceptApplicationViewset.as_view({'post':'accept'}), name='api_employer_accept'),
    path('api/employer_decline/<int:pk>',ErDeclineApplicationViewset.as_view({'post':'decline'})),
    path('view_applications/<int:pk>',EmployeeApplicationView.as_view(),name='view_applications'),
    path('api/view_applications/<int:pk>',ApplicationsViewset.as_view({'get':'application_list'})),
    path('api/employee_accept/<int:pk>',EeAcceptJobViewset.as_view({'post':'accept'})),
    path('api/employee_decline/<int:pk>',EeDeclineJobViewset.as_view({'post':'decline'})),
    path('api/job_details/<int:pk>',JobDetailsViewset.as_view({'get':'job_details'})),
    path('job_details/<int:pk>', JobDetailsView.as_view(),name='job_details'),
    path('no_access',NoAccessView.as_view(),name='no_access'),
   

    # path('api-token-auth/', CustomAuthToken.as_view(), name='login'),   
]


