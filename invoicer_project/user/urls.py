from django.urls import path
from .views import LoginView, RegisterView, RefreshView
from django.urls import path, include

urlpatterns = [
    path("register/", RegisterView, name='register'),
    path("login/", LoginView, name='login'),
    path('refresh/', RefreshView, name='refresh'),
]