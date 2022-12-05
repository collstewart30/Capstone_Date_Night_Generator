from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from .models import Yelp
from .serializers import YelpSerializer
from django.shortcuts import get_object_or_404



@api_view(['GET'])  
@permission_classes([AllowAny])
def get_yelp_favorites(request):
    
    return Response('yelp backend')