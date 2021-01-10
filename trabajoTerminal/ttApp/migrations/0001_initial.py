# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import datetime


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CVAbilities',
            fields=[
                ('cvAbilitiesId', models.AutoField(primary_key=True, serialize=False)),
                ('cvAbility', models.CharField(verbose_name='Habilidad', max_length=100)),
            ],
            options={
                'verbose_name': 'Habilidad',
                'verbose_name_plural': 'Habilidades',
            },
        ),
        migrations.CreateModel(
            name='CVAcademicExperience',
            fields=[
                ('cvAcademicExpId', models.AutoField(primary_key=True, serialize=False)),
                ('cvLevel', models.CharField(verbose_name='Nivel', max_length=100)),
                ('cvInstitute', models.CharField(verbose_name='Institución', max_length=100)),
                ('cvDegree', models.CharField(verbose_name='Titulo o carrera', max_length=100)),
                ('cvInitDate', models.DateTimeField(verbose_name='Fecha de Inicio', default=datetime.datetime.now)),
                ('cvEndDate', models.DateTimeField(verbose_name='Fecha de termino', default=datetime.datetime.now)),
                ('cvIsActive', models.BooleanField(verbose_name='Sigue estudiando?', default=False)),
            ],
            options={
                'verbose_name': 'Experiencia Academica',
                'verbose_name_plural': 'Experiencias Academicas',
            },
        ),
        migrations.CreateModel(
            name='CVAdminUser',
            fields=[
                ('cvUserAdminId', models.AutoField(primary_key=True, serialize=False)),
                ('cvJobTittle', models.CharField(verbose_name='Puesto laboral', max_length=50, blank=True, default='')),
                ('cvIsRecruiter', models.BooleanField(verbose_name='¿Es usuario reclutador?', default=True)),
            ],
            options={
                'verbose_name': 'Usuario Administrador',
                'verbose_name_plural': 'Usuarios Administradores',
            },
        ),
        migrations.CreateModel(
            name='CVCompany',
            fields=[
                ('cvCompanyId', models.AutoField(primary_key=True, serialize=False)),
                ('cvName', models.CharField(verbose_name='Nombre', max_length=30, blank=True)),
                ('cvAddress', models.CharField(verbose_name='Direccion', max_length=100, blank=True)),
                ('cvKind', models.CharField(verbose_name='Giro de la empresa', max_length=20, blank=True)),
            ],
            options={
                'verbose_name': 'Empresa',
                'verbose_name_plural': 'Empresa',
            },
        ),
        migrations.CreateModel(
            name='CVCurriculumVitae',
            fields=[
                ('cvCVId', models.AutoField(primary_key=True, serialize=False)),
                ('cvProfessionalObj', models.CharField(verbose_name='Objetivo Profesional', max_length=500, blank=True)),
                ('cvOtherInfo', models.CharField(verbose_name='Otra informacion', max_length=500, blank=True)),
            ],
            options={
                'verbose_name': 'CV',
                'verbose_name_plural': 'CV',
            },
        ),
        migrations.CreateModel(
            name='CVJobOffers',
            fields=[
                ('cvJobOfferId', models.AutoField(primary_key=True, serialize=False)),
                ('cvTittle', models.CharField(verbose_name='Puesto Laboral', max_length=100, blank=True, null=True, default=' ')),
                ('cvCreationDate', models.DateTimeField(verbose_name='Fecha de creacion', default=datetime.datetime.now)),
                ('cvExpirationDate', models.DateTimeField(verbose_name='Fecha de expiracion', default=datetime.datetime.now)),
                ('cvMaxPostulant', models.IntegerField(verbose_name='Maximo de postulantes', blank=True, null=True)),
                ('cvDescription', models.CharField(verbose_name='Descripcion', max_length=999, blank=True, null=True)),
                ('cvSalary', models.CharField(verbose_name='Sueldo', max_length=30, blank=True, null=True, default='0')),
                ('cvIsActive', models.BooleanField(verbose_name='vacante disponible?', default=True)),
                ('cvCompanyId', models.ForeignKey(verbose_name='Empresa ID', blank=True, null=True, default='', db_column='cvCompanyId', to='ttApp.CVCompany')),
                ('cvUserAdminId', models.ForeignKey(verbose_name='Admin ID', blank=True, null=True, default='', db_column='cvUserAdminId', to='ttApp.CVAdminUser')),
            ],
            options={
                'verbose_name': 'Oferta laboral',
                'verbose_name_plural': 'Ofertas laborales',
            },
        ),
        migrations.CreateModel(
            name='CVLanguages',
            fields=[
                ('cvLanguagesId', models.AutoField(primary_key=True, serialize=False)),
                ('cvLanguage', models.CharField(verbose_name='Idioma', max_length=100)),
                ('cvLevel', models.CharField(verbose_name='Nivel', max_length=100)),
                ('cvCVId', models.ForeignKey(verbose_name='CV ID', db_column='cvCVId', to='ttApp.CVCurriculumVitae')),
            ],
            options={
                'verbose_name': 'Idioma',
                'verbose_name_plural': 'Idiomas',
            },
        ),
        migrations.CreateModel(
            name='CVTools',
            fields=[
                ('cvToolsId', models.AutoField(primary_key=True, serialize=False)),
                ('cvtool', models.CharField(verbose_name='Herramientas', max_length=100)),
                ('cvCVId', models.ForeignKey(verbose_name='CV ID', db_column='cvCVId', to='ttApp.CVCurriculumVitae')),
            ],
            options={
                'verbose_name': 'Herramienta',
                'verbose_name_plural': 'Herramientas',
            },
        ),
        migrations.CreateModel(
            name='CVUser',
            fields=[
                ('cvUserId', models.AutoField(primary_key=True, serialize=False, db_column='cvUserId')),
                ('cvActive', models.BooleanField(verbose_name='¿Esta activo?', default=True)),
                ('cvKind', models.CharField(verbose_name='Tipo', max_length=15, default='GENERAL', choices=[('ADMINISTRADOR', 'ADMINISTRADOR'), ('RECLUTADOR', 'RECLUTADOR'), ('POSTULANTE', 'POSTULANTE')])),
                ('cvName', models.CharField(verbose_name='Nombres', max_length=50)),
                ('cvAge', models.IntegerField(verbose_name='Edad', blank=True, null=True)),
                ('cvMail', models.CharField(verbose_name='Correo', max_length=50, blank=True, null=True)),
                ('cvPhone', models.CharField(verbose_name='Telefono', max_length=20, blank=True, null=True)),
                ('cvMobilePhone', models.CharField(verbose_name='Celular', max_length=20, blank=True, null=True)),
                ('cvUserAccess', models.CharField(verbose_name='Usuario', max_length=20)),
                ('cvPassAccess', models.CharField(verbose_name='Password', max_length=25)),
                ('cvAddress', models.CharField(verbose_name='Dirección', max_length=100, blank=True, default='')),
            ],
            options={
                'verbose_name': 'Usuario',
                'verbose_name_plural': 'Usuarios',
            },
        ),
        migrations.CreateModel(
            name='CVUserPostulant',
            fields=[
                ('cvUserPostulantId', models.AutoField(primary_key=True, serialize=False)),
                ('cvCURP', models.CharField(verbose_name='CURP', max_length=18, unique=True, blank=True)),
                ('cvRFC', models.CharField(verbose_name='RFC', max_length=13, unique=True, blank=True)),
                ('cvNSS', models.CharField(verbose_name='Numero Seguro Social', max_length=18, unique=True, blank=True)),
                ('cvUserId', models.ForeignKey(verbose_name='Usuario ID', blank=True, null=True, db_column='cvUserId', to='ttApp.CVUser')),
            ],
            options={
                'verbose_name': 'Usuario Postulante',
                'verbose_name_plural': 'Usuarios Postulantes',
            },
        ),
        migrations.CreateModel(
            name='CVWorkExperience',
            fields=[
                ('cvworkExpId', models.AutoField(primary_key=True, serialize=False)),
                ('cvJobTittle', models.CharField(verbose_name='Puesto', max_length=100)),
                ('cvCompanyName', models.CharField(verbose_name='Empresa', max_length=100)),
                ('cvActivities', models.CharField(verbose_name='Actividades', max_length=999)),
                ('cvInitDate', models.DateTimeField(verbose_name='Fecha de Inicio', default=datetime.datetime.now)),
                ('cvEndDate', models.DateTimeField(verbose_name='Fecha de termino', default=datetime.datetime.now)),
                ('cvIsActive', models.BooleanField(verbose_name='Sigue trabajando?', default=False)),
                ('cvCVId', models.ForeignKey(verbose_name='CV ID', db_column='cvCVId', to='ttApp.CVCurriculumVitae')),
            ],
            options={
                'verbose_name': 'Experiencia Laboral',
                'verbose_name_plural': 'Experiencias Laborales',
            },
        ),
        migrations.AddField(
            model_name='cvcurriculumvitae',
            name='cvUserPostulantId',
            field=models.ForeignKey(verbose_name='Postulante ID', blank=True, null=True, db_column='cvUserPostulantId', to='ttApp.CVUserPostulant'),
        ),
        migrations.AddField(
            model_name='cvadminuser',
            name='cvCompanyId',
            field=models.ForeignKey(verbose_name='Empresa', blank=True, null=True, db_column='cvCompanyId', to='ttApp.CVCompany'),
        ),
        migrations.AddField(
            model_name='cvadminuser',
            name='cvUserId',
            field=models.ForeignKey(verbose_name='Usuario ID', blank=True, null=True, db_column='cvUserId', to='ttApp.CVUser'),
        ),
        migrations.AddField(
            model_name='cvacademicexperience',
            name='cvCVId',
            field=models.ForeignKey(verbose_name='CV ID', db_column='cvCVId', to='ttApp.CVCurriculumVitae'),
        ),
        migrations.AddField(
            model_name='cvabilities',
            name='cvCVId',
            field=models.ForeignKey(verbose_name='CV ID', db_column='cvCVId', to='ttApp.CVCurriculumVitae'),
        ),
    ]
