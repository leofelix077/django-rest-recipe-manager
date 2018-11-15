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


""" class ProfileFeedItem(models.Model):

    user_profile = models.ForeignKey("UserProfile", on_delete=models.CASCADE)
    status_text = models.CharField(max_length=255)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.status_text """


class UserRecipes(models.Model):
    VERY_LOW="1"
    LOW="2"
    NORMAL="3"
    HIGH="4"
    VERY_HIGH="5"

    RECIPE_COMPLEXITIES = (
        (VERY_LOW, 'Very Low'),
        (LOW, 'Low'),
        (NORMAL, 'Normal'),
        (HIGH, 'high'),
        (VERY_HIGH, 'Very High'),
    )

    complexity      = models.CharField(
        max_length=1,
        choices=RECIPE_COMPLEXITIES,
        default=NORMAL,
    )
    user_profile    = models.ForeignKey("UserProfile", on_delete=models.CASCADE)
    title           = models.CharField(max_length=255, blank=False)
    time_taken      = models.TimeField(auto_now_add=False)
    instructions    = models.TextField()
    total_kcal      = models.IntegerField()
    total_cost      = models.DecimalField(max_digits=10, decimal_places=2)
    total_cost_crcy = models.CharField(max_length=3)
    image           = models.TextField(max_length=65536, blank=True)
    image_url       = models.URLField(max_length=255, blank=True)
    last_modified   = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '%s %s %s' % (self.title, self.instructions, self.complexity)


""" class UserIngredients(models.Model):
    name
    user_profile
    article_number
    description
    unit_of_measurement
    unit_amount
    cost_per_unit
    kcal_unit_amount
    currency
    created_on

class UserRecipeDetails(models.Model):
    user_recipe_id = models.ForeignKey("UserRecipes", on_delete=models.CASCADE)
    ingredient_id  = models.ForeignKey("UserIngredients", on_delete=models.SET_NULL)
    ingredient_quantity
    ingredient_qty_unit
    created_on
    last_modified
 """

