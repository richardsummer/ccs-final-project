from django.urls import path
from .views import NoteListCreateApiView, EpisodeListCreateApiView

app_name = "episodes"

urlpatterns = [
    path('', EpisodeListCreateApiView.as_view()),
    path('<str:episode>/notes/', NoteListCreateApiView.as_view(), name="notes_list"),
]
