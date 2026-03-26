from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(max_length=None, use_url=True, allow_null=True)
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'student_id',
            'phone_number', 'address', 'department',
            'profile_image', 'created_at', 'password'
        ]
