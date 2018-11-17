from django.conf.urls import url
from django.conf.urls import include
from rest_framework_jwt.views import refresh_jwt_token, obtain_jwt_token
from .views import UserDetailsAPIView, UserIngredientAPIView

urlpatterns = [
    url(r'^(?P<id>\w+)/$', UserDetailsAPIView.as_view(), name='detail'),
    url(r'^(?P<id>\w+)/ingredients/$', UserIngredientAPIView.as_view(), name='ingredient-list'),
]
