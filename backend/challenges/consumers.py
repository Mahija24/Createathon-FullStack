import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from .models import Challenge, Submission

User = get_user_model()

class ChallengeConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.challenge_id = self.scope['url_route']['kwargs']['challenge_id']
        self.challenge_group_name = f'challenge_{self.challenge_id}'
        
        # Join challenge group
        await self.channel_layer.group_add(
            self.challenge_group_name,
            self.channel_name
        )
        
        await self.accept()
    
    async def disconnect(self, close_code):
        # Leave challenge group
        await self.channel_layer.group_discard(
            self.challenge_group_name,
            self.channel_name
        )
    
    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message_type = text_data_json.get('type')
        
        if message_type == 'submission':
            # Handle submission
            user_id = self.scope['user'].id
            code = text_data_json.get('code')
            language = text_data_json.get('language')
            
            # Create submission in database
            submission = await self.create_submission(user_id, self.challenge_id, code, language)
            
            # Send submission to challenge group
            await self.channel_layer.group_send(
                self.challenge_group_name,
                {
                    'type': 'submission_message',
                    'submission_id': submission.id,
                    'user_id': user_id,
                    'username': self.scope['user'].username,
                    'status': submission.status
                }
            )
    
    # Receive message from challenge group
    async def submission_message(self, event):
        # Send message to WebSocket
        await self.send(text_data=json.dumps(event))
    
    @database_sync_to_async
    def create_submission(self, user_id, challenge_id, code, language):
        user = User.objects.get(id=user_id)
        challenge = Challenge.objects.get(id=challenge_id)
        
        submission = Submission.objects.create(
            user=user,
            challenge=challenge,
            code=code,
            language=language,
            status='running'
        )
        
        # In a real app, this would be handled by a task queue
        result = challenge.validate_submission(code)
        submission.status = 'completed' if result['success'] else 'failed'
        submission.result = result
        submission.save()
        
        return submission

