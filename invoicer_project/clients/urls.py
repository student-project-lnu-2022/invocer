from django.urls import path
from .views import ClientViewSet
from django.views.generic import TemplateView

clients_methods = ClientViewSet.as_view({'post': 'create', 'get': 'list', 'delete': 'destroy'})

urlpatterns = [
    path("home/", TemplateView.as_view(template_name="clients/clients_list.html"), name='home'),
    path("add/", TemplateView.as_view(template_name="clients/client_add.html"), name='render_add'),
    path("list/", clients_methods, name='clients'),
    path("client/<int:client_id>", clients_methods, name='delete_client'),
    path("client/", clients_methods, name='clients_add')
]