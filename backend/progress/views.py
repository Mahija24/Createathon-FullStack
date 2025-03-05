from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Count, Sum
from django.contrib.auth import get_user_model
from .models import UserProgress, Achievement, UserAchievement
from .serializers import UserProgressSerializer, AchievementSerializer, UserAchievementSerializer

User = get_user_model()

class UserProgressViewSet(viewsets.ModelViewSet):
    serializer_class = UserProgressSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return UserProgress.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class AchievementViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserAchievementViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserAchievementSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return UserAchievement.objects.filter(user=self.request.user)

class LeaderboardViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    
    def list(self, request):
        # Get top users by points
        top_users = User.objects.annotate(
            challenges_completed=Count('userprogress', filter=models.Q(userprogress__status='completed'))
        ).order_by('-points')[:50]
        
        leaderboard_data = []
        for rank, user in enumerate(top_users, 1):
            user_data = {
                'id': user.id,
                'rank': rank,
                'username': user.username,
                'name': f"{user.first_name} {user.last_name}",
                'avatar': user.avatar.url if user.avatar else None,
                'title': user.title,
                'points': user.points,
                'challenges': user.challenges_completed,
                'streak': user.streak,
                'isCurrentUser': user.id == request.user.id
            }
            leaderboard_data.append(user_data)
        
        return Response(leaderboard_data)

