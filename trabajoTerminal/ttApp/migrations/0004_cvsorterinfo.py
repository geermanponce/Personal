# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ttApp', '0003_cvjoboffers_cvcity'),
    ]

    operations = [
        migrations.CreateModel(
            name='CVSorterInfo',
            fields=[
                ('cvSorterInfoId', models.AutoField(primary_key=True, serialize=False)),
                ('cvPercentage', models.CharField(verbose_name='Porcentaje obtenido', max_length=10, blank=True, null=True, default='0')),
                ('cvJobOfferId', models.ForeignKey(verbose_name='Oferta ID', blank=True, null=True, default='', db_column='cvJobOfferId', to='ttApp.CVJobOffers')),
                ('cvUserPostulantId', models.ForeignKey(verbose_name='Usuario postulante ID', blank=True, null=True, default='', db_column='cvUserPostulantId', to='ttApp.CVUserPostulant')),
            ],
            options={
                'verbose_name': 'Clasificacion',
                'verbose_name_plural': 'Clasificaciones',
            },
        ),
    ]
