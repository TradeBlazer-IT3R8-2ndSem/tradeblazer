from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, CategoryViewSet, BestSellingPostsView

router = DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'categories', CategoryViewSet)

urlpatterns = [
    path("posts/best-selling/", BestSellingPostsView.as_view(), name="best-selling-posts"),
]

urlpatterns += router.urls