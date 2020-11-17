from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Note
from .serializers import NoteSerializer

# Create your views here.
class NoteListCreateApiView(generics.ListCreateAPIView):
    # queryset = Note.objects.all().order_by('timestamp')
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticatedOrReadOnly,]

    def get_queryset(self):
        # import pdb; pdb.set_trace()
        return Note.objects.filter(episode__show_id=self.kwargs['episode'])
