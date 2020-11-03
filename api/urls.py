from django.urls import path, include

app_name = 'api'

urlpatterns = [
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/', include('rest_auth.urls')),
]
