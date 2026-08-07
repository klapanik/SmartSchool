from django.contrib import admin
from .models import *

admin.site.register(User)
admin.site.register(UserActivation)

admin.site.register(Student)
admin.site.register(Parent)
admin.site.register(Teacher)

class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'is_email_verified', 'is_staff', 'date_joined']
    list_filter = ['is_email_verified', 'is_staff', 'is_active']
    search_fields = ['username', 'email']

@admin.register(EmailVerification)
class EmailVerificationAdmin(admin.ModelAdmin):
    list_display = ['user', 'code', 'created_at', 'is_used']
    list_filter = ['is_used']
    search_fields = ['user__email', 'code']
