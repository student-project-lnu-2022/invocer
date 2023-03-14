from django.urls import path
from django.views.generic import TemplateView
from .views import ItemViewSet, UnitViewSet

items_list = ItemViewSet.as_view({"get": "list", "post": "create", "delete": "destroy"})
items_list_id = ItemViewSet.as_view({"patch": "partial_update"})
unit_set = UnitViewSet.as_view({"post": "create"})
unit_set_id = UnitViewSet.as_view({"delete": "destroy", "patch": "partial_update"})

urlpatterns = [
    path("list/", TemplateView.as_view(template_name="items/item_list.html"), name='items_render'),
    path("add/", TemplateView.as_view(template_name="items/item_add.html"), name='items_add'),
    path("items_list/", items_list, name='items'),
    path("items_list/<int:item_id>", items_list_id),
    path("additional_units/", unit_set, name="units"),
    path("additional_units/<int:additional_unit_id>", unit_set_id),    
]
