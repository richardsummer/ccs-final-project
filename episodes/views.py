from django.shortcuts import render, get_object_or_404
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Note, Episode
from .serializers import NoteSerializer, EpisodeSerializer

# Create your views here.
class NoteListCreateApiView(generics.ListCreateAPIView):
    # queryset = Note.objects.all().order_by('timestamp')
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticatedOrReadOnly,]

    def get_queryset(self):
        # import pdb; pdb.set_trace()
        return Note.objects.filter(episode__show_id=self.kwargs['episode'])

    def perform_create(self, serializer):
        # import pdb; pdb.set_trace()
        episode = get_object_or_404(Episode, show_id=self.kwargs['episode'])
        serializer.save(episode=episode)


class EpisodeListCreateApiView(generics.ListCreateAPIView):
    queryset = Episode.objects.all()
    serializer_class = EpisodeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly,]
