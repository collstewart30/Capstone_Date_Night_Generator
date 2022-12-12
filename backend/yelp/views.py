from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from .models import Yelp
from .serializers import YelpSerializer
from django.shortcuts import get_object_or_404
import requests
from requests.auth import HTTPBasicAuth


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def yelp_items_search(request):
    print(
        'User: 'f"{request.user.id} {request.user.email} {request.user.username}")
    
    rest_response = requests.get("https://swapi.dev/api/")
    print(rest_response.headers)
    print(rest_response.json())
    # best practices services django requests library
    # benefits of doing it this way: security, performance
    # calling API in backedn and then serializing data in a response variable to send to the front end
    # Yelp API was being bloked by CORS

    rest_response = requests.get("https://api.yelp.com/v3/businesses/search?term=restaurant&location=Baltimore", auth=('collstewart30@gmail.com', 'lIndsAylOhan3'))
    print(rest_response.status_code)
    print(rest_response.json())

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