from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from .models import Ticketmaster
from .serializers import TicketmasterSerializer
from django.shortcuts import get_object_or_404



@api_view(['GET', 'POST', 'PUT', 'DELETE'])  
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
        ticketmaster_items = Ticketmaster.objects.filter(user_id=request.user.id)
        serializer = TicketmasterSerializer(ticketmaster_items, many=True)
        return Response(serializer.data)


@api_view(['GET','PUT', 'DELETE'])  # GET, PUT, DELETE by id
@permission_classes([IsAuthenticated])
def ticketmaster_by_id(request, event_id):
    ticketmaster_items = get_object_or_404(Ticketmaster, user_id=request.user.id, event_id=event_id)
    if request.method == 'GET':
        serializer = TicketmasterSerializer(ticketmaster_items)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        serializer = TicketmasterSerializer(ticketmaster_items, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        ticketmaster_items.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def tm_saveFuture(request):
    ticketmaster_items = Ticketmaster.objects.filter()
    serializer = TicketmasterSerializer(ticketmaster_items, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET', 'POST','PATCH'])  
@permission_classes([IsAuthenticated])
def ticketmaster_filter_saveCurrent(request):
    print('User: 'f"{request.user.id} {request.user.email} {request.user.username}")

    if request.method == 'GET':
        ticketmaster_items = Ticketmaster.objects.filter(user_id=request.user.id, saveCurrent="True")
        serializer = TicketmasterSerializer(ticketmaster_items, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST','PATCH'])  
@permission_classes([IsAuthenticated])
def ticketmaster_filter_isFavorite(request):
    print('User: 'f"{request.user.id} {request.user.email} {request.user.username}")

    if request.method == 'GET':
        ticketmaster_items = Ticketmaster.objects.filter(user_id=request.user.id, isFavorite="True")
        serializer = TicketmasterSerializer(ticketmaster_items, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST','PATCH'])  
@permission_classes([IsAuthenticated])
def ticketmaster_filter_saveFuture(request):
    print('User: 'f"{request.user.id} {request.user.email} {request.user.username}")

    if request.method == 'GET':
        ticketmaster_items = Ticketmaster.objects.filter(user_id=request.user.id, saveFuture="True")
        serializer = TicketmasterSerializer(ticketmaster_items, many=True)
        return Response(serializer.data)

@api_view(['GET', 'POST','PATCH'])  
@permission_classes([IsAuthenticated])
def ticketmaster_filter_completed(request):
    print('User: 'f"{request.user.id} {request.user.email} {request.user.username}")

    if request.method == 'GET':
        ticketmaster_items = Ticketmaster.objects.filter(user_id=request.user.id, completed="True")
        serializer = TicketmasterSerializer(ticketmaster_items, many=True)
        return Response(serializer.data)
