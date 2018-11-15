from django.conf.urls import url
from django.conf.urls import include

from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register("hello-viewset", views.HelloViewSet, base_name="hello-viewset")

urlpatterns = [
    url(r'^hello-view/',views.HelloApiView.as_view()),
    url(r'', include(router.urls))
]