from collections import defaultdict

from django.db.models import Prefetch, Avg
from django.shortcuts import get_object_or_404
from django.utils import timezone

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from smart_school.models import Grade, ScheduleLesson, Quarter, QuarterGrade, Subject
from .serializers import ScheduleLessonSerializer, GradeSerializer, QuarterSerializer, QuarterGradeSerializer, SubjectSerializer


class ScheduleView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    WEEKDAYS = {
        1: {
            "name": "monday",
            "russianName": "Понедельник",
        },
        2: {
            "name": "tuesday",
            "russianName": "Вторник",
        },
        3: {
            "name": "wednesday",
            "russianName": "Среда",
        },
        4: {
            "name": "thursday",
            "russianName": "Четверг",
        },
        5: {
            "name": "friday",
            "russianName": "Пятница",
        },
        6: {
            "name": "saturday",
            "russianName": "Суббота",
        },
        7: {
            "name": "sunday",
            "russianName": "Воскресенье",
        },
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

        today_weekday = timezone.localdate().isoweekday()

        result = {
            weekday_data["name"]: {
                "russianName": weekday_data["russianName"],
                "isToday": weekday == today_weekday,
                "schedule": [],
            }
            for weekday, weekday_data in self.WEEKDAYS.items()
        }

        for lesson, data in zip(lessons, serializer.data):
            weekday_data = self.WEEKDAYS[lesson.weekday]
            result[weekday_data["name"]]["schedule"].append(data)

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


class QuarterGradesView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        student = request.user.student_profile

        quarter_grades = (
            QuarterGrade.objects
            .filter(student=student)
            .select_related(
                "subject",
                "quarter",
            )
            .order_by("quarter__number", "subject__name")
        )

        quarter = request.query_params.get("quarter")

        if quarter:
            quarter = Quarter.objects.get(
                pk=quarter,
                school=student.school_class.school,
            )

            quarter_grades = quarter_grades.filter(
                quarter=quarter,
            )

        serializer = QuarterGradeSerializer(quarter_grades, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SubjectView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        student = request.user.student_profile
        subjects = (student.school_class.subjects.order_by("name"))

        count_only = request.query_params.get("count_only")

        if count_only == "true":
            return Response({"count": subjects.count()}, status=status.HTTP_200_OK)

        serializer = SubjectSerializer(subjects, many=True)

        return Response(serializer.data,  status=status.HTTP_200_OK)
