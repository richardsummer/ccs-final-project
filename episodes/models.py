from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model();

class Note(models.Model):

    CATEGORY_CHOICES = [
        ('TSTP', 'Timestamp'),
        ('LNK', 'Link')
    ]

    episode = models.ForeignKey('Episode', on_delete=models.CASCADE)
    text = models.TextField()
    category = models.CharField(max_length=4, choices=CATEGORY_CHOICES)

    def __str__(self):
        return self.text

class Episode(models.Model):
    show_id = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.show_id
