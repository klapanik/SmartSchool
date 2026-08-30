from django.utils import timezone
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import (
    TokenRefreshSerializer,
    TokenObtainPairSerializer,
)
from rest_framework_simplejwt.exceptions import TokenError

from ..models import (
    UserActivation,
    VerificationCode,
    UserActivation,
    User,
)

from .serializers import *
from ..utils import create_verification_code


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
            return Response(
                {"success": False, "message": "Неверный код активации."},
                status=status.HTTP_404_NOT_FOUND,
            )

        if activation.is_used:
            return Response(
                {"success": False, "message": "Код активации уже был использован."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if activation.expires_at < timezone.now():
            return Response(
                {"success": False, "message": "Код активации больше не действителен."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        activation.activated_at = timezone.now()
        activation.is_used = True

        user = activation.user
        user.email = email
        user.set_password(password)
        user.is_active = True
        user.date_joined = timezone.now()

        user.save(update_fields=["email", "password", "is_active", "date_joined"])
        activation.save()

        refresh = RefreshToken.for_user(user)

        response = Response(
            {
                "success": True,
                "message": "Пользователь успешно активирован!",
                "access": str(refresh.access_token),
            },
            status=status.HTTP_200_OK,
        )

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

        response.data["success"] = True
        response.data["message"] = "Вход в аккаунт завершён успешно!"

        return response


class UserLogoutAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh = request.COOKIES.get("refresh")

        if refresh is None:
            return Response(
                {"success": False, "message": "Пользователь не авторизован."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        try:
            token = RefreshToken(refresh)
            token.blacklist()
        except TokenError:
            return Response(
                {"success": False, "message": "Пользователь не авторизован."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        response = Response(
            {"success": True, "message": "Вы успешно вышли из аккаунта!"},
            status=status.HTTP_204_NO_CONTENT,
        )

        response.delete_cookie("refresh")
        return response


class UserRefreshView(APIView):
    def post(self, request):
        refresh = request.COOKIES.get("refresh")

        if refresh is None:
            return Response({"success": False}, status=status.HTTP_401_UNAUTHORIZED)

        serializer = TokenRefreshSerializer(data={"refresh": refresh})
        serializer.is_valid(raise_exception=True)

        return Response(
            {**serializer.validated_data, "success": True}, status=status.HTTP_200_OK
        )


class ChangeEmailView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        serializer = ChangeEmailSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = request.user
        new_email = serializer.validated_data["new_email"]

        if user.email == new_email:
            return Response(
                {"success": False, "message": "Новый email совпадает с текущим"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.pending_email = new_email
        user.save(update_fields=["pending_email"])

        try:
            create_verification_code(user, "email", new_email)
        except Exception as error:
            user.pending_email = None
            user.save(update_fields=["pending_email"])

            return Response(
                {"success": False, "message": f"Ошибка отправки кода: {str(error)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response(
            {
                "success": True,
                "message": "Коды подтверждения отправлены",
                "new_email": new_email,
            },
            status=status.HTTP_200_OK,
        )


class ChangePhoneView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        serializer = ChangePhoneSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = request.user
        new_phone = serializer.validated_data["new_phone"]

        if user.phone_number == new_phone:
            return Response(
                {"success": False, "message": "Новый номер совпадает с текущим"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.pending_phone = new_phone
        user.save(update_fields=["pending_phone"])

        try:
            create_verification_code(user, "phone", new_phone)
        except Exception as error:
            user.pending_phone = None
            user.save(update_fields=["pending_phone"])

            return Response(
                {"success": False, "message": f"Ошибка отправки кода: {str(error)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response(
            {
                "success": True,
                "message": "Коды подтверждения отправлены",
                "new_phone": new_phone,
            },
            status=status.HTTP_200_OK,
        )


class VerifyChangesView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = VerifyChangeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = request.user
        code = serializer.validated_data["code"]

        try:
            verification = VerificationCode.objects.get(
                user=user, code=code, is_used=False
            )
        except VerificationCode.DoesNotExist:
            return Response(
                {"success": False, "message": "Неверный или уже использованный код"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not verification.is_valid():
            return Response(
                {"success": False, "message": "Код истек. Запросите новый"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if verification.type == "email":
            if user.pending_email:
                user.email = user.pending_email
                user.is_email_verified = True
                user.pending_email = None
        elif verification.type == "phone":
            if user.pending_phone:
                user.phone_number = user.pending_phone
                user.is_phone_verified = True
                user.pending_phone = None
        else:
            return Response(
                {"success": False, "message": "Неизвестный тип кода"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        verification.is_used = True
        verification.save()
        user.save()

        return Response(
            {
                "success": True,
                "message": f"{verification.type.capitalize()} успешно обновлен",
                "new_value": (
                    user.email if verification.type == "email" else user.phone_number
                ),
            },
            status=status.HTTP_200_OK,
        )


class ResendVerificationView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        if not user.pending_email and not user.pending_phone:
            return Response(
                {"success": False, "message": "Нет ожидающих изменений"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if user.pending_email:
            create_verification_code(user, "email", user.pending_email)

            return Response(
                {"success": True, "message": "Код отправлен на новый email"},
                status=status.HTTP_200_OK,
            )

        if user.pending_phone:
            create_verification_code(user, "phone", user.pending_phone)

            return Response(
                {"success": True, "message": "Код отправлен на новый номер"},
                status=status.HTTP_200_OK,
            )


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
