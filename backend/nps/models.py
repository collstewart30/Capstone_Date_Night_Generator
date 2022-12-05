from django.db import models
from authentication.models import User


# Create your models here.


class NPS(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    park_id = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    url = models.CharField(max_length=100)
    park_name = models.CharField(max_length=250)
    state = models.CharField(max_length=2)
    description = models.CharField(max_length=250)
    type = models.CharField(max_length=100)
    isFavorite = models.CharField(max_length=100)