from django.urls import path
from .views import NoteListCreateApiView

app_name = "episodes"

urlpatterns = [
    path('<str:episode>/notes/', NoteListCreateApiView.as_view(), name="notes_list"),
]
