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
    # uri = serializers.SerializerMethodField(read_only=True)
    # recipe = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            'id',
            'username',
        ]

    # def get_recipe(self, obj):
    #     request = self.context.get('request')
    #     qs = obj.recipe_set.all()  # [:10]
    #     return {
    #         "recipe": RecipeInlineUserSerializer(qs, many=True).data,
    #     }
  
  
    # def get_ingredient(self, obj):
    #     request = self.context.get('request')
    #     qs = obj.ingredient_set.all()  # [:10]
    #     return {
    #         "ingredient": IngredientInlineUserSerializer(qs, many=True).data,
    #     }
  

    def get_uri(self, obj):
        request = self.context.get('request')
        return api_reverse("api-user:detail", kwargs={'id': obj.id}, request=request)

class UserRecipeIngredientDetailsSerializer(serializers.ModelSerializer):
    recipe = RecipeSerializer(many=True)
    ingredient = IngredientSerializer(many=True)
    # recipe = serializers.SerializerMethodField(read_only=True)
    # ingredient = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = RecipeIngredient
        fields = [
            'id',
            'user',
            'recipe',
            'ingredient',
        ]

    # def get_recipe(self, obj):
    #     request = self.context.get('request')
    #     qs = obj.recipe_set.all()  # [:10]
    #     return  RecipeInlineUserSerializer(qs, many=False).data,
  
    # def get_ingredient(self, obj):
    #     request = self.context.get('request')
    #     qs = obj.ingredient_set.all()  # [:10]
    #     return  IngredientInlineUserSerializer(qs, many=True).data,
    
  
