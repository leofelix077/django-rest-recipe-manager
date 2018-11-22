from django.shortcuts import render

# Create your views here.
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
    search_fields = ('title',)
    queryset = RecipeIngredient.objects.all()


def post(self, request, *args, **kwargs):
    return self.create(request, *args, **kwargs)