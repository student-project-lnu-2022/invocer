from django.urls import path
from .views import ClientViewSet
from django.views.generic import TemplateView


clients_methods = ClientViewSet.as_view({'post': 'create', 'get': 'list', 'delete': 'destroy'})
clients_id_methods = ClientViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update'})



urlpatterns = [
    path("home/", TemplateView.as_view(template_name="clients/clients_list.html"), name='home'),
    path("client/<int:client_id>", clients_id_methods),
    path("client/", clients_methods),
    path("add/", TemplateView.as_view(template_name="clients/client_add.html")),
    path("edit/<int:client_id>", TemplateView.as_view(template_name="clients/client_edit.html")),
    path("view/<int:client_id>", TemplateView.as_view(template_name="clients/client_view.html")),
]