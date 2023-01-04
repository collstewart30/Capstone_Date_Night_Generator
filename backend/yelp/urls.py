from django.urls import path
from . import views


urlpatterns = [
    path('', views.yelp_items_search),
    path('yelp_api/', views.yelp_api),
    path('yelp_api/search/', views.search_yelp_api),
    path('<str:business_id>/', views.yelp_by_id),
]