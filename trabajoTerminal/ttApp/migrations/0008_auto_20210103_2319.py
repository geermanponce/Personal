# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ttApp', '0007_auto_20210103_2318'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cvsorterinfo',
            name='cvDescription',
            field=models.CharField(verbose_name='Descripcion', max_length=500, blank=True, null=True, default=' '),
        ),
        migrations.AlterField(
            model_name='cvsorterinfo',
            name='cvPercentage',
            field=models.CharField(verbose_name='Porcentaje obtenido', max_length=10, blank=True, null=True, default='0'),
        ),
    ]
