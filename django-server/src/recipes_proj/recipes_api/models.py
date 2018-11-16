from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager
import datetime

# Create your models here.


class UserProfileManager(BaseUserManager):

    def create_user(self, email, name, password=None):

        if not email:
            raise ValueError("Email is required")

        email = self.normalize_email(email)
        user = self.model(email=email, name=name)

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, name, password):

        user = self.create_user(email, name, password)

        user.is_superuser = True

        user.is_staff = True

        user.save(using=self.db)


class UserProfile(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserProfileManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['name']

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name.split(" ")[0]

    def __str__(self):
        return self.email


class Recipes(models.Model):

    VERY_LOW = "1"
    LOW = "2"
    NORMAL = "3"
    HIGH = "4"
    VERY_HIGH = "5"

    RECIPE_COMPLEXITIES = (
        (VERY_LOW, 'Very Low'),
        (LOW, 'Low'),
        (NORMAL, 'Normal'),
        (HIGH, 'high'),
        (VERY_HIGH, 'Very High'),
    )

    complexity = models.CharField(
        max_length=1,
        choices=RECIPE_COMPLEXITIES,
        default=NORMAL,
    )
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, blank=False)
    time_taken = models.TimeField(auto_now_add=False)
    instructions = models.TextField()
    total_kcal = models.IntegerField()
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)
    total_cost_crcy = models.CharField(max_length=3)
    image = models.TextField(max_length=65536, blank=True)
    image_url = models.URLField(max_length=255, blank=True)
    last_modified = models.DateTimeField(auto_now=True)


class Ingredients(models.Model):
    name = models.CharField(max_length=255, blank=False)
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    article_number = models.IntegerField()
    description = models.TextField()
    cost_per_unit = models.DecimalField(max_digits=10, decimal_places=2)
    unit_amount = models.DecimalField(max_digits=10, decimal_places=2)
    unit_of_measurement = models.CharField(max_length=20)
    kcal_unit_amount = models.IntegerField()
    currency = models.CharField(max_length=3)
    last_modified = models.DateTimeField(auto_now=True)


class RecipeDetails(models.Model):
    recipe = models.ForeignKey(Recipes, on_delete=models.CASCADE)
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    ingredient = models.ManyToManyField(Ingredients)
    ingredient_quantity = models.IntegerField()
    ingredient_qty_unit = models.CharField(max_length=3)
    last_modified = models.DateTimeField(auto_now=True)

class IngredientsEquivalence(models.Model):
    ingredient = models.ForeignKey(Ingredients, related_name='ingredient',  on_delete=models.CASCADE)
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    unit = models.CharField(max_length=20)
    target_unit = models.CharField(max_length=20)
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)
    last_modified = models.DateTimeField(auto_now=True)    

