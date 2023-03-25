from django.urls import path
from django.views.generic import TemplateView
from .views import InvoiceViewSet, OrderedItemViewSet

invoice_list = InvoiceViewSet.as_view({"get": "list", "post": "create", 'delete': 'destroy'})
ordered_items_set = OrderedItemViewSet.as_view({"post": "create"})

urlpatterns = [
    path("invoice/", invoice_list, name='invoices'),
    path("ordered_items/", ordered_items_set, name="ordered_items"),
    path('download/<int:invoice_id>', InvoiceViewSet.as_view({'get': 'download_data'}), name='invoice_download'),
    path("add/", TemplateView.as_view(template_name="invoices/invoice_add.html"), name='invoices_add'),
    path('send_email/<int:invoice_id>/<str:recipient_email>/', InvoiceViewSet.as_view({'post': 'send_email'}), name='send_invoice_email'),
]
