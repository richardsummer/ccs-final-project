from .serializers import HottakeSerializer
from rest_framework import generics
from hottakes.models import Hottake

class HottakeListApiView(generics.ListAPIView):
    queryset = Hottake.objects.all()
    serializer_class = HottakeSerializer

class HottakeListCreateApiView(generics.CreateAPIView):
    queryset = Hottake.objects.all()
    serializer_class = HottakeSerializer

class HottakeDetailApiView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Hottake.objects.all()
    serializer_class = HottakeSerializer
