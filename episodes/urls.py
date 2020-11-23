from django.urls import path
from .views import NoteListCreateApiView, EpisodeListCreateApiView, NoteDetailApiView

app_name = "episodes"

urlpatterns = [
    path('', EpisodeListCreateApiView.as_view()),
    path('<str:episode>/notes/', NoteListCreateApiView.as_view(), name="notes_list"),
    path('<str:episode>/notes/<int:pk>/', NoteDetailApiView.as_view(), name="note_detail"),
]
