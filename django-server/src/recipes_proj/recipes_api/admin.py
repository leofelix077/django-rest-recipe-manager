from django.contrib import admin

from . import models
# Register your models here.

admin.site.register(models.UserProfile)
admin.site.register(models.Recipes)
admin.site.register(models.RecipeDetails)
admin.site.register(models.Ingredients)
admin.site.register(models.IngredientsEquivalence)
