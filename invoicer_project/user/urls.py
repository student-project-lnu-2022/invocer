from django.urls import path
from .views import RegistrationViewSet, LoginViewSet, RefreshViewSet
from django.urls import path

register_methods = RegistrationViewSet.as_view({'get': 'registration_page', 'post': 'create'})
login_methods = LoginViewSet.as_view({'get': 'login_page', 'post': 'create'})
refresh_methods = RefreshViewSet.as_view({'post': 'create'})
decode_methods = RefreshViewSet.as_view({'post': 'decode'})

urlpatterns = [
    path("register/", register_methods, name='register'),
    path("login/", login_methods, name='login'),
    path('refresh/', refresh_methods , name='refresh'),
    path('decode/', decode_methods , name='decode'),
]