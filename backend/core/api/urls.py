from django.urls import path, include

urlpatterns = [
    path('user/', include("users.api.urls")),
    path('', include("smart_school.api.urls")),
]
