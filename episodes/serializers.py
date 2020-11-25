from rest_framework import serializers
from .models import Note, Episode

class NoteSerializer(serializers.ModelSerializer):
    episode = serializers.PrimaryKeyRelatedField(source='episode.show_id', read_only=True)

    class Meta:
        model = Note
        depth = 1
        fields = ['id', 'episode', 'text', 'timestamp']


class EpisodeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Episode
        fields = '__all__'
