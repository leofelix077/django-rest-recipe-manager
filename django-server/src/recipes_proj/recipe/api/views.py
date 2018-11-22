import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework import generics, mixins, permissions
from django.shortcuts import get_object_or_404
from ingredient.api.serializers import IngredientInlineUserSerializer
from ingredient.api.views import IngredientAPIView
from .serializers import RecipeSerializer
from recipe.models import Recipe
from accounts.api.permissions import IsOwnerOrReadOnly
from ingredient.models import Ingredient


class RecipeDetailAPIView(mixins.UpdateModelMixin,
                          mixins.DestroyModelMixin, generics.RetrieveAPIView):
    permission_classes = [
        # permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly
    ]
    authentication_classes = []
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()
    lookup_field = 'id'

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class RecipeAPIView(generics.ListCreateAPIView):

    permission_classes = []
    authentication_classes = []
    serializer_class = RecipeSerializer
    search_fields = ('title',)
    queryset = Recipe.objects.all()


def post(self, request, *args, **kwargs):
    return self.create(request, *args, **kwargs)


