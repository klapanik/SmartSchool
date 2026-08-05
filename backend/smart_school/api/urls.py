from django.urls import path
from .views import ScheduleView, GradesView


urlpatterns = [
    path('schedule/', ScheduleView.as_view(), name='schedule'),
    path('grades/', GradesView.as_view(), name='grades'),
]
