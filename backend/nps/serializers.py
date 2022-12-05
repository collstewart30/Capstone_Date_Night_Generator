from rest_framework import serializers
from .models import NPS


class NPSSerializer(serializers.ModelSerializer):
    class Meta:
        model = NPS
        fields = ['id', 'park_id', 'title', 'url', 'park_name', 'state', 'description', 'type', 'saveCurrent', 'saveFuture', 'completed', 'isFavorite', 'user_id']
        depth = 1
