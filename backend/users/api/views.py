from django.utils import timezone
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenRefreshSerializer, TokenObtainPairSerializer
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model

from ..models import UserActivation, EmailVerification
from .serializers import UserActivationSerializer, RegisterSerializer, VerifyEmailSerializer, ResendVerificationSerializer, UserSerializer
from ..utils import send_verification_email, send_password_reset_email


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

        user.save(update_fields=["email", "password", "is_active", "date_joined"])
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

User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    """Register a new user and send verification email"""
    serializer = RegisterSerializer(data=request.data)
    
    if serializer.is_valid():
        user = serializer.save()
        
        # Send verification email
        success, result = send_verification_email(user)
        
        if success:
            return Response({
                'success': True,
                'message': 'User registered successfully! Please check your email for verification code.',
                'user': UserSerializer(user).data
            }, status=status.HTTP_201_CREATED)
        else:
            # Still created user but email failed
            return Response({
                'success': False,
                'message': 'User created but email could not be sent. Please request a new code.',
                'user': UserSerializer(user).data,
                'email_error': result
            }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def verify_email(request):
    """Verify user's email with code"""
    serializer = VerifyEmailSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    email = serializer.validated_data['email']
    code = serializer.validated_data['code']
    
    try:
        user = User.objects.get(email=email)
        verification = EmailVerification.objects.get(
            user=user,
            code=code,
            is_used=False
        )
        
        if verification.is_valid():
            # Mark as verified
            user.is_email_verified = True
            user.save()
            verification.is_used = True
            verification.save()
            
            return Response({
                'success': True,
                'message': 'Email verified successfully!'
            })
        else:
            return Response({
                'success': False,
                'message': 'Code has expired or already used. Please request a new one.'
            }, status=status.HTTP_400_BAD_REQUEST)
            
    except User.DoesNotExist:
        return Response({
            'success': False,
            'message': 'User not found.'
        }, status=status.HTTP_404_NOT_FOUND)
    except EmailVerification.DoesNotExist:
        return Response({
            'success': False,
            'message': 'Invalid verification code.'
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def resend_verification_code(request):
    """Resend verification code to user's email"""
    serializer = ResendVerificationSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    email = serializer.validated_data['email']
    
    try:
        user = User.objects.get(email=email)
        
        if user.is_email_verified:
            return Response({
                'success': False,
                'message': 'This email is already verified.'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        success, result = send_verification_email(user)
        
        if success:
            return Response({
                'success': True,
                'message': 'New verification code sent to your email!'
            })
        else:
            return Response({
                'success': False,
                'message': f'Failed to send email: {result}'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
    except User.DoesNotExist:
        return Response({
            'success': False,
            'message': 'User not found.'
        }, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    """Get current user's profile"""
    serializer = UserSerializer(request.user)
    return Response(serializer.data)
