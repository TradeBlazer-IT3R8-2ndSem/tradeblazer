from rest_framework import serializers
from .models import Post, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "created_at"]


class PostSerializer(serializers.ModelSerializer):
    seller = serializers.StringRelatedField(read_only=True)

    # ✅ IMPORTANT: accept category ID
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all()
    )

    class Meta:
        model = Post
        fields = [
            "id", "title", "description", "price", "image",
            "seller", "category", "stock", "is_active",
            "created_at", "updated_at"
        ]
        read_only_fields = ["id", "seller", "created_at", "updated_at"]

    # ✅ FIX PRICE (accept string → convert to decimal)
    def validate_price(self, value):
        try:
            return float(value)
        except:
            raise serializers.ValidationError("Invalid price format")

    # ✅ FIX OUTPUT IMAGE URL
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        request = self.context.get("request")

        if instance.image and request:
            representation["image"] = request.build_absolute_uri(instance.image.url)

        return representation