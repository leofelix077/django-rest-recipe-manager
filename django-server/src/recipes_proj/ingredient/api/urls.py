from django.conf.urls import url
from .views import (
        IngredientAPIView,
        IngredientDetailAPIView,
    )


urlpatterns = [
    url(r'^$', IngredientAPIView.as_view()),
    url(r'^(?P<id>\d+)/$',IngredientDetailAPIView.as_view(), name='detail'),
]
