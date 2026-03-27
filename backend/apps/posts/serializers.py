from rest_framework import serializers
from .models import Post, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "created_at"]

class PostSerializer(serializers.ModelSerializer):
    seller = serializers.StringRelatedField(read_only=True)   # show username
    seller_id = serializers.IntegerField(source="seller.id", read_only=True)
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = Post
        fields = [
            "id", "title", "description", "price", "image",
            "seller", "seller_id", "category", "category_name",
            "stock", "sold_count", "is_active", "created_at", "updated_at"
        ]
        read_only_fields = ["id", "seller", "seller_id", "category_name", "created_at", "updated_at"]

    def validate_price(self, value):
        try:
            return float(value)
        except:
            raise serializers.ValidationError("Invalid price format")

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        request = self.context.get("request")

        if instance.image and hasattr(instance.image, "url") and request:
            try:
                representation["image"] = request.build_absolute_uri(instance.image.url)
            except Exception:
                representation["image"] = None
        return representation