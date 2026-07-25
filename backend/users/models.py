from django.contrib.auth.models import AbstractUser
from django.db import models


class UserRole(models.TextChoices):
    STUDENT = "student", "Student"
    TEACHER = "teacher", "Teacher"
    PARENT = "parent", "Parent"
    ADMIN = "admin", "Administrator"


class User(AbstractUser):
    # id, is_active, fisrt_name, last_name from AbstractUser
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

    created_at = models.DateTimeField(auto_now_add=True)
    activated_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class UserActivation(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    code = models.CharField(
        max_length=20,
        unique=True
    )

    activation_token = models.CharField(
        max_length=255,
        null=True
    )

    expires_at = models.DateTimeField()

    is_active = models.BooleanField(
        default=False
    )

    def __str__(self):
        return f"{self.user.last_name}: {self.code}"
