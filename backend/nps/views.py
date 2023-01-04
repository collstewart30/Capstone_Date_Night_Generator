from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from .models import NPS
from .serializers import NPSSerializer
from django.shortcuts import get_object_or_404



@api_view(['GET', 'POST','PATCH'])  
@permission_classes([IsAuthenticated])
def nps_items_search(request):
    print('User: 'f"{request.user.id} {request.user.email} {request.user.username}")
    # print('Event ID: 'f"{request.id}")

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
    # elif request.method == 'PUT':
    #     nps_items = get_object_or_404(NPS, user_id=request.user.id)
    #     serializer = NPSSerializer(nps_items, data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     serializer.save()
    #     return Response(serializer.data)
    # elif request.method == 'PATCH':
    #     nps_items = get_object_or_404(NPS, user_id=request.user.id)
    #     serializer = NPSSerializer(nps_items, data=request.data, partial=True)
    #     serializer.is_valid(raise_exception=True)
    #     serializer.save()
    #     return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET','PUT', 'DELETE'])  # get comments by video id
@permission_classes([IsAuthenticated])
def nps_by_id(request, event_id):
    nps_items = get_object_or_404(NPS, user_id=request.user.id, event_id=event_id)
    if request.method == 'GET':
        serializer = NPSSerializer(nps_items, event_id=event_id)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        serializer = NPSSerializer(nps_items, data=request.data, event_id=event_id)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        nps_items.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])  
@permission_classes([IsAuthenticated])
def nps_get_favorites(request):

    if request.method == 'GET':
        nps_items = NPS.objects.filter(user_id=request.user.id, isFavorite="True")
        serializer = NPSSerializer(nps_items, many=True)
        return Response(serializer.data)
