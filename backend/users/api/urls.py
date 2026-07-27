from rest_framework.routers import DefaultRouter
from .views import UserViewSet
from django.urls import path

users_router = DefaultRouter()
users_router.register(r'user', UserViewSet)