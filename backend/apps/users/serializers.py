from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'student_id',
            'phone_number', 'address', 'department',
            'profile_image', 'created_at', 'password'
        ]
        read_only_fields = ['id', 'created_at']