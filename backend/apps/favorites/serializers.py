from rest_framework import serializers
from .models import Favorite
from apps.posts.models import Post
from apps.posts.serializers import PostSerializer

class FavoriteSerializer(serializers.ModelSerializer):
    post = serializers.PrimaryKeyRelatedField(queryset=Post.objects.all())
    post_detail = PostSerializer(source="post", read_only=True)

    class Meta:
        model = Favorite
        fields = ["id", "user", "post", "post_detail", "created_at"]
        read_only_fields = ["user", "created_at"]
