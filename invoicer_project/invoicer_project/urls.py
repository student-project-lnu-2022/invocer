from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include('user.urls')),
    path('clients/', include('clients.urls')),
    path('items/', include('items.urls')),
    path("", TemplateView.as_view(template_name="invoices/invoices_list.html"), name='invoices_render'),
    path('invoices/', include('invoices.urls')),
]
