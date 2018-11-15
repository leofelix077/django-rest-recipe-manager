from django.conf.urls import url
from django.conf.urls import include

from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register("recipes", views.UserRecipesViewSet)
router.register("login", views.LoginViewSet, base_name='login')

urlpatterns = [
    url(r'', include(router.urls))
]
