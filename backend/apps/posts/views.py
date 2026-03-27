from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Post, Category
from .serializers import PostSerializer, CategorySerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]  # required for images

    def get_serializer_context(self):
        return {"request": self.request}

    def perform_create(self, serializer):
        # Optionally set seller if you want logged-in users
        serializer.save()