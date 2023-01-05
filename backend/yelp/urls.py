from django.urls import path
from . import views


urlpatterns = [
    path('save_current/', views.yelp_filter_saveCurrent),
    path('save_future/', views.yelp_filter_saveFuture),
    path('completed/', views.yelp_filter_completed),
    path('', views.yelp_items_search),
    path('yelp_api/', views.yelp_api),
    path('yelp_api/search/', views.search_yelp_api),
    path('<str:business_id>/', views.yelp_by_id),
]