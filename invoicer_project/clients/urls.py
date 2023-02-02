from django.urls import path
from .views import ClientsListView


urlpatterns = [
    path("list/", ClientsListView, name='clients'),
]
