from django.urls import path
from django.views.generic import TemplateView
from .views import InvoiceViewSet, OrderedItemViewSet

invoice_list = InvoiceViewSet.as_view({"get": "list", "post": "create", 'delete': 'destroy'})
ordered_items_set = OrderedItemViewSet.as_view({"post": "create"})

urlpatterns = [
    path("invoice/", invoice_list, name='invoices'),
    path("ordered_items/", ordered_items_set, name="ordered_items"),
    path("list/", TemplateView.as_view(template_name="invoices/invoices_list.html"), name='invoices_render'),
    path('download/<int:invoice_id>', InvoiceViewSet.as_view({'get': 'download_data'}), name='invoice_download'),
]
