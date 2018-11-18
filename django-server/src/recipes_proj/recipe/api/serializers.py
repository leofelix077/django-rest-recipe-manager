from rest_framework import serializers
from recipe.models import Recipe
from ingredient.api.serializers import IngredientInlineUserSerializer
from rest_framework.reverse import reverse as api_reverse


class RecipeSerializer(serializers.ModelSerializer):
    uri = serializers.SerializerMethodField(read_only=True)
    # ingredient = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Recipe
        fields = [
            'uri',
            'id',
            'recipe',
            'user',
            'title',
            'ingredient',
            'ingredient_amount',
            'complexity',
            'content',
            'image_url',
            'total_kcal',
            'unit_of_measure_amt',
        ]

    def get_uri(self, obj):
        request = self.context.get('request')
        return api_reverse('api-recipe:detail', kwargs={'id': obj.id}, request=request)


class RecipeInlineUserSerializer(RecipeSerializer):
    class Meta:
        model = Recipe
        fields = [
            'uri',
            'id',
            'recipe',
            'user',
            'title',
            'ingredient',
            'ingredient_amount',
            'complexity',
            'content',
            'image_url',
            'total_kcal',
            'unit_of_measure_amt',
        ]