from rest_framework import serializers
from .models import UserProgress, Achievement, UserAchievement
from challenges.serializers import ChallengeSerializer

class UserProgressSerializer(serializers.ModelSerializer):
    challenge_details = ChallengeSerializer(source='challenge', read_only=True)
    
    class Meta:
        model = UserProgress
        fields = ('id', 'user', 'challenge', 'challenge_details', 'status', 'attempts', 'completed_at')
        read_only_fields = ('id', 'user', 'completed_at')

class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = '__all__'

class UserAchievementSerializer(serializers.ModelSerializer):
    achievement_details = AchievementSerializer(source='achievement', read_only=True)
    
    class Meta:
        model = UserAchievement
        fields = ('id', 'user', 'achievement', 'achievement_details', 'unlocked_at')
        read_only_fields = ('id', 'user', 'unlocked_at')

