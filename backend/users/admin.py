from django.contrib import admin
from .models import *

admin.site.register(User)
admin.site.register(UserActivation)

admin.site.register(Student)
admin.site.register(Parent)
admin.site.register(Teacher)
