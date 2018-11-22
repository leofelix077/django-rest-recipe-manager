from django.conf import settings
from django.db import models
from ingredient.models import Ingredient

class Recipe(models.Model):
    class Meta:
        unique_together = (('user', 'recipe','ingredient'),)
        
    user                = models.ForeignKey(settings.AUTH_USER_MODEL)
    title               = models.CharField(max_length=140)
    complexity          = models.CharField(max_length=20)
    content             = models.TextField()
    image_url           = models.CharField(max_length=255)
    total_kcal          = models.IntegerField()
    unit_of_measure_amt = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return str(self.title)

    class Meta:
        verbose_name = "recipe"
        verbose_name_plural = "recipes"
