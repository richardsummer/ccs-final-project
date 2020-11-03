from django.db import models

class Hottake(models.Model):
    title = models.CharField(max_length=100, unique=True)
    body = models.TextField()
    posted = models.DateTimeField(db_index=True, auto_now_add=True)

    def __str__(self):
        return self.text
