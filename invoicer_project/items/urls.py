from django.urls import path
from django.views.generic import TemplateView

urlpatterns = [
    path("list/", TemplateView.as_view(template_name="items/item_list.html"), name='items_list'),
    path("add/", TemplateView.as_view(template_name="items/item_add.html"), name='items_add'),
]