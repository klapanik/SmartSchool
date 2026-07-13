from rest_framework import serializers

from .models import Grade, Quarter_grade, Quarter, Schedule, Class, School, User, Login_request, Erorr


class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = "__all__"


class QuarterGradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quarter_grade
        fields = "__all__"


class QuarterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quarter
        fields = "__all__"


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = "__all__"


class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = "__all__"


class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class LoginRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Login_request
        fields = "__all__"


class ErorrSerializer(serializers.ModelSerializer):
    class Meta:
        model = Erorr
        fields = "__all__"

