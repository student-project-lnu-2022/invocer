from django.urls import path
from .views import ClientViewSet, ClientRenderingViewSet

clients_methods = ClientViewSet.as_view({'post': 'create', 'get': 'list'})
clients_list = ClientViewSet.as_view({"get": "list"})
delete_client = ClientViewSet.as_view({'delete': 'destroy'})
render_home_client_html = ClientRenderingViewSet.as_view({'get': 'home_view'})
render_add_client_html = ClientRenderingViewSet.as_view({'get': 'add_client_view'})

urlpatterns = [
    path("home/", render_home_client_html, name='home'),
    path("list/", clients_list, name='clients'),
    path("client/<client_id>", delete_client, name='delete_client'),
    path("client/", clients_methods, name='clients_add'), 
    path("add/", render_add_client_html, name='render_add')
]