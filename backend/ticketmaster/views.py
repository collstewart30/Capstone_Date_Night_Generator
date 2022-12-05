from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from .models import Ticketmaster
from .serializers import TicketmasterSerializer
from django.shortcuts import get_object_or_404



@api_view(['GET'])  
@permission_classes([AllowAny])
def get_ticketmaster_favorites(request):
    
    return Response('ticketmaster backend')