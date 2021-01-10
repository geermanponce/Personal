# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ttApp', '0006_auto_20210103_2311'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cvsorterinfo',
            name='cvPercentage',
            field=models.CharField(verbose_name='Porcentaje obtenido', max_length=500, blank=True, null=True, default=' '),
        ),
    ]
