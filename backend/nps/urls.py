from django.urls import path
from . import views


urlpatterns = [
    # path('/<str:userid>', views.nps_items_search)
    path('', views.nps_items_search),
    path('<str:event_id>/', views.nps_by_id),
    path('<nps_saveFuture/', views.nps_saveFuture),
]