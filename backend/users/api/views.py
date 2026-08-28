from django.utils import timezone
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import (
    TokenRefreshSerializer,
    TokenObtainPairSerializer,
)
from rest_framework_simplejwt.exceptions import TokenError

from ..models import (
    UserActivation,
    EmailVerification,
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
                {"detail": "Invalid activation code."}, status=status.HTTP_404_NOT_FOUND
            )

        if activation.is_used:
            return Response(
                {"detail": "Activation code has already been used."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if activation.expires_at < timezone.now():
            return Response(
                {"detail": "Activation code has expired."},
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
            {"access": str(refresh.access_token)}, status=status.HTTP_200_OK
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

        return response


class UserLogoutAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh = request.COOKIES.get("refresh")

        if refresh is None:
            return Response(
                {"detail": "Refresh token not found."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        try:
            token = RefreshToken(refresh)
            token.blacklist()
        except TokenError:
            return Response(
                {"detail": "Invalid refresh token."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        response = Response(status=status.HTTP_204_NO_CONTENT)
        response.delete_cookie("refresh")
        return response


class UserRefreshView(APIView):
    def post(self, request):
        refresh = request.COOKIES.get("refresh")

        if refresh is None:
            return Response(
                {"detail": "Refresh token not found."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        serializer = TokenRefreshSerializer(data={"refresh": refresh})
        serializer.is_valid(raise_exception=True)

        return Response(serializer.validated_data)


class VerifyEmailView(APIView):
    def post(self, request):
        serializer = VerifyEmailSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        email = serializer.validated_data["email"]
        code = serializer.validated_data["code"]

        try:
            user = User.objects.get(email=email)
            verification = EmailVerification.objects.get(
                user=user, code=code, is_used=False
            )

            if verification.is_valid():
                user.is_email_verified = True
                user.save()
                verification.is_used = True
                verification.save()

                return Response(
                    {"success": True, "message": "Email verified successfully!"}
                )

            return Response(
                {
                    "success": False,
                    "message": "Code has expired or already used. Please request a new one.",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        except User.DoesNotExist:
            return Response(
                {"success": False, "message": "User not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except EmailVerification.DoesNotExist:
            return Response(
                {"success": False, "message": "Invalid verification code."},
                status=status.HTTP_400_BAD_REQUEST,
            )


class ChangeContactView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ChangeContactSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = request.user
        changes = serializer.validated_data
        pending_fields = []

        if "new_email" in changes:
            if user.email == changes["new_email"]:
                return Response(
                    {"success": False, "message": "Новый email совпадает с текущим"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            user.pending_email = changes["new_email"]
            pending_fields.append("pending_email")

        if "new_phone" in changes:
            if user.phone_number == changes["new_phone"]:
                return Response(
                    {"success": False, "message": "Новый номер совпадает с текущим"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            user.pending_phone = changes["new_phone"]
            pending_fields.append("pending_phone")

        user.save(update_fields=pending_fields)

        try:
            if "new_email" in changes:
                create_verification_code(user, "email", changes["new_email"])
            if "new_phone" in changes:
                create_verification_code(user, "phone", changes["new_phone"])
        except Exception as error:
            for field in pending_fields:
                setattr(user, field, None)
            user.save(update_fields=pending_fields)
            return Response(
                {"success": False, "message": f"Ошибка отправки кода: {str(error)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        response = {
            "success": True,
            "message": "Коды подтверждения отправлены",
        }

        if "new_email" in changes:
            response["pending_email"] = changes["new_email"]
        if "new_phone" in changes:
            response["pending_phone"] = changes["new_phone"]

        return Response(response)


class VerifyChangeView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = VerifyChangeSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        code = serializer.validated_data["code"]
        user = request.user

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
            }
        )


class ResendVerificationView(APIView):
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
                {"success": True, "message": "Код отправлен на новый email"}
            )

        if user.pending_phone:
            create_verification_code(user, "phone", user.pending_phone)
            return Response(
                {"success": True, "message": "Код отправлен на новый номер"}
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
