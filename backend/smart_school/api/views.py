from collections import defaultdict

from django.db.models import Prefetch, Avg
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from smart_school.models import Grade, ScheduleLesson, Quarter
from .serializers import ScheduleLessonSerializer, GradeSerializer, QuarterSerializer


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


class GradesView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        student = request.user.student_profile

        grades = (
            Grade.objects
            .filter(student=student)
            .select_related(
                "subject",
                "teacher__user",
            )
            .order_by("-created_at")
        )

        subject = request.query_params.get("subject")
        quarter = request.query_params.get("quarter")
        date_from = request.query_params.get("from")
        date_to = request.query_params.get("to")

        if subject:
            grades = grades.filter(subject_id=subject)

        if quarter:
            quarter = Quarter.objects.get(
                pk=quarter,
                school=student.school_class.school,
            )

            grades = grades.filter(
                created_at__date__range=(
                    quarter.starts_at,
                    quarter.ends_at,
                )
            )

        if date_from:
            grades = grades.filter(created_at__date__gte=date_from)

        if date_to:
            grades = grades.filter(created_at__date__lte=date_to)

        serializer = GradeSerializer(grades, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GradeAverageView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        student = request.user.student_profile

        grades = Grade.objects.filter(student=student)

        quarter = request.query_params.get("quarter")
        group_by = request.query_params.get("group_by")

        if quarter:
            quarter = Quarter.objects.get(
                pk=quarter,
                school=student.school_class.school,
            )

            grades = grades.filter(
                created_at__date__range=(
                    quarter.starts_at,
                    quarter.ends_at,
                )
            )

        if group_by == "subjects":
            averages = (
                grades
                .values("subject__name")
                .annotate(average=Avg("grade"))
                .order_by("subject__name")
            )

            result = [
                {
                    "subject": item["subject__name"],
                    "average": item["average"],
                } for item in averages
            ]

            return Response(result, status=status.HTTP_200_OK)

        average = grades.aggregate(average=Avg("grade"))["average"] or 0

        return Response({"average": average}, status=status.HTTP_200_OK)


class QuartersView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        student = request.user.student_profile

        quarters = (
            Quarter.objects
            .filter(school=student.school_class.school)
            .order_by("number")
        )

        serializer = QuarterSerializer(quarters, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
