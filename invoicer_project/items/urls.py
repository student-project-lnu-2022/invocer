from django.urls import path
from django.views.generic import TemplateView
from .views import ItemViewSet

items_list = ItemViewSet.as_view({"get": "list", "post": "create"})
item_id_methods = ItemViewSet.as_view({'delete': 'destroy'})

urlpatterns = [
    path("list/", TemplateView.as_view(template_name="items/item_list.html"), name='items_render'),
    path("add/", TemplateView.as_view(template_name="items/item_add.html"), name='items_add'),
    path("items_list/", items_list, name='items'),
    path("item/<int:item_id>", item_id_methods),
]
