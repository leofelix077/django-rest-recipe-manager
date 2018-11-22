from rest_framework import serializers
from recipe.models import Recipe
from ingredient.models import Ingredient
from recipe_details.models import RecipeIngredient
from ingredient.api.serializers import IngredientInlineUserSerializer
from recipe.api.serializers import RecipeInlineUserSerializer
from rest_framework.reverse import reverse as api_reverse


class RecipeIngredientSerializer(serializers.ModelSerializer):

    class Meta:
        model = RecipeIngredient
        fields = [
            'id',
            'user',
            'recipe',
            'ingredient',
            'ingredient_amount',
        ]





class RecipeIngredientInlineUserSerializer(RecipeIngredientSerializer):

    class Meta:
        model = RecipeIngredient
        fields = [
            'id',
            'user',
            'recipe',
            'ingredient',
            'ingredient_amount',
        ]
  
  
    