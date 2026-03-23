from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, register_user, login_user

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = router.urls
urlpatterns += [
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
]