from rest_framework import serializers


class UserActivationSerializer(serializers.Serializer):
    code = serializers.CharField(max_length=15, required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField(required=True)
