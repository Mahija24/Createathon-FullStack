from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Category, Challenge, Submission
from .serializers import CategorySerializer, ChallengeSerializer, SubmissionSerializer, SubmitChallengeSerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

class ChallengeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Challenge.objects.all()
    serializer_class = ChallengeSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    @action(detail=True, methods=['post'])
    def submit(self, request, pk=None):
        challenge = self.get_object()
        serializer = SubmitChallengeSerializer(data=request.data)
        
        if serializer.is_valid():
            # Create a submission
            submission_data = {
                'challenge': challenge,
                'code': serializer.validated_data['code'],
                'language': serializer.validated_data['language'],
                'status': 'running'
            }
            
            submission = Submission.objects.create(
                user=request.user,
                **submission_data
            )
            
            # Validate the submission (in a real app, this would be done asynchronously)
            result = challenge.validate_submission(serializer.validated_data['code'])
            
            # Update the submission with the result
            submission.status = 'completed' if result['success'] else 'failed'
            submission.result = result
            submission.save()
            
            # Return the submission
            return Response(SubmissionSerializer(submission).data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SubmissionViewSet(viewsets.ModelViewSet):
    serializer_class = SubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        # Users can only see their own submissions
        return Submission.objects.filter(user=self.request.user)

