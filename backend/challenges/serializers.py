from rest_framework import serializers
from .models import Category, Challenge, Submission

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ChallengeSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    
    class Meta:
        model = Challenge
        fields = ('id', 'title', 'description', 'difficulty', 'points', 
                  'category', 'category_name', 'created_at', 'instructions', 'starter_code')
        read_only_fields = ('id', 'created_at')

class SubmissionSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    challenge_title = serializers.ReadOnlyField(source='challenge.title')
    
    class Meta:
        model = Submission
        fields = ('id', 'user', 'username', 'challenge', 'challenge_title', 
                  'code', 'language', 'status', 'result', 'created_at')
        read_only_fields = ('id', 'user', 'status', 'result', 'created_at')
    
    def create(self, validated_data):
        # Set the user from the request
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class SubmitChallengeSerializer(serializers.Serializer):
    code = serializers.CharField()
    language = serializers.CharField()

