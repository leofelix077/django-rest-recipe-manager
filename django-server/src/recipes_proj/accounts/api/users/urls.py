from django.conf.urls import url
from django.conf.urls import include
from rest_framework_jwt.views import refresh_jwt_token, obtain_jwt_token
from .views import (
    UserDetailsAPIView,
    UserIngredientAPIView,
    UserRecipeAPIView,
    RecipeIngredientDetailAPIView,
    RecipeIngredientAPIView,
    IngredientDetailAPIView,
    RecipeDetailAPIView
)

urlpatterns = [
    url(r'^(?P<id>\w+)/$', UserDetailsAPIView.as_view(), name='detail'),
    url(r'^(?P<id>\w+)/ingredients/$', UserIngredientAPIView.as_view(), name='ingredient-list'),
    url(r'^(?P<id>\w+)/ingredients/(?P<ingredient_id>\w+)', IngredientDetailAPIView.as_view(), name='ingredient-list'),
    url(r'^(?P<id>\w+)/recipes/$', UserRecipeAPIView.as_view(), name='recipe-list'),
    url(r'^(?P<id>\w+)/recipes/(?P<recipe_id>\w+)', RecipeDetailAPIView.as_view(), name='detail'),
    url(r'^(?P<id>\w+)/recipe_details/$', RecipeIngredientAPIView.as_view(), name='recipe-list'),
    url(r'^(?P<id>\w+)/recipe_details/(?P<recipe_id>\w+)', RecipeIngredientDetailAPIView.as_view(), name='recipe-ingredient-detail'),
]
