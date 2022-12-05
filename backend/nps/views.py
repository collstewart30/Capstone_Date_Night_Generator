from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from .models import NPS
from .serializers import NPSSerializer
from django.shortcuts import get_object_or_404



@api_view(['GET'])  
@permission_classes([AllowAny])
def get_nps_favorites(request):
    
    return Response('nps backend')


# @api_view(['GET', 'POST'])     
# @permission_classes([IsAuthenticated])
# def user_comments(request):
#    # print('User ',f"{request.user.id} {request.user.email} {request.user.username}")
    
#     if request.method == 'POST':
#         serializer = NPSSerializer(data=request.data)        
#         serializer.is_valid(raise_exception=True)
#         serializer.save(user=request.user)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)