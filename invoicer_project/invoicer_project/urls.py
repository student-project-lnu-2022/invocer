from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include('user.urls')),
    path('clients/', include('clients.urls')),
    path('items/', include('items.urls')),
]
