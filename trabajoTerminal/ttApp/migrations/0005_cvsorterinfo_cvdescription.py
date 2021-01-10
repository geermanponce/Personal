# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ttApp', '0004_cvsorterinfo'),
    ]

    operations = [
        migrations.AddField(
            model_name='cvsorterinfo',
            name='cvDescription',
            field=models.CharField(verbose_name='Descripcion', max_length=10, blank=True, null=True, default='0'),
        ),
    ]
