from django.contrib import admin
from .models import *

admin.site.register(School)
admin.site.register(SchoolClass)

admin.site.register(Grade)
admin.site.register(QuarterGrade)

admin.site.register(Quarter)
admin.site.register(Subject)
admin.site.register(ScheduleLesson)
