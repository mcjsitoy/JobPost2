
from Jobs.api import JobListViewSet, PostJobViewSet, SearchViewset, EditJobViewset
from Jobs.views import ApplyJobView, PostJobView, JobListView, ApplyJobView,EditJobView
from django.urls import path


app_name = 'Jobs'

urlpatterns = [   
    path('post_job',PostJobViewSet.as_view({'post': 'post_job'})),
    path('api/job_post/',PostJobView.as_view(), name='job_post'),
    path('api/job_list',JobListViewSet.as_view({'get':'job_list'})),
    path('job_list', JobListView.as_view(),name='job_list'),
    path('api/job_search',SearchViewset.as_view({'post':'job_search'})),
    path('apply_job',ApplyJobView.as_view(),name='apply_job'),
    path('edit_job/<int:pk>',EditJobView.as_view(),name='edit_job'),
    path('api/edit_job/<int:pk>',EditJobViewset.as_view({'post': 'job_edit'}))
    # path('api-token-auth/', CustomAuthToken.as_view(), name='login'),   
]
