from django.urls import path
from .views import *


urlpatterns = [
    path("register/", get, name='register'),
    path("login/", getLoginView, name='login'),
    path("clients/", getClientsView, name='clients')
    # path('logout', logout, name='logout')
]
