from django.urls import path
from .views import ScheduleView, GradesView, GradeAverageView


urlpatterns = [
    path('schedule/', ScheduleView.as_view(), name='schedule'),
    path('grades/', GradesView.as_view(), name='grades'),
    path('grades/average/', GradeAverageView.as_view(), name='average'),
]
