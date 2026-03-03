from django.contrib import admin
from .models import Post, Category

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "seller", "category", "price", "is_active", "created_at")
    search_fields = ("title", "seller__username")
    list_filter = ("is_active", "category")

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "created_at")
