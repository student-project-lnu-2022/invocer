from django.urls import path
from .views import ClientViewSet
from django.views.generic import TemplateView

clients_list = ClientViewSet.as_view({"get": "list"})
client_crud = ClientViewSet.as_view(
    {'post': 'create', 'patch': 'partial_update', 'get': 'retrieve', 'delete': 'destroy'})

urlpatterns = [
    path("home/", TemplateView.as_view(template_name="clients/clients_list.html"), name='home'),
    path("list/", clients_list, name='clients'),
    path("client/<int:client_id>", client_crud, name='delete_client'),
    path("client_edit/<int:client_id>", client_crud, name='edit_client'),
    path("client/", client_crud, name='clients_add'),
    path("add/", TemplateView.as_view(template_name="clients/client_add.html"), name='render_add'),
    path("edit/<int:client_id>", TemplateView.as_view(template_name="clients/client_edit.html"), name='render_edit'),
    path("client_by_id/<int:client_id>", client_crud, name="client_by_id"),
]
