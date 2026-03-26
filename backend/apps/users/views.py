from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser

from .models import User
from .serializers import UserSerializer

# 🔥 USER VIEWSET (NOW SUPPORTS IMAGE UPLOAD)
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


    parser_classes = (MultiPartParser, FormParser)

# -----------------------
# Register user
# -----------------------
@api_view(['POST'])
def register_user(request):
    data = request.data

    required_fields = [
        'username', 'email', 'password', 'student_id',
        'phone_number', 'address', 'department'
    ]

    for field in required_fields:
        if field not in data:
            return Response(
                {"error": f"{field} is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

    if User.objects.filter(email=data['email']).exists():
        return Response(
            {"error": "Email already registered"},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = User.objects.create(
        username=data['username'],
        email=data['email'],
        password=data['password'],  # plain text (for now)
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
# Login user
# -----------------------
@api_view(['POST'])
def login_user(request):
    data = request.data
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return Response(
            {"error": "Email and password are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        user = User.objects.get(email=email, password=password)
    except User.DoesNotExist:
        return Response(
            {"error": "Invalid email or password"},
            status=status.HTTP_400_BAD_REQUEST
        )

    serializer = UserSerializer(user)
    user_data = serializer.data
    user_data['role'] = 'admin' if user.is_staff else 'user'

    return Response({"user": user_data}, status=status.HTTP_200_OK)