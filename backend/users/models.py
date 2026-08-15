from django.contrib.auth.models import AbstractUser, UserManager as DjangoUserManager
from django.db import models
from django.conf import settings
from django.utils import timezone
from datetime import timedelta


class UserRole(models.TextChoices):
    STUDENT = "student", "Student"
    TEACHER = "teacher", "Teacher"
    PARENT = "parent", "Parent"
    ADMIN = "admin", "Administrator"


class UserManager(DjangoUserManager):
    use_in_migrations = False

    def create_user(self, email=None, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    # id, is_active, fisrt_name, last_name, date_joined, password from AbstractUser
    email = models.EmailField(
        unique=True,
        verbose_name="Email",
        blank=True,
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

    pending_phone = models.CharField(max_length=15, blank=True, null=True)

    is_phone_verified = models.BooleanField(default=False)

    avatar = models.ImageField(
        upload_to="avatars/",
        blank=True,
        null=True,
    )

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class UserActivation(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="activation",
    )

    code = models.CharField(
        max_length=15,
        unique=True
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
        null=True,  # ! временно (сделано для облегчение миграций)
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
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="parent_profile",
    )

    def __str__(self):
        return self.user.get_full_name()


class Teacher(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="teacher_profile",
    )

    school = models.ForeignKey(
        "smart_school.School",
        on_delete=models.CASCADE,
        related_name="teachers",
        null=True,  # ! временно (сделано для облегчение миграций)
        blank=True,
    )

    subjects = models.ManyToManyField(
        "smart_school.Subject",
        related_name="teachers",
        null=True,  # ! временно (сделано для облегчение миграций)
        blank=True,
    )

    def __str__(self):
        return self.user.get_full_name()


class EmailVerification(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='verifications')

    code = models.CharField(max_length=6)

    created_at = models.DateTimeField(auto_now_add=True)

    is_used = models.BooleanField(default=False)

    def is_valid(self):
        return not self.is_used and (timezone.now() - self.created_at) < timedelta(minutes=10)

    def __str__(self):
        return f"{self.user.email} - {self.code} - {'Used' if self.is_used else 'Active'}"

class VerificationCode(models.Model):
    TYPE_CHOICES = (
        ('email', 'Email'),
        ('phone', 'Phone'),
    )
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='verification_codes')
    code = models.CharField(max_length=6)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    value = models.CharField(max_length=100)  # Новый email или телефон
    created_at = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False)
    
    def is_valid(self):
        from django.utils import timezone
        from datetime import timedelta
        return not self.is_used and (timezone.now() - self.created_at) < timedelta(minutes=10)
    
    def __str__(self):
        return f"{self.user.email} - {self.type} - {self.code}"