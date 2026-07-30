from .views import UserActivationView, UserLogoutAPIView
from django.urls import path

urlpatterns = [
    path("activate/", UserActivationView.as_view(), name="activate"),
    path("logout/", UserLogoutAPIView.as_view(), name="logout"),
]
