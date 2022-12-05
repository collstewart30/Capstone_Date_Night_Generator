from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from .models import Yelp
from .serializers import YelpSerializer
from django.shortcuts import get_object_or_404


# will need GET for user profile (authenticated): isFavorite, completed, saveCurrent, saveFuture
# will need POST for user profile (authenticated): save as favorite, mark complete, save for current, save for future

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def get_yelp_favorites(request):

    if request.method == 'POST':
        serializer = YelpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
