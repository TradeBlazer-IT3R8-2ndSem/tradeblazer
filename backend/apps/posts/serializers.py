from rest_framework import serializers
from .models import Post, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "created_at"]

class PostSerializer(serializers.ModelSerializer):
    seller = serializers.StringRelatedField(read_only=True)
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())

    class Meta:
        model = Post
        fields = [
            "id", "title", "description", "price", "image",
            "seller", "category", "stock", "is_active",
            "created_at", "updated_at"
        ]
        read_only_fields = ["id", "seller", "created_at", "updated_at"]