from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework import filters
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated

from . import serializers
from . import models
from . import permissions

# Create your views here.

class UserProfileViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.UserProfileSerializer
    queryset = models.UserProfile.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.ViewOwnProfile,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ("name", "email",)

class LoginViewSet(viewsets.ViewSet):
    serializer_class = AuthTokenSerializer

    def create(self, request):
        return ObtainAuthToken().post(request)

class RecipesViewSet(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    serializer_class = serializers.RecipesSerializer
    queryset = models.Recipes.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(user_profile=self.request.user)

class RecipeDetailsViewSet(viewsets.ModelViewSet):

    authentication_classes = (TokenAuthentication,)
    serializer_class = serializers.RecipeDetailsSerializer
    queryset = models.RecipeDetails.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(user_profile=self.request.user)

class IngredientsViewSet(viewsets.ModelViewSet):

    authentication_classes = (TokenAuthentication,)
    serializer_class = serializers.IngredientsSerializer
    queryset = models.Ingredients.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(user_profile=self.request.user, id=1)
        
    @property
    def ingredient_equivalence(self):
        return self.models.IngredientsEquivalence.objects.all()

class IngredientsEquivalenceViewSet(viewsets.ModelViewSet):

    authentication_classes = (TokenAuthentication,)
    serializer_class = serializers.IngredientsEquivalenceSerializer
    queryset = models.IngredientsEquivalence.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(user_profile=self.request.user, ingredient_id=1, id=1)  
