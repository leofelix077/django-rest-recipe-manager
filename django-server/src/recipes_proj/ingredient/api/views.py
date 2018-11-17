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
        permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
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


class IngredientAPIView(
    mixins.CreateModelMixin,
    generics.ListAPIView
):

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    authentication_classes = [SessionAuthentication]
    serializer_class = IngredientSerializer
    passed_id = None
    search_fields = ('user__id', 'content', 'title', 'article_number')
    ordering_fields = ("article_number", "timestamp")
    queryset = Ingredient.objects.all()

def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


# class IngredientListSearchAPIView(APIView):
#     permission_classes = []
#     authentication_classes = []

#     def get(self, request, format=None):
#         qs = Ingredient.objects.all()
#         serializer = IngredientSerializer(qs, many=True)
#         return Response(serializer.data)

#     def post(self, request, format=None):
#         qs = Ingredient.objects.all()
#         serializer = IngredientSerializer(qs, many=True)
#         return Response(serializer.data)

# class IngredientCreateAPIView(generics.CreateAPIView):
#     permission_classes = []
#     authentication_classes = []
#     queryset = Ingredient.objects.all()
#     serializer_class = IngredientSerializer

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)

# class IngredientDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
#     permission_classes = []
#     authentication_classes = []
#     queryset = Ingredient.objects.all()
#     serializer_class = IngredientSerializer
#     lookup_field = 'id'

""" class IngredientDetailAPIView(mixins.DestroyModelMixin, mixins.UpdateModelMixin, generics.RetrieveAPIView):
    permission_classes = []
    authentication_classes = []
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    lookup_field = 'id'

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)    
 """
"""     def get_object(self, *args, **kwargs):
        kwargs = self.kwargs
        kw_id = kwargs.get('id')
        return Ingredient.objects.get(id=kw_id) """

""" class IngredientUpdateAPIView(generics.UpdateAPIView):
    permission_classes = []
    authentication_classes = []
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    lookup_field = 'id'

class IngredientDeleteAPIView(generics.DestroyAPIView):
    permission_classes = []
    authentication_classes = []
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    lookup_field = 'id' """
