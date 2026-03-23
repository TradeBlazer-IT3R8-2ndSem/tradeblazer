from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from .models import User
from .serializers import UserSerializer

# -----------------------
# User registration
# -----------------------
@api_view(['POST'])
def register_user(request):
    data = request.data

    required_fields = ['username', 'email', 'password', 'student_id', 'phone_number', 'address', 'department']
    if not all(field in data for field in required_fields):
        return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=data['email']).exists():
        return Response({"error": "Email already registered"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(
        username=data['username'],
        email=data['email'],
        password=data['password'],
        student_id=data['student_id'],
        phone_number=data['phone_number'],
        address=data['address'],
        department=data['department']
    )

    serializer = UserSerializer(user)
    user_data = serializer.data
    user_data['role'] = 'admin' if user.is_staff else 'user'

    return Response({"user": user_data}, status=status.HTTP_201_CREATED)

# -----------------------
# User login
# -----------------------
@api_view(['POST'])
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({"error": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(request, username=email, password=password)

    if user:
        serializer = UserSerializer(user)
        user_data = serializer.data
        user_data['role'] = 'admin' if user.is_staff else 'user'
        return Response({"user": user_data}, status=status.HTTP_200_OK)

    return Response({"error": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)

# -----------------------
# Optional: ViewSet for users (list, retrieve, etc.)
# -----------------------
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]