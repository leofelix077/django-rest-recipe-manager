from django.shortcuts        import render
from rest_framework.views    import APIView
from rest_framework.response import Response
from rest_framework          import status

from . import serializers

# Create your views here.


class HelloApiView(APIView):

    serializer_class = serializers.HelloSerializer

    def get(self, request, format=None):

        an_apiview = [
            "Uses HTTP Requests such as get post patch, put delete",
            "similar to a Django View",
            "Gives you the most control over your logic",
            "Is mapped manually to URLs"
        ]

        return Response({"message": "Hello", "an_apiview": an_apiview})

    def post(self, request):

        serializer = serializers.HelloSerializer(data=request.data)
