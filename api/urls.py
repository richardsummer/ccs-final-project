from django.urls import path, include
from . import views

app_name = 'api'

urlpatterns = [
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('hottakes/', include('hottakes.urls')),
]
