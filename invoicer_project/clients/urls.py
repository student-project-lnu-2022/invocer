from django.urls import path
from .views import home_view, ClientViewSet

clients_methods = ClientViewSet.as_view({'post': 'create', 'get': 'list'})
clients_list = ClientViewSet.as_view({"get": "list"})
delete_client = ClientViewSet.as_view({'delete': 'destroy'})

urlpatterns = [
    path("home/", home_view, name='home'),
    path("list/", clients_list, name='clients'),
    path("client/<client_id>", delete_client, name='delete_client'),
    path("client/", clients_methods, name='clients_add')
]
