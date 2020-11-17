from .serializers import HottakeSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.views.generic.edit import DeleteView
from hottakes.models import Hottake


class HottakeListCreateApiView(generics.ListCreateAPIView):
    queryset = Hottake.objects.all().order_by('-created_at')
    serializer_class = HottakeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly,]

    def perform_create(self, serializer):
         serializer.save(author=self.request.user)

class HottakeDetailApiView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Hottake.objects.all()
    serializer_class = HottakeSerializer
