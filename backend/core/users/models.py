from django.db import models

# Create your models here.

class Grade(models.Model):
    subject = models.CharField(max_length=100)
    date = models.DateField()
    grade = models.IntegerField()

class QuarterGrade(models.Model):
    quarter = models.CharField(max_length=20)
    grade = models.IntegerField()

class Quarter(models.Model):
    quarter = models.CharField(max_length=20)
    start_date = models.DateField()
    end_date = models.DateField()

class Schedule(models.Model):
    weekday = models.CharField(max_length=10)
    lesson = models.IntegerField()
    subject = models.CharField(max_length=100)

class Class(models.Model):
    schedule = models.JSONField(default=list, blank=True)
    subjects = models.JSONField(default=list, blank=True)

class School(models.Model):
    quarters_schedule = models.JSONField(default=list, blank=True)
    classes = models.JSONField(default=list, blank=True)

class User(models.Model):
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    form = models.CharField(max_length=10)
    letter = models.CharField(max_length=1)
    password = models.CharField(max_length=100)
    email = models.EmailField()
    grades = models.JSONField(default=list, blank=True)
    quarter_grades = models.JSONField(default=list, blank=True)

class Login_Request(models.Model):
    email = models.EmailField()
    password = models.CharField(max_length=100)

class Erorr(models.Model):
    code = models.IntegerField()
    message = models.CharField(max_length=255)