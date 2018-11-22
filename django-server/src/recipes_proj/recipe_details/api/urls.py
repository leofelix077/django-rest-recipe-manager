from django.conf.urls import url
from .views import (
        RecipeIngredientDetailAPIView,
        RecipeIngredientAPIView,
    )


urlpatterns = [
    url(r'^$', RecipeIngredientAPIView.as_view()),
    url(r'^(?P<id>\d+)/$',RecipeIngredientDetailAPIView.as_view(), name='detail'),
]
