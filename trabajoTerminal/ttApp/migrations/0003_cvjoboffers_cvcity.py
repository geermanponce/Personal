# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ttApp', '0002_auto_20210102_1934'),
    ]

    operations = [
        migrations.AddField(
            model_name='cvjoboffers',
            name='cvCity',
            field=models.CharField(verbose_name='Ciudad', max_length=50, blank=True, null=True, default=' '),
        ),
    ]
