from django.db import models


class School(models.Model):
    name = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    address = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class SchoolClass(models.Model):
    school = models.ForeignKey(
        "School",
        on_delete=models.CASCADE,
        related_name="classes",
    )

    form = models.PositiveSmallIntegerField()
    letter = models.CharField(max_length=2)

    class_teacher = models.ForeignKey(
        "users.Teacher",
        on_delete=models.SET_NULL,
        null=True,
        related_name="managed_classes",
    )

    def __str__(self):
        return f"{self.form}{self.letter}"


class Quarter(models.Model):
    school = models.ForeignKey(
        "School",
        on_delete=models.CASCADE,
        related_name="quarters",
    )

    number = models.PositiveSmallIntegerField()
    starts_at = models.DateField()
    ends_at = models.DateField()

    class Meta:
        unique_together = (
            "school",
            "number",
        )


class Subject(models.Model):
    name = models.CharField(
        max_length=100,
    )

    school_classes = models.ManyToManyField(
        "SchoolClass",
        related_name="subjects",
    )

    def __str__(self):
        return self.name


class Grade(models.Model):
    student = models.ForeignKey(
        "users.Student",
        on_delete=models.CASCADE,
        related_name="grades",
    )

    subject = models.ForeignKey(
        "Subject",
        on_delete=models.CASCADE,
        related_name="grades"
    )

    schedule_lesson = models.ForeignKey(
        "ScheduleLesson",
        on_delete=models.CASCADE,
        related_name="grades"
    )

    teacher = models.ForeignKey(
        "users.Teacher",
        on_delete=models.SET_NULL,
        null=True,
    )

    grade = models.DecimalField(
        max_digits=3,
        decimal_places=1,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    comment = models.TextField(
        blank=True,
    )


class QuarterGrade(models.Model):
    student = models.ForeignKey(
        "users.Student",
        on_delete=models.CASCADE,
        related_name="quarter_grades",
    )

    subject = models.ForeignKey(
        "Subject",
        on_delete=models.CASCADE,
        related_name="quarter_grades"
    )

    quarter = models.ForeignKey(
        "Quarter",
        on_delete=models.CASCADE,
        related_name="grades",
    )

    grade = models.DecimalField(
        max_digits=3,
        decimal_places=1,
    )


class ScheduleLesson(models.Model):
    school_class = models.ForeignKey(
        "SchoolClass",
        on_delete=models.CASCADE,
        related_name="lessons"
    )

    subject = models.ForeignKey(
        "Subject",
        on_delete=models.CASCADE,
    )

    weekday = models.PositiveSmallIntegerField()
    lesson_number = models.PositiveSmallIntegerField()
    starts_at = models.TimeField()
    ends_at = models.TimeField()

    classroom = models.CharField(
        max_length=20,
    )


class LessonAttendance(models.Model):
    lesson = models.ForeignKey(
        "ScheduleLesson",
        on_delete=models.CASCADE,
        related_name="attendance",
    )

    student = models.ForeignKey(
        "users.Student",
        on_delete=models.CASCADE,
        related_name="attendance",
    )

    date = models.DateField()
    is_absent = models.BooleanField(default=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=("lesson", "student", "date"),
                name="unique_student_lesson_attendance",
            ),
        ]
