from .serializers import UserDetailsSerializer
from rest_framework import permissions, generics
from django.contrib.auth import authenticate, get_user_model

from ingredient.api.serializers import IngredientInlineUserSerializer
from ingredient.api.views import IngredientAPIView
from ingredient.api.views import IngredientDetailAPIView
from ingredient.models import Ingredient

from recipe.api.serializers import RecipeInlineUserSerializer
from recipe.api.views import RecipeAPIView
from recipe.api.views import RecipeDetailAPIView
from recipe.models import Recipe

from recipe_details.api.serializers import RecipeIngredientSerializer
from recipe_details.api.views import RecipeIngredientAPIView
from recipe_details.models import RecipeIngredient


User = get_user_model()

class UserDetailsAPIView(generics.RetrieveAPIView):
    permission_classes = [
        # permissions.IsAuthenticatedOrReadOnly
        ]
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserDetailsSerializer
    lookup_field = 'id'



class UserIngredientAPIView(IngredientAPIView):
    serializer_class = IngredientInlineUserSerializer

    def get_queryset(self, *args, **kwargs):
        id = self.kwargs.get('id', None)
        if id is None:
            return Ingredient.objects.none()
        return Ingredient.objects.filter(user__id=id)
        
class IngredientDetailAPIView(IngredientDetailAPIView):
    serializer_class = IngredientInlineUserSerializer

    def get_queryset(self, *args, **kwargs):
        id = self.kwargs.get('id', None)
        ingredient_id = self.kwargs.get('ingredient_id', None)        
        if id is None and ingredient_id is None:
            return Ingredient.objects.none()
        return Ingredient.objects.filter(user__id=id)

class UserRecipeAPIView(RecipeAPIView):
    serializer_class = RecipeInlineUserSerializer

    def get_queryset(self, *args, **kwargs):
        id = self.kwargs.get('id', None)
        if id is None:
            return Recipe.objects.none()
        return Recipe.objects.filter(user__id=id)

class RecipeDetailAPIView(RecipeDetailAPIView):
    serializer_class = RecipeInlineUserSerializer

    def get_queryset(self, *args, **kwargs):
        id = self.kwargs.get('id', None)
        recipe_id = self.kwargs.get('recipe_id', None)        
        if id is None and recipe_id is None:
            return Recipe.objects.none()
        return Recipe.objects.filter(user__id=id, id=recipe_id)        
        
class RecipeIngredientAPIView(RecipeIngredientAPIView):
    serializer_class = RecipeIngredientSerializer
    lookup_field = 'id'
    
    def get_queryset(self, *args, **kwargs):
        id = self.kwargs.get('id', None)
        if id is None:
            return RecipeIngredient.objects.none()
        return RecipeIngredient.objects.filter(user__id=id)

class RecipeIngredientDetailAPIView(RecipeIngredientAPIView):
    serializer_class = RecipeIngredientSerializer
    lookup_field = 'id'
    
    def get_queryset(self, *args, **kwargs):
        id = self.kwargs.get('id', None)
        recipe_id = self.kwargs.get('recipe_id', None)
        if id is None and recipe_id is None:
            return RecipeIngredient.objects.none()
        return RecipeIngredient.objects.filter(user__id=id, recipe__id=recipe_id)
        



