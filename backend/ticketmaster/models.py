from django.db import models
from authentication.models import User


# Create your models here.

class Ticketmaster(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    url = models.CharField(max_length=100)
    image = models.CharField(max_length=250)
    eventType = models.CharField(max_length=250)
    state = models.CharField(max_length=100)
    isFavorite = models.CharField(max_length=100)