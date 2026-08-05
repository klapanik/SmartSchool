from django.urls import path
from .views import ScheduleView


urlpatterns = [
    path('schedule/', ScheduleView.as_view(), name='schedule')
]
