from django.contrib.auth import get_user_model
from rest_framework import serializers
from ingredient.api.serializers import IngredientInlineUserSerializer
from rest_framework.reverse import reverse as api_reverse

User = get_user_model()


class UserDetailsSerializer(serializers.ModelSerializer):
    uri = serializers.SerializerMethodField(read_only=True)
    ingredient = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'uri',
            'ingredient',
        ]

    def get_ingredient(self, obj):
        request = self.context.get('request')
        qs = obj.ingredient_set.all().order_by('-created_on')  # [:10]
        return {
            'uri': self.get_uri(obj) + 'ingredients/',
            'last': IngredientInlineUserSerializer(qs.first(), context={'request':request}).data,
            'recent': IngredientInlineUserSerializer(qs[:10], many=True).data
        }

    def get_uri(self, obj):
        request = self.context.get('request')
        return api_reverse("api-user:detail", kwargs={'id': obj.id}, request=request)
