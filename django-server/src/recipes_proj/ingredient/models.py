from django.conf import settings
from django.db import models


class IngredientQuerySet(models.QuerySet):
    pass

class IngredientManager(models.Manager):
    def get_queryset(self):
        return IngredientQuerySet(self.model, using=self._db)

class Ingredient(models.Model):
    user                = models.ForeignKey(settings.AUTH_USER_MODEL)
    title               = models.CharField(max_length=140)
    content             = models.TextField()
    article_number      = models.IntegerField()
    cost_per_unit       = models.DecimalField(max_digits=23, decimal_places=2)
    currency            = models.CharField(max_length=3)
    unit_of_measurement = models.CharField(max_length=10)
    unit_of_measure_amt = models.DecimalField(max_digits=10, decimal_places=2)
    image_url           = models.CharField(max_length=255)
    kcal_total          = models.IntegerField()
    last_modified       = models.DateTimeField(auto_now=True)
    created_on          = models.DateTimeField(auto_now_add=True)

    objects = IngredientManager()

    def __str__(self):
        return str(self.title)

    class Meta:
        verbose_name = "ingredient"
        verbose_name_plural = "ingredients"
