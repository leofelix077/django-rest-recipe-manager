from django.conf import settings
from django.db import models



class Ingredient(models.Model):
    user                = models.ForeignKey(settings.AUTH_USER_MODEL)
    title               = models.CharField(max_length=140)
    article_number      = models.TextField(max_length=20)
    cost_per_unit       = models.DecimalField(max_digits=23, decimal_places=2)
    unit_of_measurement = models.CharField(max_length=10)
    unit_of_measure_amt = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return str(self.title)

    class Meta:
        verbose_name = "ingredient"
        verbose_name_plural = "ingredients"
