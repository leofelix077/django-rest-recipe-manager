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
    """Handles the CRUD for profile"""
    serializer_class = serializers.UserProfileSerializer
    queryset = models.UserProfile.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.ViewOwnProfile,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ("name", "email",)

class LoginViewSet(viewsets.ViewSet):
    """check email and pwd, and returns an auth token"""

    serializer_class = AuthTokenSerializer

    def create(self, request):
        """Use the ObtainAuthToken APIView to validate and create a token"""
        return ObtainAuthToken().post(request)

class UserRecipesViewSet(viewsets.ModelViewSet):
    """ Handles CRUD for Profile Feed Items """

    authentication_classes = (TokenAuthentication,)
    serializer_class = serializers.UserRecipesSerializer
    queryset = models.UserRecipes.objects.all()
    permission_classes = (permissions.PostOwnRecipes, IsAuthenticated,)
    
    def perform_create(self, serializer):
        "sets the user profile ot the logged in user"

        serializer.save(user_profile=self.request.user)