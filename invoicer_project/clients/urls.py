from django.urls import path
from .views import ClientViewSet
from django.views.generic import TemplateView

clients_methods = ClientViewSet.as_view({'post': 'create', 'get': 'list'})
clients_list = ClientViewSet.as_view({"get": "list"})
delete_client = ClientViewSet.as_view({'delete': 'destroy'})

urlpatterns = [
    path("home/", TemplateView.as_view(template_name="clients/clients_list.html"), name='home'),
    path("list/", clients_list, name='clients'),
    path("client/<int:client_id>", delete_client, name='delete_client'),
    path("client/", clients_methods, name='clients_add'), 
    path("add/", TemplateView.as_view(template_name="clients/client_add.html"), name='render_add')
]