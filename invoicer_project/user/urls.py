from django.urls import path
from .views import RegistrationViewSet, LoginViewSet, RefreshViewSet, UserSettingsViewSet
from django.urls import path
from django.views.generic import TemplateView

register_methods = RegistrationViewSet.as_view({'get': 'registration_page', 'post': 'create'})
login_methods = LoginViewSet.as_view({'get': 'login_page', 'post': 'create'})
refresh_methods = RefreshViewSet.as_view({'post': 'create'})
decode_methods = RefreshViewSet.as_view({'post': 'decode'})
logout_method = LoginViewSet.as_view({'post': 'logout'})
settings_method = UserSettingsViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update'})

urlpatterns = [
    path("register/", register_methods, name='register'),
    path("login/", login_methods, name='login'),
    path('refresh/', refresh_methods , name='refresh'),
    path('decode/', decode_methods , name='decode'),
    path('forgot_password/', TemplateView.as_view(template_name="user/forgot_password.html") , name='forgot_password'),
    path('logout/', logout_method, name='logout'),
    path('settings/', TemplateView.as_view(template_name="user/settings.html"), name='settings'),
    path("user/", settings_method),
]