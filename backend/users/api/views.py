from uuid import uuid4

from django.utils import timezone
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import TokenError

import bcrypt

from ..models import UserActivation
from .serializers import UserActivationSerializer, LogoutSerializer


class UserActivationView(APIView):
    def post(self, request):
        serializer = UserActivationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        code = serializer.validated_data["code"]
        email = serializer.validated_data["email"]
        password = serializer.validated_data["password"]

        try:
            activation = UserActivation.objects.select_related("user").get(code=code)
        except UserActivation.DoesNotExist:
            return Response({"detail": "Invalid activation code."}, status=status.HTTP_404_NOT_FOUND)

        if activation.is_used:
            return Response({"detail": "Activation code has already been used."}, status=status.HTTP_400_BAD_REQUEST)

        if activation.expires_at < timezone.now():
            return Response({"detail": "Activation code has expired."}, status=status.HTTP_400_BAD_REQUEST)

        activation.activated_at = timezone.now()
        activation.is_used = True

        user = activation.user
        user.email = email
        user.password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        user.is_active = True
        user.date_joined = timezone.now()

        user.save()
        activation.save()

        refresh = RefreshToken.for_user(user)

        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        return Response({"access": access_token, "refresh": refresh_token}, status=status.HTTP_200_OK)


class UserLogoutAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = LogoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            refresh = RefreshToken(serializer.validated_data["refresh"])
            refresh.blacklist()
        except TokenError:
            return Response({"detail": "Invalid refresh token."}, status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_204_NO_CONTENT)
