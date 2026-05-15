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
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.urls import reverse
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
import logging

logger = logging.getLogger(__name__)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = (JSONParser, MultiPartParser, FormParser)

    def update(self, request, *args, **kwargs):
        try:
            response = super().update(request, *args, **kwargs)
            return response
        except Exception as e:
            logger.error(f"Update error: {str(e)}")
            if hasattr(e, 'detail'):
                return Response({"error": str(e.detail)}, status=status.HTTP_400_BAD_REQUEST)
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


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
        department=data['department'],
        is_active=False
    )
    user.set_password(data['password'])
    user.save()

    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    verify_url = request.build_absolute_uri(
        reverse('verify-email', kwargs={'uidb64': uid, 'token': token})
    )
    subject = 'Verify your email'
    message = f'Click the link to verify your email: {verify_url}'
    send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [user.email])

    serializer = UserSerializer(user)
    user_data = serializer.data
    user_data['role'] = 'admin' if user.is_staff else 'user'

    return Response({"user": user_data, "detail": "Verification email sent. Please check your inbox."}, status=201)


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

    user = authenticate(request, username=email, password=password)
    if user is None:
        return Response(
            {"error": "Invalid email or password"},
            status=status.HTTP_400_BAD_REQUEST
        )

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

# -----------------------
# Email verification endpoint   
# -----------------------    

@api_view(['GET'])
@permission_classes([AllowAny])
def verify_email(request, uidb64, token):
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user and default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        return Response({'message': 'Email verified! You can now log in.'}, status=200)
    return Response({'error': 'Invalid or expired verification link.'}, status=400)
