from django.urls import path
from .views import LoginView, RegisterView


urlpatterns = [
    path("register/", RegisterView, name='register'),
    path("login/", LoginView, name='login'),
    # path("clients/", getClientsView, name='clients')
    # path('logout', logout, name='logout')
]
