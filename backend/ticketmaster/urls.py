from django.urls import path
from . import views


urlpatterns = [
    path('save_current/', views.ticketmaster_filter_saveCurrent),
    path('save_future/', views.ticketmaster_filter_saveFuture),
    path('completed/', views.ticketmaster_filter_completed),
    path('favorite/', views.ticketmaster_filter_isFavorite),
    path('', views.ticketmaster_items_search),
    path('<str:event_id>/', views.ticketmaster_by_id),
]