from .views import UserActivationView, UserLogoutAPIView, UserRefreshView, UserLoginView
from django.urls import path

urlpatterns = [
    path("activate/", UserActivationView.as_view(), name="activate"),
    path("login/", UserLoginView.as_view(), name="logout"),
    path("logout/", UserLogoutAPIView.as_view(), name="logout"),
    path("refresh/", UserRefreshView.as_view(), name="logout"),
]
