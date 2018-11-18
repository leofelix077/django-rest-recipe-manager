import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework import generics, mixins, permissions
from django.shortcuts import get_object_or_404

from .serializers import IngredientSerializer
from ingredient.models import Ingredient
from accounts.api.permissions import IsOwnerOrReadOnly


class IngredientDetailAPIView(mixins.UpdateModelMixin,
                              mixins.DestroyModelMixin, generics.RetrieveAPIView):
    permission_classes = [
        # permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly
    ]
    authentication_classes = []
    serializer_class = IngredientSerializer
    queryset = Ingredient.objects.all()
    lookup_field = 'id'

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class IngredientAPIView(generics.ListCreateAPIView):

    permission_classes = []
    authentication_classes = []
    serializer_class = IngredientSerializer
    search_fields = ('title', 'article_number')

    queryset = Ingredient.objects.all()


def post(self, request, *args, **kwargs):
    return self.create(request, *args, **kwargs)
