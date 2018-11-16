from django.conf.urls import url
from django.conf.urls import include

from rest_framework import routers

from . import views

router = routers.DefaultRouter()

urlpatterns = [
    url(r'', include(router.urls))
]
