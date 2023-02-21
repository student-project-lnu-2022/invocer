from django.urls import path
from .views import home_view, clients_list_view


urlpatterns = [
    path("home/", home_view, name='home'),
    path("list/", clients_list_view, name='clients'),
]

