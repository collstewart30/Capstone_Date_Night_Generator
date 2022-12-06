from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from .models import Ticketmaster
from .serializers import TicketmasterSerializer
from django.shortcuts import get_object_or_404



@api_view(['GET', 'POST'])  
@permission_classes([IsAuthenticated])
def ticketmaster_items_search(request):
    print('User: 'f"{request.user.id} {request.user.email} {request.user.username}")

    if request.method == 'POST':
        serializer = TicketmasterSerializer(data=request.data)        
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        nps_items = Ticketmaster.objects.filter(user_id=request.user.id)
        serializer = TicketmasterSerializer(nps_items, many=True)
        return Response(serializer.data)