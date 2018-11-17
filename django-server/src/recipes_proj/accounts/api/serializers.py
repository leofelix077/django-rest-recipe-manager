from django.contrib.auth import get_user_model
from rest_framework import serializers
from .utils import jwt_response_payload_handler
from rest_framework_jwt.settings import api_settings
from rest_framework.reverse import reverse as api_reverse

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

User = get_user_model()


class UserPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username'
        ]

    def get_uri(self, obj):
        request = self.context.get('request')
        return  api_reverse('api-status:detail', kwargs={'id':obj.id}, request=request)


class UserRegisterSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password',
            'token'
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def get_token(self, obj):
        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token
