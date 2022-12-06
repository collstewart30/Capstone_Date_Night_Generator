from django.urls import path
from . import views


urlpatterns = [
    path('', views.ticketmaster_items_search)
]