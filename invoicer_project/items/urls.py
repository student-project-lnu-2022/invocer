from django.urls import path
from .views import ItemViewSet
from django.views.generic import TemplateView

items_list = ItemViewSet.as_view({"get": "list", "post": "create"})
item_id_methods = ItemViewSet.as_view({'delete': 'destroy'})

urlpatterns = [
    path("list/", TemplateView.as_view(template_name="items/item_list.html"), name='items_render'),
    path("items_list/", items_list, name='items'),
    path("item/<int:item_id>", item_id_methods),
]
