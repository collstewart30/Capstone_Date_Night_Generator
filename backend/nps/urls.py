from django.urls import path
from . import views


urlpatterns = [
    # path('/<str:userid>', views.nps_items_search)
    path('', views.nps_items_search)
]