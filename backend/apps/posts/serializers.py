from rest_framework import serializers
from decimal import Decimal, InvalidOperation
from .models import Post, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "created_at"]


class PostSerializer(serializers.ModelSerializer):
    seller = serializers.StringRelatedField(read_only=True)

    # ✅ Explicitly force integer PK field
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        pk_field=serializers.IntegerField()
    )

    class Meta:
        model = Post
        fields = [
            "id", "title", "description", "price", "image",
            "seller", "category", "stock", "is_active",
            "created_at", "updated_at"
        ]
        read_only_fields = ["id", "seller", "created_at", "updated_at"]

    def validate_price(self, value):
        try:
            return float(value)
        except:
            raise serializers.ValidationError("Invalid price format")

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        request = self.context.get("request")

        if instance.image and request:
            representation["image"] = request.build_absolute_uri(instance.image.url)

        return representation
