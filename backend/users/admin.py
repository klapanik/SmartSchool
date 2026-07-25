from django.contrib import admin
from .models import User, UserActivation

# Register your models here.
admin.site.register(User)
admin.site.register(UserActivation)
