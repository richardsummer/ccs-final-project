from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model();

class Note(models.Model):

    episode = models.ForeignKey('Episode', on_delete=models.CASCADE, null=True)
    text = models.TextField()
    timestamp = models.TimeField(default="00:00:00", blank=True, null=True)

    def __str__(self):
        return self.text[:255]

class Episode(models.Model):
    show_id = models.CharField(max_length=255, unique=True)
    title = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.show_id
