from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserProgressViewSet, AchievementViewSet, UserAchievementViewSet, LeaderboardViewSet

router = DefaultRouter()
router.register(r'user-progress', UserProgressViewSet, basename='user-progress')
router.register(r'achievements', AchievementViewSet)
router.register(r'user-achievements', UserAchievementViewSet, basename='user-achievements')
router.register(r'leaderboard', LeaderboardViewSet, basename='leaderboard')

urlpatterns = [
    path('', include(router.urls)),
]

