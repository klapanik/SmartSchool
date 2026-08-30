from django.db.models import Avg, Count
from django.utils import timezone
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from smart_school.models import Grade, ScheduleLesson, Quarter, QuarterGrade, LessonAttendance
from .serializers import (
    ScheduleLessonSerializer,
    GradeSerializer,
    QuarterSerializer,
    QuarterGradeSerializer,
    SubjectSerializer,
)


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
            ScheduleLesson.objects.filter(school_class=student.school_class)
            .select_related("subject")
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
            Grade.objects.filter(student=student)
            .select_related(
                "subject",
                "teacher__user",
            )
            .order_by("-date")
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
                date__range=(
                    quarter.starts_at,
                    quarter.ends_at,
                )
            )

        if date_from:
            grades = grades.filter(date__gte=date_from)

        if date_to:
            grades = grades.filter(date__lte=date_to)

        serializer = GradeSerializer(grades, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GradeAverageView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        student = request.user.student_profile

        grades = Grade.objects.filter(student=student)

        today = timezone.localdate()

        current_quarter = Quarter.objects.filter(
            starts_at__lte=today,
            ends_at__gte=today,
            school=student.school_class.school,
        ).first()

        grades = grades.filter(
            date__range=(
                current_quarter.starts_at,
                current_quarter.ends_at,
            )
        )

        group_by = request.query_params.get("group_by")

        if group_by == "subjects":
            averages = (
                grades.values("subject__name")
                .annotate(average=Avg("grade"))
                .order_by("subject__name")
            )

            result = [
                {
                    "subject": item["subject__name"],
                    "average": item["average"],
                }
                for item in averages
            ]

            return Response(result, status=status.HTTP_200_OK)

        average = round(grades.aggregate(average=Avg("grade"))["average"] or 0, 2)

        return Response({"average": average}, status=status.HTTP_200_OK)


class QuartersView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        student = request.user.student_profile
        quarters = Quarter.objects.filter(school=student.school_class.school).order_by(
            "number"
        )

        serializer = QuarterSerializer(quarters, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class QuarterGradesView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        student = request.user.student_profile
        quarters = Quarter.objects.filter(school=student.school_class.school).order_by(
            "number"
        )
        subjects = student.school_class.subjects.order_by("name")

        quarter_grades_data = []

        for quarter in quarters:
            quarter_id = quarter.id
            quarter_grades = QuarterGradeSerializer(
                (
                    QuarterGrade.objects.filter(student=student, quarter=quarter_id)
                    .select_related("subject")
                    .order_by("quarter__number")
                ),
                many=True,
            ).data

            grades = [float(grade["grade"]) for grade in quarter_grades]
            average_grade = round(sum(grades) / len(grades), 2) if grades else None

            for subject in subjects:
                exists = any(
                    grade.get("subject") == subject.name for grade in quarter_grades
                )
                if not exists:
                    subject_grades = Grade.objects.filter(
                        student=student, subject=subject.id
                    )
                    
                    subjects_grades_list = [float(grade.grade) for grade in subject_grades]

                    average_subject_grade = (
                        round(sum(subjects_grades_list) / len(subjects_grades_list), 1)
                        if subject_grades
                        else None
                    )

                    if len(subject_grades) > 0:
                        quarter_grades.append(
                            {
                                "id": subject.id,
                                "subject": subject.name,
                                "isApproximately": True,
                                "grade": average_subject_grade,
                            }
                        )
                    else:
                        quarter_grades.append(
                            {"id": subject.id, "subject": subject.name, "grade": 0}
                        )
                else:
                    quarter_grade = list(
                        filter(
                            lambda grade: grade.get("subject") == subject.name,
                            quarter_grades,
                        )
                    )[0]
                    quarter_grade["id"] = subject.id

            quarter_grades.sort(key=lambda grade: grade["id"])

            quarter_grades_data.append(
                {
                    "quarter_id": quarter_id,
                    "average_grade": str(average_grade),
                    "quarter_grades": quarter_grades,
                }
            )

        return Response(quarter_grades_data, status=status.HTTP_200_OK)


class SubjectView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        student = request.user.student_profile
        subjects = student.school_class.subjects.order_by("name")

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
        
        today = timezone.localdate()

        quarter = Quarter.objects.filter(
            starts_at__lte=today,
            ends_at__gte=today,
            school=student.school_class.school,
        ).first()

        student_grades = Grade.objects.filter(
            student=student,
            date__range=(quarter.starts_at, quarter.ends_at),
        ).select_related("subject")

        # 1. Best and worst grade

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

        # 2. Average grade for every month

        monthly_grades = (
            student_grades
            .values("date__year", "date__month")
            .annotate(average_grade=Avg("grade"))
            .order_by("date__year", "date__month")
        )

        monthly_average = [
            {
                "month": self.MONTHS[item["date__month"]],
                "average_grade": round(float(item["average_grade"]), 2),
            } for item in monthly_grades
        ]

        # 3. Grade distribution

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

        # 4. Subjects and average grade for each subject

        subject_averages = list(
            student_grades
            .values("subject_id", "subject__name")
            .annotate(average_grade=Avg("grade"))
            .order_by("-average_grade")
        )

        subject_count = len(subject_averages)

        # 5. Best / worst subjects

        best_subjects = None
        worst_subjects = None

        limit = 1

        if subject_count >= 12:
            limit = 6
        elif subject_count >= 10:
            limit = 5

        if limit:
            best_subjects = [
                {
                    "subject": item["subject__name"],
                    "average_grade": round(float(item["average_grade"]), 2),
                } for item in subject_averages[:limit]
            ]

            worst_subjects_queryset = reversed(subject_averages[-limit:])

            worst_subjects = [
                {
                    "subject": item["subject__name"],
                    "average_grade": round(float(item["average_grade"]), 2),
                } for item in worst_subjects_queryset
            ]

        # 6. Previous quarter average for best/worst subject

        previous_quarter = (
            Quarter.objects.filter(
                school=quarter.school,
                number=quarter.number - 1,
            ).first()
        )

        subjects_for_comparison = set()

        if best_subjects:
            subjects_for_comparison.add(
                best_subjects[0]["subject"]
            )

        if worst_subjects:
            subjects_for_comparison.add(
                worst_subjects[0]["subject"]
            )

        previous_subject_averages = {}

        if previous_quarter and subjects_for_comparison:
            previous_subject_averages_queryset = (
                Grade.objects
                .filter(
                    student=student,
                    quarter=previous_quarter,
                    subject__name__in=subjects_for_comparison,
                )
                .values("subject__name")
                .annotate(average_grade=Avg("grade"))
            )

            previous_subject_averages = {
                item["subject__name"]: round(float(item["average_grade"]), 2) for item in previous_subject_averages_queryset
            }

        if best_subjects:
            best_subjects[0]["last_average_grade"] = (
                previous_subject_averages.get(
                    best_subjects[0]["subject"]
                )
            )

        if worst_subjects:
            worst_subjects[0]["last_average_grade"] = (
                previous_subject_averages.get(
                    worst_subjects[0]["subject"]
                )
            )

        # 7. Workload by subjects

        subject_workload = [
            {
                "subject": item["subject__name"],
                "grades_count": item["grades_count"],
            }
            for item in (
                student_grades
                .values("subject__name")
                .annotate(grades_count=Count("id"))
                .order_by("-grades_count")
            )
        ]

        # 8. Comparison with class and previous quarter

        subjects_for_comparison_ids = [
            item["subject_id"]
            for item in subject_averages
        ]

        # Student's current average by subject
        student_subject_averages = {
            item["subject_id"]: float(item["average_grade"])
            for item in subject_averages
        }

        # Class average by subject
        class_subject_averages = (
            Grade.objects
            .filter(
                student__school_class=student.school_class,
                subject_id__in=subjects_for_comparison_ids,
                date__range=(
                    quarter.starts_at,
                    quarter.ends_at,
                ),
            )
            .values("subject_id")
            .annotate(average_grade=Avg("grade"))
        )

        class_subject_averages = {
            item["subject_id"]: round(float(item["average_grade"]), 2) for item in class_subject_averages
        }

        # Previous quarter averages by subject
        last_subject_averages = {}

        if previous_quarter:
            previous_grades = (
                QuarterGrade.objects
                .filter(
                    student=student,
                    quarter=previous_quarter,
                    subject_id__in=subjects_for_comparison_ids,
                )
                .values("subject_id")
                .annotate(
                    average_grade=Avg("grade"),
                )
            )

            last_subject_averages = {
                item["subject_id"]: round(float(item["average_grade"]), 2) for item in previous_grades
            }

        comparison = []

        for item in subject_averages:
            subject_id = item["subject_id"]

            comparison.append(
                {
                    "subject": item["subject__name"],
                    "users_grade": round(
                        student_subject_averages[subject_id],
                        2,
                    ),
                    "class_grade": class_subject_averages.get(
                        subject_id
                    ),
                    "last_grade": last_subject_averages.get(
                        subject_id
                    ),
                }
            )

        # 9. Absences

        absence_count = LessonAttendance.objects.filter(
            student=student,
            date__range=(quarter.starts_at, quarter.ends_at),
            is_absent=True,
        ).count()

        # 10. Response

        return Response(
            {
                "absence_count": absence_count,
                "best_grade": best_grade_data,
                "worst_grade": worst_grade_data,
                "monthly_average": monthly_average,
                "grade_distribution": grade_distribution,
                "best_subjects": best_subjects,
                "worst_subjects": worst_subjects,
                "subject_workload": subject_workload,
                "comparison": comparison,
            },
            status=status.HTTP_200_OK,
        )
