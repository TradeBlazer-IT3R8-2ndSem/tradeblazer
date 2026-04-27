from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser

from .models import User
from .serializers import UserSerializer, CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

# 🔥 USER VIEWSET (supports image upload)
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = (JSONParser, MultiPartParser, FormParser)


# -----------------------
# Register user
# -----------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    data = request.data

    required_fields = [
        'username', 'email', 'password', 'student_id',
        'phone_number', 'address', 'department'
    ]
    for field in required_fields:
        if field not in data:
            return Response({"error": f"{field} is required"}, status=400)

    if User.objects.filter(email=data['email']).exists():
        return Response({"error": "Email already registered"}, status=400)

    user = User(
        username=data['username'],
        email=data['email'],
        student_id=data['student_id'],
        phone_number=data['phone_number'],
        address=data['address'],
        department=data['department']
    )
    user.set_password(data['password'])
    user.save()

    serializer = UserSerializer(user)
    user_data = serializer.data
    user_data['role'] = 'admin' if user.is_staff else 'user'

    return Response({"user": user_data}, status=201)


# -----------------------
# Login user (manual endpoint)
# -----------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    data = request.data
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return Response(
            {"error": "Email and password are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # ✅ Use username=email because USERNAME_FIELD = "email"
    user = authenticate(request, username=email, password=password)
    if user is None:
        return Response(
            {"error": "Invalid email or password"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # ✅ Generate JWT tokens
    refresh = RefreshToken.for_user(user)
    access = str(refresh.access_token)

    serializer = UserSerializer(user)
    user_data = serializer.data
    user_data['role'] = 'admin' if user.is_staff else 'user'

    return Response({
        "user": user_data,
        "access": access,
        "refresh": str(refresh)
        }, status=status.HTTP_200_OK)

# -----------------------
# Custom JWT Login (email-based)
# -----------------------
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
