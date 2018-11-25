from django.contrib.auth import get_user_model
from rest_framework import serializers
from ingredient.api.serializers import IngredientInlineUserSerializer
from recipe.api.serializers import RecipeInlineUserSerializer
from recipe.api.serializers import RecipeSerializer
from ingredient.api.serializers import IngredientSerializer
from recipe_details.models import RecipeIngredient
from rest_framework.reverse import reverse as api_reverse

User = get_user_model()


class UserDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'id',
            'username',
        ]

class UserRecipeIngredientDetailsSerializer(serializers.ModelSerializer):
    recipe = RecipeSerializer(many=True)
    ingredient = IngredientSerializer(many=True)

    class Meta:
        model = RecipeIngredient
        fields = [
            'id',
            'user',
            'recipe',
            'ingredient',
        ]

