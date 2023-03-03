from django.urls import path
from .views import ItemViewSet
from django.views.generic import TemplateView

items_list = ItemViewSet.as_view({"get": "list", "post": "create"})

urlpatterns = [
    path("list/", TemplateView.as_view(template_name="items/item_list.html"), name='items'),
    path("items_list/", items_list, name='items'),
    path("add/", items_list, name='add_item')
]