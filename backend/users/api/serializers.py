from rest_framework.serializers import ModelSerializer
from ..models import User, UserActivation


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'password', 'last_login', 'first_name', 'last_name', 'is_active', 'date_joined',
                  'email', 'pending_email', 'is_email_verified', 'role', 'phone_number', 'avatar']


class ActivationSerializer(ModelSerializer):
    class Meta:
        model = UserActivation
        fields = ['code', 'activation_token',
                  'activated_at', 'expires_at', 'is_used', 'user']
