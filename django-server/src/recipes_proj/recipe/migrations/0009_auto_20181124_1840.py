# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-11-24 18:40
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0008_auto_20181124_1822'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='image_url',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
