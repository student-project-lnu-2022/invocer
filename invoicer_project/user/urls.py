from django.urls import path
from .views import login_view, registration_view, refresh_view, authentication_view, add_new_user_view
from django.urls import path

urlpatterns = [
    path("register/", registration_view, name='register'),
    path("login/", login_view, name='login'),
    path("authentication/", authentication_view, name='authentication'),
    path("create_user/", add_new_user_view, name='create_user'),
    path('refresh/', refresh_view, name='refresh'),
]