from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings


class UserRole(models.TextChoices):
    STUDENT = "student", "Student"
    TEACHER = "teacher", "Teacher"
    PARENT = "parent", "Parent"
    ADMIN = "admin", "Administrator"


class User(AbstractUser):
    # id, is_active, fisrt_name, last_name, date_joined from AbstractUser
    email = models.EmailField(
        unique=True,
        verbose_name="Email"
    )

    pending_email = models.EmailField(
        blank=True,
        null=True,
    )

    is_email_verified = models.BooleanField(default=False)

    role = models.CharField(
        max_length=20,
        choices=UserRole.choices,
        default=UserRole.STUDENT,
    )

    phone_number = models.CharField(
        max_length=20,
        blank=True,
        null=True,
    )

    avatar = models.ImageField(
        upload_to="avatars/",
        blank=True,
        null=True,
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class UserActivation(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="activation",
    )

    code = models.CharField(
        max_length=15,
        unique=True
    )

    activation_token = models.UUIDField(
        unique=True,
        null=True,
        blank=True,
    )

    activated_at = models.DateTimeField(null=True, blank=True)
    expires_at = models.DateTimeField()

    is_used = models.BooleanField(
        default=False
    )

    def __str__(self):
        return f"{self.user.last_name}: {self.code}"


class Student(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="student_profile",
    )

    school_class = models.ForeignKey(
        "smart_school.SchoolClass",
        on_delete=models.CASCADE,
        related_name="students",
        null=True, # ! временно (сделано для облегчение миграций)
        blank=True,
    )

    parent = models.ForeignKey(
        "users.Parent",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="children",
    )

    def __str__(self):
        return self.user.get_full_name()


class Parent(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="parent_profile",
    )

    def __str__(self):
        return self.user.get_full_name()


class Teacher(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="teacher_profile",
    )

    school = models.ForeignKey(
        "smart_school.School",
        on_delete=models.CASCADE,
        related_name="teachers",
        null=True, # ! временно (сделано для облегчение миграций)
        blank=True,
    )

    subjects = models.ManyToManyField(
        "smart_school.Subject",
        related_name="teachers",
        null=True, # ! временно (сделано для облегчение миграций)
        blank=True,
    )

    def __str__(self):
        return self.user.get_full_name()
