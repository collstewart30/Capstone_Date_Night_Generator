from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from .models import Yelp
from .serializers import YelpSerializer
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


@api_view(['GET','PUT', 'DELETE'])  # GET, PUT, DELETE by id
@permission_classes([IsAuthenticated])
def yelp_by_id(request, business_id):
    yelp_items = get_object_or_404(Yelp, user_id=request.user.id, business_id=business_id)
    if request.method == 'GET':
        serializer = YelpSerializer(yelp_items)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        serializer = YelpSerializer(yelp_items, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        yelp_items.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes([AllowAny])
def yelp_api(request):

# , searchTerm 

    # example: 
    # rest_response_example = requests.get("https://swapi.dev/api/")
    # print(rest_response.headers)
    # print(rest_response_example.json())

    # Python requests library:      Yelp API was being blocked by CORS
    # best practices. services django requests library. benefits of doing it this way: security, performance
    # calling API in backend and then serializing data in a response variable to send to the front end
    
    headers = {'Authorization': 'Bearer {}'.format(api_key)}
    # baseUrl = "https://api.yelp.com/v3/businesses/search?term=restaurant&location=Baltimore&limit=1"

    params = {
        'location': "Batimore",
    }
    #, params=params

    # location = request.query_params.get("location")    empting query params from wk9 intermediate django code demo
    # print(location)

    rest_response = requests.get("https://api.yelp.com/v3/businesses/search?term=restaurant&limit=12&location=Baltimore", headers=headers)

    # if location:
    #     rest_response=rest_response.filter(location__city=location)   attempting query params from wk9 intermediate django code demo

    # print(rest_response.status_code)
    print(rest_response.headers)
    print(rest_response.url)
    print(rest_response.json())
    return Response(rest_response.json())



# @api_view(['GET'])
# @permission_classes([AllowAny])
# def search_yelp_api(request):

#     headers = {'Authorization': 'Bearer {}'.format(api_key)}
#     baseUrl = "https://api.yelp.com/v3/businesses/search?term=restaurant&location=Baltimore&limit=1"

#     params = {
#         'location': 'Baltimore'
#     }
#     #, params=params

#     rest_response = requests.get("https://api.yelp.com/v3/businesses/search?term=restaurant&limit=12", params, headers=headers)
#     # print(rest_response.status_code)
#     print(rest_response.headers)
#     print(rest_response.json())
#     return Response(rest_response.json())


@api_view(['GET', 'POST','PATCH'])  
@permission_classes([IsAuthenticated])
def yelp_filter_saveCurrent(request):
    print('User: 'f"{request.user.id} {request.user.email} {request.user.username}")

    if request.method == 'GET':
        yelp_items = Yelp.objects.filter(user_id=request.user.id, saveCurrent="True")
        serializer = YelpSerializer(yelp_items, many=True)
        return Response(serializer.data)

@api_view(['GET', 'POST','PATCH'])  
@permission_classes([IsAuthenticated])
def yelp_filter_saveFuture(request):
    print('User: 'f"{request.user.id} {request.user.email} {request.user.username}")

    if request.method == 'GET':
        yelp_items = Yelp.objects.filter(user_id=request.user.id, saveFuture="True")
        serializer = YelpSerializer(yelp_items, many=True)
        return Response(serializer.data)

@api_view(['GET', 'POST','PATCH'])  
@permission_classes([IsAuthenticated])
def yelp_filter_completed(request):
    print('User: 'f"{request.user.id} {request.user.email} {request.user.username}")

    if request.method == 'GET':
        yelp_items = Yelp.objects.filter(user_id=request.user.id, completed="True")
        serializer = YelpSerializer(yelp_items, many=True)
        return Response(serializer.data)

@api_view(['GET', 'POST','PATCH'])  
@permission_classes([IsAuthenticated])
def yelp_filter_isFavorite(request):
    print('User: 'f"{request.user.id} {request.user.email} {request.user.username}")

    if request.method == 'GET':
        yelp_items = Yelp.objects.filter(user_id=request.user.id, isFavorite="True")
        serializer = YelpSerializer(yelp_items, many=True)
        return Response(serializer.data)