from .views import UserActivationView, UserLogoutAPIView, UserRefreshView, UserLoginView
from django.urls import path

from . import views

urlpatterns = [
    path("activate/", UserActivationView.as_view(), name="activate"),
    path("login/", UserLoginView.as_view(), name="login"),
    path("logout/", UserLogoutAPIView.as_view(), name="logout"),
    path("refresh/", UserRefreshView.as_view(), name="refresh"),
    path('register/', views.register_user, name='register'),
    path('verify-email/', views.verify_email, name='verify-email'),
    path('resend-verification/', views.resend_verification_code, name='resend-verification'),
    path('profile/', views.get_user_profile, name='profile'),
]
