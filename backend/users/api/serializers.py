from rest_framework import serializers
from ..models import User

class UserActivationSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)
    code = serializers.CharField(max_length=15, required=True)


class UserProfileSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()

    form = serializers.IntegerField(
        source="student_profile.school_class.form",
        read_only=True,
    )

    letter = serializers.CharField(
        source="student_profile.school_class.letter",
        read_only=True,
    )

    parent_first_name = serializers.SerializerMethodField()
    parent_last_name = serializers.SerializerMethodField()

    class_teacher_first_name = serializers.SerializerMethodField()
    class_teacher_last_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            "first_name",
            "last_name",
            "email",
            "phone_number",
            "avatar",

            "form",
            "letter",

            "parent_first_name",
            "parent_last_name",

            "class_teacher_first_name",
            "class_teacher_last_name",
        )

    def get_avatar(self, obj):
        return obj.avatar.url if obj.avatar else None

    def get_parent_first_name(self, obj):
        student = getattr(obj, "student_profile", None)
        if not student or not student.parent: return None
        return student.parent.user.first_name

    def get_parent_last_name(self, obj):
        student = getattr(obj, "student_profile", None)
        if not student or not student.parent: return None
        return student.parent.user.last_name

    def get_class_teacher_first_name(self, obj):
        student = getattr(obj, "student_profile", None)
        if not student or student.school_class == None: return None

        teacher = student.school_class.class_teacher
        if teacher is None: return None

        return teacher.user.first_name

    def get_class_teacher_last_name(self, obj):
        student = getattr(obj, "student_profile", None)
        if not student or student.school_class == None: return None

        teacher = student.school_class.class_teacher
        if teacher is None: return None

        return teacher.user.last_name