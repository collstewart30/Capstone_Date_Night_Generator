from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from .models import NPS
from .serializers import NPSSerializer
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend


@api_view(['GET', 'POST','PATCH'])  
@permission_classes([IsAuthenticated])
def nps_items_search(request):
    print('User: 'f"{request.user.id} {request.user.email} {request.user.username}")

    if request.method == 'POST':
        serializer = NPSSerializer(data=request.data)        
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        nps_items = NPS.objects.filter(user_id=request.user.id)
        serializer = NPSSerializer(nps_items, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST','PATCH'])  
@permission_classes([IsAuthenticated])
def nps_filter_saveCurrent(request):
    print('User: 'f"{request.user.id} {request.user.email} {request.user.username}")

    if request.method == 'GET':
        nps_items = NPS.objects.filter(user_id=request.user.id, saveCurrent="True")
        serializer = NPSSerializer(nps_items, many=True)
        return Response(serializer.data)

@api_view(['GET', 'POST','PATCH'])  
@permission_classes([IsAuthenticated])
def nps_filter_saveFuture(request):
    print('User: 'f"{request.user.id} {request.user.email} {request.user.username}")

    if request.method == 'GET':
        nps_items = NPS.objects.filter(user_id=request.user.id, saveFuture="True")
        serializer = NPSSerializer(nps_items, many=True)
        return Response(serializer.data)

@api_view(['GET', 'POST','PATCH'])  
@permission_classes([IsAuthenticated])
def nps_filter_completed(request):
    print('User: 'f"{request.user.id} {request.user.email} {request.user.username}")

    if request.method == 'GET':
        nps_items = NPS.objects.filter(user_id=request.user.id, completed="True")
        serializer = NPSSerializer(nps_items, many=True)
        return Response(serializer.data)


@api_view(['GET','PUT', 'DELETE'])  # GET, PUT, DELETE by id (markComplete, saveCurrent, favorite)
@permission_classes([IsAuthenticated])
def nps_by_id(request, event_id):
    nps_items = get_object_or_404(NPS, user_id=request.user.id, event_id=event_id)
    if request.method == 'GET':
        serializer = NPSSerializer(nps_items)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        serializer = NPSSerializer(nps_items, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        nps_items.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


