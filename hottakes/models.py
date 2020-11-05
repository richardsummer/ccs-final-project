from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model();

class Hottake(models.Model):
    title = models.CharField(max_length=100, unique=True)
    text = models.TextField()
    # posted = models.DateTimeField(db_index=True, auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.text
