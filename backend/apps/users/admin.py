from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("id", "username", "email", "student_id", "department", "created_at")
    search_fields = ("username", "email", "student_id")
    