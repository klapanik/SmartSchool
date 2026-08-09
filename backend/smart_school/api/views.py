from collections import defaultdict

from django.db.models import Prefetch, Avg, Count
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from smart_school.models import Grade, ScheduleLesson, Quarter, QuarterGrade, LessonAttendance
from .serializers import *


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
            quarter = get_object_or_404(
                Quarter,
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
            quarter = get_object_or_404(
                Quarter,
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


class AnalyticsView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    MONTHS = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December",
    }

    def get(self, request):
        student = request.user.student_profile

        quarter_id = request.query_params.get("quarter")

        if not quarter_id:
            return Response({"detail": "Quarter parameter is required."}, status=status.HTTP_400_BAD_REQUEST)

        quarter = get_object_or_404(
            Quarter,
            pk=quarter_id,
            school=student.school_class.school,
        )

        student_grades = Grade.objects.filter(
            student=student,
            created_at__date__range=(quarter.starts_at, quarter.ends_at),
        ).select_related("subject")

        best_grade = student_grades.order_by("-grade").first()
        worst_grade = student_grades.order_by("grade").first()

        best_grade_data = None
        worst_grade_data = None

        if best_grade:
            best_grade_data = {
                "grade": best_grade.grade,
                "subject": best_grade.subject.name,
            }

        if worst_grade:
            worst_grade_data = {
                "grade": worst_grade.grade,
                "subject": worst_grade.subject.name,
            }

        absence_count = LessonAttendance.objects.filter(
            student=student,
            date__range=(quarter.starts_at, quarter.ends_at),
            is_absent=True,
        ).count()

        monthly_grades = (
            student_grades
            .values("created_at__date__year", "created_at__date__month")
            .annotate(average_grade=Avg("grade"))
            .order_by("created_at__date__year", "created_at__date__month")
        )

        monthly_average = [
            {
                "month": self.MONTHS[item["created_at__date__month"]],
                "average_grade": round(float(item["average_grade"]), 2),
            } for item in monthly_grades
        ]

        grade_distribution_queryset = (
            student_grades
            .values("grade")
            .annotate(count=Count("id"))
            .order_by("grade")
        )

        total_grades = student_grades.count()

        grade_distribution = []

        for item in grade_distribution_queryset:
            percentage = (
                item["count"] / total_grades * 100
                if total_grades
                else 0
            )

            grade_distribution.append(
                {
                    "grade": item["grade"],
                    "count": item["count"],
                    "percent": round(percentage, 1),
                }
            )

        return Response(
            {
                "absence_count": absence_count,
                "best_grade": best_grade_data,
                "worst_grade": worst_grade_data,
                "monthly_average": monthly_average,
                "grade_distribution": grade_distribution,
            },
            status=status.HTTP_200_OK,
        )
