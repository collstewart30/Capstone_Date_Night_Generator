from rest_framework import serializers
from .models import Yelp, Yelp_API


class YelpSerializer(serializers.ModelSerializer):
    class Meta:
        model = Yelp
        fields = ['id', 'business_id', 'name', 'url', 'image_url', 'cuisine_type', 'city','saveCurrent', 'saveFuture', 'completed', 'isFavorite', 'user_id']
        depth = 1

