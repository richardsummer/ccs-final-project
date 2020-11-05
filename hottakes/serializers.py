from rest_framework import serializers
from .models import Hottake

class HottakeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Hottake
        fields = ['id', 'title', 'text', 'created_at']
