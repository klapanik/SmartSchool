from rest_framework import serializers
from django.contrib.auth import get_user_model
from ..models import EmailVerification, User


class UserActivationSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)
    code = serializers.CharField(max_length=15, required=True)

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'is_email_verified', 'date_joined']
        read_only_fields = ['is_email_verified', 'date_joined']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['email', 'password', 'password_confirm']

    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({"password_confirm": "Passwords don't match"})
        return data

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


class ResendVerificationSerializer(serializers.Serializer):
    email = serializers.EmailField()


class ChangeEmailSerializer(serializers.Serializer):
    new_email = serializers.EmailField()
    
    def validate_new_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Этот email уже используется")
        return value

class ChangePhoneSerializer(serializers.Serializer):
    new_phone = serializers.CharField(max_length=15)
    
    def validate_new_phone(self, value):
        if User.objects.filter(phone_number=value).exists():
            raise serializers.ValidationError("Этот номер уже используется")
        return value

class ChangeContactSerializer(serializers.Serializer):
    new_email = serializers.EmailField(required=False)
    new_phone = serializers.CharField(max_length=15, required=False)

    def validate(self, data):
        if not data:
            raise serializers.ValidationError(
                "Укажите новый email или номер телефона"
            )

        errors = {}
        if 'new_email' in data:
            email_serializer = ChangeEmailSerializer(data={'new_email': data['new_email']})
            if not email_serializer.is_valid():
                errors['new_email'] = email_serializer.errors['new_email']

        if 'new_phone' in data:
            phone_serializer = ChangePhoneSerializer(data={'new_phone': data['new_phone']})
            if not phone_serializer.is_valid():
                errors['new_phone'] = phone_serializer.errors['new_phone']

        if errors:
            raise serializers.ValidationError(errors)

        return data

class VerifyEmailSerializer(serializers.Serializer):
    email = serializers.EmailField()
    code = serializers.CharField(max_length=6)


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
