from django.urls import path
from django.views.generic import TemplateView
from .views import ItemViewSet, UnitViewSet

items_list = ItemViewSet.as_view({"get": "list", "post": "create", 'delete': 'destroy'})
unit_set = UnitViewSet.as_view({"post": "create"})

urlpatterns = [
    path("list/", TemplateView.as_view(template_name="items/item_list.html"), name='items_render'),
    path("item/", items_list),
    path("add/", TemplateView.as_view(template_name="items/item_add.html"), name='items_add'),
    path("items_list/", items_list, name='items'),
    path("additional_units/", unit_set, name="units"),
]
