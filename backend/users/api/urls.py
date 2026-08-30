from .views import *
from django.urls import path

urlpatterns = [
    path("activate/", UserActivationView.as_view(), name="activate"),
    path("login/", UserLoginView.as_view(), name="login"),
    path("logout/", UserLogoutAPIView.as_view(), name="logout"),
    path("refresh/", UserRefreshView.as_view(), name="refresh"),
    path("me/", UserProfileView.as_view(), name="profile"),
    path("me/change/email/", ChangeEmailView.as_view(), name="change-email"),
    path("me/change/phone/", ChangePhoneView.as_view(), name="change-phone"),
    path("verify-changes/", VerifyChangesView.as_view(), name="verify-changes"),
    path(
        "resend-verification/",
        ResendVerificationView.as_view(),
        name="resend-verification",
    ),
]
