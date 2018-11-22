from django.conf.urls import url
from django.conf.urls import include
from rest_framework_jwt.views import refresh_jwt_token, obtain_jwt_token
from .views import UserDetailsAPIView, UserIngredientAPIView, UserRecipeAPIView, UserRecipeIngredientAPIView

urlpatterns = [
    url(r'^(?P<id>\w+)/$', UserDetailsAPIView.as_view(), name='detail'),
    url(r'^(?P<id>\w+)/ingredients/$', UserIngredientAPIView.as_view(), name='ingredient-list'),
    url(r'^(?P<id>\w+)/recipes/$', UserRecipeAPIView.as_view(), name='recipe-list'),
    url(r'^(?P<id>\w+)/recipe_details/$', UserRecipeIngredientAPIView.as_view(), name='recipe-list'),
]
