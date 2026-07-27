from rest_framework import serializers
from ..models import User, UserActivation


class UserActivationSerializer(serializers.Serializer):
    code = serializers.CharField(max_length=20)
