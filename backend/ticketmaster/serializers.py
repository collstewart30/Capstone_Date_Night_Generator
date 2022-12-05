from rest_framework import serializers
from .models import Ticketmaster

class TicketmasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticketmaster
        fields = ['id', 'event_id', 'name', 'url', 'image', 'eventType', 'state', 'isFavorite', 'user_id']
        depth = 1