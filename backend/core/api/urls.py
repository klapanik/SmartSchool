from rest_framework.routers import DefaultRouter
from users.api.urls import users_router
from django.urls import path, include

router = DefaultRouter()

router.registry.extend(users_router.registry)

urlpatterns = [
    path('', include(router.urls))
]
