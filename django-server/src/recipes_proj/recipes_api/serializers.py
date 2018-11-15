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


class UserRecipesSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.UserRecipes
        fields = (
            'complexity',
            'user_profile',
            'title',
            'time_taken',
            'instructions',
            'total_kcal',
            'total_cost',
            'total_cost_crcy',
            'image',
            'image_url',
            'last_modified'
            )
        extra_kwargs = {'user_profile': {"read_only": True}}




