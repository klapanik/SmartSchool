from django.utils import timezone

from rest_framework import serializers
from smart_school.models import ScheduleLesson, Grade, Quarter, QuarterGrade, Subject


class ScheduleLessonSerializer(serializers.ModelSerializer):
    subject = serializers.CharField(source="subject.name")

    class Meta:
        model = ScheduleLesson
        fields = (
            "lesson_number",
            "subject",
            "starts_at",
            "ends_at",
            "classroom",
        )


class GradeSerializer(serializers.ModelSerializer):
    subject = serializers.CharField(source="subject.name")
    teacher = serializers.CharField(source="teacher.user.get_full_name")

    class Meta:
        model = Grade
        fields = (
            "id",
            "grade",
            "comment",
            "date",
            "subject",
            "teacher",
        )


class QuarterSerializer(serializers.ModelSerializer):
    is_current = serializers.SerializerMethodField()

    class Meta:
        model = Quarter
        fields = (
            "id",
            "number",
            "starts_at",
            "ends_at",
            "is_current",
        )

    def get_is_current(self, obj):
        return obj.starts_at <= timezone.localdate() <= obj.ends_at


class QuarterGradeSerializer(serializers.ModelSerializer):
    subject = serializers.CharField(source="subject.name")

    class Meta:
        model = QuarterGrade
        fields = (
            "id",
            "subject",
            "grade",
        )


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = (
            "id",
            "name",
        )
