from django.urls import path
from django.views.generic import TemplateView
from .views import ItemViewSet, UnitViewSet

items_list = ItemViewSet.as_view({"get": "list", "post": "create", "delete": "destroy"})
items_list_id = ItemViewSet.as_view({'get': 'retrieve',"patch": "partial_update"})
unit_set = UnitViewSet.as_view({"post": "create"})
unit_set_id = UnitViewSet.as_view({"delete": "destroy", "patch": "partial_update", "get": "get_units_by_item_id"})

urlpatterns = [
    path("list/", TemplateView.as_view(template_name="items/item_list.html"), name='items_render'),
    path("add/", TemplateView.as_view(template_name="items/item_add.html"), name='items_add'),
    path("edit/<int:item_id>", TemplateView.as_view(template_name="items/item_edit.html"), name='items_edit'),
    path("items_list/", items_list, name='items'),
    path("items_list/<int:item_id>", items_list_id),
    path("additional_units/", unit_set, name="units"),
    path("additional_units/<int:additional_unit_id>", unit_set_id),
    path("view/<int:item_id>", TemplateView.as_view(template_name="items/item_view.html")),
    path("additional_units_for_item/<int:item_id>", unit_set_id)
]
