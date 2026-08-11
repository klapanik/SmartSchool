from .views import (
    UserActivationView,
    UserLogoutAPIView,
    UserRefreshView,
    UserLoginView,
    UserRegisterView,
    VerifyEmailView,
    ResendVerificationView,
    UserProfileView,
)
from django.urls import path

urlpatterns = [
    path("activate/", UserActivationView.as_view(), name="activate"),
    path("login/", UserLoginView.as_view(), name="login"),
    path("logout/", UserLogoutAPIView.as_view(), name="logout"),
    path("refresh/", UserRefreshView.as_view(), name="refresh"),
    path('register/', UserRegisterView.as_view(), name='register'),
    path('verify-email/', VerifyEmailView.as_view(), name='verify-email'),
    path('resend-verification/', ResendVerificationView.as_view(), name='resend-verification'),
    path('profile/', UserProfileView.as_view(), name='profile'),
]
