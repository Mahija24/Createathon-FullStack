from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    email = models.EmailField(_('email address'), unique=True)
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)

    # Additional fields for user profile
    title = models.CharField(max_length=100, blank=True)
    location = models.CharField(max_length=100, blank=True)
    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    website_url = models.URLField(blank=True)

    # Fields for gamification
    points = models.IntegerField(default=0)
    streak = models.IntegerField(default=0)
    last_active = models.DateField(null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []  # Removed 'username' since email is used for authentication

    def __str__(self):
        return self.email  # Fixed from self.username to self.email
