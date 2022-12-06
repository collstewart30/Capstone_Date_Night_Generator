from django.db import models
from authentication.models import User


# Create your models here.


class Yelp(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    business_id = models.CharField(max_length=100, default=0)
    name = models.CharField(max_length=100)
    url = models.CharField(max_length=500)
    image_url = models.CharField(max_length=250)
    cuisine_type = models.CharField(max_length=250)
    city = models.CharField(max_length=100)
    saveCurrent = models.CharField(max_length=100, default=False)
    saveFuture = models.CharField(max_length=100, default=False)
    completed = models.CharField(max_length=100, default=False)
    isFavorite = models.CharField(max_length=100, default=False)