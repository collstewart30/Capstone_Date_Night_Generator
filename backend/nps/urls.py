from django.urls import path
from . import views


urlpatterns = [
    path('', views.nps_items_search)
]