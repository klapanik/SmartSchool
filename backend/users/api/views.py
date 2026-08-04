from django.utils import timezone
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenRefreshSerializer, TokenObtainPairSerializer
from rest_framework_simplejwt.exceptions import TokenError

from ..models import UserActivation, User
from .serializers import UserActivationSerializer, UserProfileSerializer


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
        user.set_password(password)
        user.is_active = True
        user.date_joined = timezone.now()

        user.save(update_fields=[
            "email",
            "password",
            "is_active",
            "date_joined"
        ])
        activation.save()

        refresh = RefreshToken.for_user(user)

        response = Response({"access": str(refresh.access_token)}, status=status.HTTP_200_OK)

        response.set_cookie(
            key="refresh",
            value=str(refresh),
            httponly=True,
            secure=False,
            samesite="Lax",
            max_age=60 * 60 * 24 * 30,
        )

        return response


class UserLoginView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        refresh = response.data.pop("refresh")

        response.set_cookie(
            key="refresh",
            value=refresh,
            httponly=True,
            secure=False,
            samesite="Lax",
            max_age=60 * 60 * 24 * 30,
        )

        return response


class UserLogoutAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh = request.COOKIES.get("refresh")

        if refresh is None:
            return Response({"detail": "Refresh token not found."}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            token = RefreshToken(refresh)
            token.blacklist()
        except TokenError:
            return Response({"detail": "Invalid refresh token."}, status=status.HTTP_401_UNAUTHORIZED)

        response = Response(status=status.HTTP_204_NO_CONTENT)
        response.delete_cookie("refresh")
        return response


class UserRefreshView(APIView):
    def post(self, request):
        refresh = request.COOKIES.get("refresh")

        if refresh is None:
            return Response({"detail": "Refresh token not found."}, status=status.HTTP_401_UNAUTHORIZED)

        serializer = TokenRefreshSerializer(
            data={"refresh": refresh}
        )
        serializer.is_valid(raise_exception=True)

        return Response(serializer.validated_data)


class UserProfileView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = User.objects.select_related(
            "student_profile",
            "student_profile__parent__user",
            "student_profile__school_class",
            "student_profile__school_class__class_teacher__user",
        ).get(pk=request.user.pk)

        serializer = UserProfileSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
