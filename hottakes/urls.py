from django.urls import path
from .views import HottakeListCreateApiView, HottakeDetailApiView

app_name = "hottakes"

urlpatterns = [
    
    path('<int:pk>/', HottakeDetailApiView.as_view(), name="hottake_detail"),
    path('', HottakeListCreateApiView.as_view(), name="hottakes_list"),
]
