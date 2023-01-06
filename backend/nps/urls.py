from django.urls import path
from . import views


urlpatterns = [
    path('save_current/', views.nps_filter_saveCurrent),
    path('save_future/', views.nps_filter_saveFuture),
    path('completed/', views.nps_filter_completed),
    path('favorite/', views.nps_filter_isFavorite),
    path('', views.nps_items_search),
    path('<str:event_id>/', views.nps_by_id),
]