from .views import UserActivationView
from django.urls import path

urlpatterns = [
    path("activate/", UserActivationView.as_view(), name="activate"),
]