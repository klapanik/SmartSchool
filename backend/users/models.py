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
