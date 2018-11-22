import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework import generics, mixins, permissions
from django.shortcuts import get_object_or_404
from .serializers import RecipeIngredientSerializer
from recipe_details.models import RecipeIngredient


class RecipeIngredientDetailAPIView(mixins.UpdateModelMixin,
                          mixins.DestroyModelMixin, generics.RetrieveAPIView):
    permission_classes = [
        # permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly
    ]
    authentication_classes = []
    serializer_class = RecipeIngredientSerializer
    queryset = RecipeIngredient.objects.all()
    lookup_field = 'id'

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class RecipeIngredientAPIView(generics.ListCreateAPIView):

    permission_classes = []
    authentication_classes = []
    serializer_class = RecipeIngredientSerializer
    queryset = RecipeIngredient.objects.all()


def post(self, request, *args, **kwargs):
    return self.create(request, *args, **kwargs)
