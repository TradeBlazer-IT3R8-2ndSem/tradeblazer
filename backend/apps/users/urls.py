from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, register_user, login_user

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),   # 🔥 REQUIRED
    path('register/', register_user, name='register_user'),
    path('login/', login_user),
]