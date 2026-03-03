from django.contrib import admin
from .models import ChatRoom, Message

@admin.register(ChatRoom)
class ChatRoomAdmin(admin.ModelAdmin):
    list_display = ("id", "user1", "user2", "created_at")
    search_fields = ("user1__username", "user2__username")
    list_filter = ("created_at",)

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ("id", "chatroom", "sender", "content", "timestamp", "is_read")
    search_fields = ("sender__username", "content")
    list_filter = ("is_read", "timestamp")