from django.conf.urls import url
from .views import (
        RecipeAPIView,
        RecipeDetailAPIView,
        UserIngredientAPIView
    )


urlpatterns = [
    url(r'^$', RecipeAPIView.as_view()),
    url(r'^(?P<id>\d+)/$',RecipeDetailAPIView.as_view(), name='detail'),
    url(r'^(?P<id>\d+)/$',UserIngredientAPIView.as_view(), name='detail'),
]
