from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from .models import Yelp
from .serializers import YelpSerializer, YelpAPISerializer
from django.shortcuts import get_object_or_404
import requests
from requests.auth import HTTPBasicAuth
from .yelp_local_settings import api_key


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def yelp_items_search(request):
    print(
        'User: 'f"{request.user.id} {request.user.email} {request.user.username}")

    if request.method == 'POST':
        serializer = YelpSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        yelp_items = Yelp.objects.filter(user_id=request.user.id)
        serializer = YelpSerializer(yelp_items, many=True)
        return Response(serializer.data)
    elif request.method == 'PUT':
        yelp_items = get_object_or_404(Yelp, user_id=request.user.id)
        serializer = YelpSerializer(yelp_items, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    elif request.method == 'DELETE':
        yelp_items = get_object_or_404(Yelp, user_id=request.user.id)
        yelp_items.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes([AllowAny])
def yelp_api(request):
    # example:
    rest_response_example = requests.get("https://swapi.dev/api/")
    # print(rest_response.headers)
    print(rest_response_example.json())

    # Python requests library:      Yelp API was being blocked by CORS
    # best practices. services django requests library. benefits of doing it this way: security, performance
    # calling API in backend and then serializing data in a response variable to send to the front end
    
    headers = {'Authorization': 'Bearer {}'.format(api_key)}
    baseUrl = "https://api.yelp.com/v3/businesses/search?term=restaurant&location=Baltimore&limit=1"

    params = {
        'term': 'restaurant',
        'location': 'Baltimore',
        'limit': 50
    }
    #, params=params

    rest_response = requests.get("https://api.yelp.com/v3/businesses/search?term=restaurant&location=Baltimore&limit=1", headers=headers)
    # print(rest_response.status_code)
    print(rest_response.headers)
    print(rest_response.json())
    serializer = YelpAPISerializer(rest_response, many=True)
    print(serializer.data)
    return Response(rest_response)
