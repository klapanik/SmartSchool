from uuid import uuid4

from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from ..models import UserActivation
from .serializers import UserActivationSerializer


class UserActivationViewSet(GenericViewSet):
    queryset = UserActivation.objects.all()
    serializer_class = UserActivationSerializer

    @action(detail=False, methods=["post"], url_path="activate")
    def activate(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        code = serializer.validated_data["code"]

        try:
            activation = self.get_queryset().get(code=code)
        except UserActivation.DoesNotExist:
            return Response({"detail": "Invalid activation code."}, status=status.HTTP_404_NOT_FOUND,)

        if activation.is_used:
            return Response({"detail": "Activation code has already been used."}, status=status.HTTP_400_BAD_REQUEST)

        if activation.expires_at < timezone.now():
            return Response({"detail": "Activation code has expired."}, status=status.HTTP_400_BAD_REQUEST)

        activation.activation_token = uuid4()
        activation.save(update_fields=["activation_token"])

        return Response({"activationToken": activation.activation_token}, status=status.HTTP_200_OK,)
