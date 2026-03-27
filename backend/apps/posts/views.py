from rest_framework import viewsets, generics
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Post, Category, User
from .serializers import PostSerializer, CategorySerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def get_serializer_context(self):
        return {"request": self.request}

    def perform_create(self, serializer):
        """
        Auto‑assign seller:
        - If request.user is authenticated, use that.
        - If not, assign a default user (e.g. 'guest').
        """
        if self.request.user.is_authenticated:
            serializer.save(seller=self.request.user)
        else:
            guest_user = User.objects.get(username="guest")
            serializer.save(seller=guest_user)

class BestSellingPostsView(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.filter(is_active=True).order_by("-created_at")[:5]