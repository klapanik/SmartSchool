from django.urls import path
from .views import ScheduleView, GradesView, GradeAverageView, QuartersView, QuarterGradesView


urlpatterns = [
    path('schedule/', ScheduleView.as_view(), name='schedule'),
    path('grades/', GradesView.as_view(), name='grades'),
    path('grades/average/', GradeAverageView.as_view(), name='average'),
    path('quarters/', QuartersView.as_view(), name='quarters'),
    path('quarters/grades/', QuarterGradesView.as_view(), name='quarters_grades'),
]
