from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    student_id = models.CharField(max_length=20, unique=True)  
    phone_number = models.CharField(max_length=20, blank=True)      
    address = models.TextField(blank=True)                        
    department = models.CharField(max_length=100, blank=True)       
    profile_image = models.ImageField(upload_to='profiles/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.username} ({self.student_id})"