from django.contrib import admin
from .models import Report

@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ("id", "reporter", "reported_user", "reason", "created_at")
    search_fields = ("reporter__username", "reported_user__username", "reason")
    list_filter = ("created_at",)