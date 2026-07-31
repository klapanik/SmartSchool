from rest_framework import serializers

class UserActivationSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)
    code = serializers.CharField(max_length=15, required=True)
