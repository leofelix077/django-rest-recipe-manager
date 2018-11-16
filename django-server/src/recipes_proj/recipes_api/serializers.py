from rest_framework import serializers
from . import models


class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.UserProfile
        fields = ("id", "email", "name", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = models.UserProfile(
            email=validated_data["email"],
            name=validated_data["name"]
        )
        user.set_password(validated_data['password'])
        user.save()

        return user

class RecipeDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RecipeDetails
        fields = (
            'recipe',
            'ingredient',
            'ingredient_quantity',
            'ingredient_qty_unit',
            'last_modified'
            )

class RecipesSerializer(serializers.ModelSerializer):

    recipe_details = RecipeDetailsSerializer(many=True)    
    
    class Meta:
        model = models.Recipes
        fields = (
            'complexity',
            'title',
            'user_profile',
            'time_taken',
            'instructions',
            'total_kcal',
            'total_cost',
            'total_cost_crcy',
            'image',
            'image_url',
            'last_modified',
            "recipe_details"
            )


class IngredientsEquivalenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.IngredientsEquivalence
        fields = (
            'ingredient',
            'unit',
            'target_unit',
            'total_cost',
            'last_modified',
        )        

class IngredientsSerializer(serializers.ModelSerializer):

    ingredient_equivalence = IngredientsEquivalenceSerializer(many=True, read_only=True)

    class Meta:
        model = models.Ingredients
        fields = (
            'name',
            'article_number',
            'description',
            'unit_amount',
            'unit_of_measurement',
            'cost_per_unit',
            'kcal_unit_amount',
            'currency',
            'last_modified',
            'ingredient_equivalence'
        )





