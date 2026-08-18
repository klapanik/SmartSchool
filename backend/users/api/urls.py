from .views import (
    UserActivationView,
    UserLogoutAPIView,
    UserLoginView,
    VerifyEmailView,
    ResendVerificationView,
    ChangeContactView,
    VerifyChangeView,
)
from django.urls import path

urlpatterns = [
    path("activate/", UserActivationView.as_view(), name="activate"),
    path("login/", UserLoginView.as_view(), name="login"),
    path("logout/", UserLogoutAPIView.as_view(), name="logout"),
    path('verify-email/', VerifyEmailView.as_view(), name='verify-email'),
    path('resend-verification/', ResendVerificationView.as_view(), name='resend-verification'),
    path('change-contact/', ChangeContactView.as_view(), name='change-contact'),
    path('verify-change/', VerifyChangeView.as_view(), name='verify-change'),
]
