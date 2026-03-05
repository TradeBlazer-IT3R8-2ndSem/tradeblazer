from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Post, Category
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import PostSerializer, CategorySerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        user = getattr(self.request, "user", None)
        if user and user.is_authenticated:
            serializer.save(seller=user)
        else:
            serializer.save()
