from collections import defaultdict

from django.db.models import Prefetch

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from smart_school.models import Grade, ScheduleLesson
from .serializers import ScheduleLessonSerializer


class ScheduleView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    WEEKDAYS = {
        1: "monday",
        2: "tuesday",
        3: "wednesday",
        4: "thursday",
        5: "friday",
        6: "saturday",
        7: "sunday",
    }

    def get(self, request):
        student = request.user.student_profile

        lessons = (
            ScheduleLesson.objects
            .filter(school_class=student.school_class)
            .select_related("subject")
            .prefetch_related(
                Prefetch(
                    "grades",
                    queryset=Grade.objects.filter(student=student),
                    to_attr="student_grades",
                )
            )
            .order_by("weekday", "lesson_number")
        )

        serializer = ScheduleLessonSerializer(lessons, many=True)
        result = defaultdict(list)

        for lesson, data in zip(lessons, serializer.data):
            result[self.WEEKDAYS[lesson.weekday]].append(data)

        return Response(result, status=status.HTTP_200_OK)