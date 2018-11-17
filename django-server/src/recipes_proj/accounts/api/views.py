from rest_framework import permissions, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate, get_user_model
from django.db.models import Q
from .serializers import UserRegisterSerializer
from .utils import jwt_response_payload_handler
from .permissions import AnonymousPermissionOnly
from rest_framework_jwt.settings import api_settings

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

User = get_user_model()


class AuthAPIView(APIView):
    authentication_classes = []
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):

        if request.user.is_authenticated():
            return Response({"detail": "You are already authenticated"}, status=400)
        data = request.data

        username = data.get('username')
        password = data.get('password')
        user = authenticate(username=username, password=password)

        qs = User.objects.filter(
            Q(username__iexact=username) |
            Q(email__iexact=username)
        ).distinct()

        if qs.count() == 1:
            user_obj = qs.first()

            if user_obj.check_password(password):
                user = user_obj
                payload = jwt_payload_handler(user)
                token = jwt_encode_handler(payload)
                response = jwt_response_payload_handler(token, user, request=request)
                return Response(response)

        return Response({"detail": "Invalid Credentials"}, status=401)

class RegisterAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [AnonymousPermissionOnly]

