from rest_framework import serializers
from .models import NPS


class NPSSerializer(serializers.ModelSerializer):
    class Meta:
        model = NPS
        fields = ['id', 'event_id', 'parkCode', 'title', 'url', 'image_url', 'park_name', 'state', 'description', 'type', 'saveCurrent', 'saveFuture', 'completed', 'isFavorite', 'user_id']
        depth = 1
