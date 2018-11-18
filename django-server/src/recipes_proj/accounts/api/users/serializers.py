from django.contrib.auth import get_user_model
from rest_framework import serializers
from ingredient.api.serializers import IngredientInlineUserSerializer
from recipe.api.serializers import RecipeInlineUserSerializer
from rest_framework.reverse import reverse as api_reverse

User = get_user_model()


class UserDetailsSerializer(serializers.ModelSerializer):
    uri = serializers.SerializerMethodField(read_only=True)
    recipe = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'uri',
            'recipe'
        ]

    def get_recipe(self, obj):
        request = self.context.get('request')
        qs = obj.recipe_set.all()  # [:10]

        return {
            "recipe": RecipeInlineUserSerializer(qs, many=True).data,
        }

    def get_uri(self, obj):
        request = self.context.get('request')
        return api_reverse("api-user:detail", kwargs={'id': obj.id}, request=request)
