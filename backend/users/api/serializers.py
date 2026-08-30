from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class UserActivationSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)
    code = serializers.CharField(max_length=15, required=True)


class ChangeEmailSerializer(serializers.Serializer):
    new_email = serializers.EmailField()

    def validate_new_email(self, new_email):
        if not new_email:
            raise serializers.ValidationError("Укажите новый email")

        if User.objects.filter(email=new_email).exists():
            raise serializers.ValidationError("Этот email уже используется")

        return new_email


class ChangePhoneSerializer(serializers.Serializer):
    new_phone = serializers.CharField()

    def validate_new_phone(self, new_phone):
        if not new_phone:
            raise serializers.ValidationError("Укажите новый email или номер телефона")

        if User.objects.filter(phone_number=new_phone).exists():
            raise serializers.ValidationError("Этот номер уже используется")

        return new_phone


class VerifyChangeSerializer(serializers.Serializer):
    code = serializers.CharField(max_length=6)


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
        if not student or not student.parent:
            return None
        return student.parent.user.first_name

    def get_parent_last_name(self, obj):
        student = getattr(obj, "student_profile", None)
        if not student or not student.parent:
            return None
        return student.parent.user.last_name

    def get_class_teacher_first_name(self, obj):
        student = getattr(obj, "student_profile", None)
        if not student or student.school_class == None:
            return None

        teacher = student.school_class.class_teacher
        if teacher is None:
            return None

        return teacher.user.first_name

    def get_class_teacher_last_name(self, obj):
        student = getattr(obj, "student_profile", None)
        if not student or student.school_class == None:
            return None

        teacher = student.school_class.class_teacher
        if teacher is None:
            return None

        return teacher.user.last_name
