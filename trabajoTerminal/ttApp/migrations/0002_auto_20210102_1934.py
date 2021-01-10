# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ttApp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='cvjoboffers',
            name='cvAgeOffer',
            field=models.CharField(verbose_name='Rango de edad', max_length=30, blank=True, null=True, default=' '),
        ),
        migrations.AddField(
            model_name='cvjoboffers',
            name='cvExperiences',
            field=models.CharField(verbose_name='Experiencia laboral deseada', max_length=30, blank=True, null=True, default=' '),
        ),
    ]
