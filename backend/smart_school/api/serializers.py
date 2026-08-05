from rest_framework import serializers
from smart_school.models import ScheduleLesson


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