from django.conf import settings
from django.db import models
from ingredient.models import Ingredient
from recipe.models import Recipe
# Create your models here.
class RecipeIngredient(models.Model):
        
    user                = models.ForeignKey(settings.AUTH_USER_MODEL)
    recipe              = models.ForeignKey(Recipe, blank=True, null=True)
    ingredient          = models.ForeignKey(Ingredient)
    ingredient_amount   = models.DecimalField(max_digits=10, decimal_places=2)


    class Meta:
        verbose_name = "recipe"
        verbose_name_plural = "recipes"
