from .serializers import UserDetailsSerializer
from rest_framework import permissions, generics
from django.contrib.auth import authenticate, get_user_model
from ingredient.api.serializers import IngredientInlineUserSerializer
from ingredient.api.views import IngredientAPIView
from ingredient.models import Ingredient

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

