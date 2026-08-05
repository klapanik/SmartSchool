from rest_framework import serializers
from smart_school.models import ScheduleLesson, Grade


class ScheduleLessonSerializer(serializers.ModelSerializer):
    subject = serializers.CharField(source="subject.name")
    grade = serializers.SerializerMethodField()

    class Meta:
        model = ScheduleLesson
        fields = (
            "lesson_number",
            "subject",
            "starts_at",
            "ends_at",
            "classroom",
            "grade",
        )

    def get_grade(self, obj):
        if obj.student_grades:
            return obj.student_grades[0].grade

        return None


class GradeSerializer(serializers.ModelSerializer):
    subject = serializers.CharField(source="subject.name")
    teacher = serializers.CharField(source="teacher.user.get_full_name")

    class Meta:
        model = Grade
        fields = (
            "id",
            "grade",
            "comment",
            "created_at",
            "subject",
            "teacher",
        )
