from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.


class HelloApiView(APIView):

    def get(self, request, format=None):

        an_apiview = [
            "Uses HTTP Requests such as get post patch, put delete",
            "similar to a Django View",
            "Gives you the most control over your logic",
            "Is mapped manually to URLs"
        ]

        return Response({"message": "Hello", "an_apiview": an_apiview})
