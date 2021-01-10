from django.db import models
from django.utils.encoding  import python_2_unicode_compatible
import datetime

# Create your models here.

USERS_TYPES=(
      ('ADMINISTRADOR', 'ADMINISTRADOR'),
      ('RECLUTADOR', 'RECLUTADOR'),
      ('POSTULANTE', 'POSTULANTE')
      )


@python_2_unicode_compatible 
class CVUser(models.Model):

   cvUserId           = models.AutoField(db_column='cvUserId',primary_key= True)
   cvActive           = models.BooleanField(default=True,verbose_name="¿Esta activo?")
   cvKind             = models.CharField(max_length=15, choices=USERS_TYPES, default='GENERAL', verbose_name="Tipo")
   cvName             = models.CharField(max_length=50 ,blank=False, null=False, verbose_name="Nombres")
   cvAge              = models.IntegerField(blank=True, null=True, verbose_name="Edad")
   cvMail             = models.CharField(max_length=50 ,blank=True, null=True, verbose_name="Correo")
   cvPhone            = models.CharField(max_length=20 ,blank=True, null=True, verbose_name="Telefono")
   cvMobilePhone      = models.CharField(max_length=20 ,blank=True, null=True, verbose_name="Celular")
   cvUserAccess       = models.CharField(max_length=20 ,blank=False, null=False, verbose_name="Usuario")
   cvPassAccess       = models.CharField(max_length=25 ,blank=False, null=False, verbose_name="Password")
   cvAddress          = models.CharField(max_length=100 ,blank=True, null=False, default='', verbose_name="Dirección")

   class Meta:
      verbose_name= 'Usuario'
      verbose_name_plural='Usuarios'
   def __str__(self):
      return str(self.cvName)

@python_2_unicode_compatible 
class CVAdminUser(models.Model):

   cvUserAdminId      = models.AutoField(primary_key= True)
   cvUserId           = models.ForeignKey('CVUser',db_column='cvUserId', null=True, blank=True, verbose_name="Usuario ID")
   cvCompanyId        = models.ForeignKey('CVCompany',db_column='cvCompanyId', null=True, blank=True, verbose_name="Empresa")
   cvJobTittle        = models.CharField(max_length=50, blank=True, null=False, default='', verbose_name="Puesto laboral")
   cvIsRecruiter      = models.BooleanField(default=True,verbose_name="¿Es usuario reclutador?")

   class Meta:
      verbose_name= 'Usuario Administrador'
      verbose_name_plural='Usuarios Administradores'
   def __str__(self):
      return str(self.cvUserAdminId)

@python_2_unicode_compatible 
class CVUserPostulant(models.Model):

   cvUserPostulantId  = models.AutoField(primary_key= True)
   cvUserId           = models.ForeignKey('CVUser',db_column='cvUserId', null=True, blank=True, verbose_name="Usuario ID")
   cvCURP             = models.CharField(max_length=18, blank=True, null=False, unique=True, verbose_name="CURP")
   cvRFC              = models.CharField(max_length=13, blank=True, null=False, unique=True, verbose_name="RFC")
   cvNSS              = models.CharField(max_length=18, blank=True, null=False, unique=True, verbose_name="Numero Seguro Social")

   class Meta:
      verbose_name= 'Usuario Postulante'
      verbose_name_plural='Usuarios Postulantes'
   def __str__(self):
      return str(self.cvUserPostulantId)

@python_2_unicode_compatible 
class CVCompany(models.Model):

   cvCompanyId       = models.AutoField(primary_key= True)
   cvName            = models.CharField(max_length=30, blank=True, null=False, verbose_name="Nombre")
   cvAddress         = models.CharField(max_length=100, blank=True, null=False, verbose_name="Direccion")
   cvKind            = models.CharField(max_length=20, blank=True, null=False, verbose_name="Giro de la empresa")

   class Meta:
      verbose_name= 'Empresa'
      verbose_name_plural='Empresa'
   def __str__(self):
      return str(self.cvName)

@python_2_unicode_compatible 
class CVCurriculumVitae(models.Model):

   cvCVId            = models.AutoField(primary_key= True)
   cvUserPostulantId = models.ForeignKey('CVUserPostulant',db_column='cvUserPostulantId', null=True, blank=True, verbose_name="Postulante ID")
   cvProfessionalObj = models.CharField(max_length=500, blank=True, null=False, verbose_name="Objetivo Profesional")
   cvOtherInfo       = models.CharField(max_length=500, blank=True, null=False, verbose_name="Otra informacion")

   class Meta:
      verbose_name= 'CV'
      verbose_name_plural='CV'
   def __str__(self):
      return str(self.cvCVId)

@python_2_unicode_compatible 
class CVAcademicExperience(models.Model):

   cvAcademicExpId    = models.AutoField(primary_key= True)
   cvCVId             = models.ForeignKey('CVCurriculumVitae',db_column='cvCVId', verbose_name="CV ID")
   cvLevel            = models.CharField(max_length=100, blank=False, null=False, verbose_name="Nivel")
   cvInstitute        = models.CharField(max_length=100, blank=False, null=False, verbose_name="Institución")
   cvDegree           = models.CharField(max_length=100, blank=False, null=False, verbose_name="Titulo o carrera")
   cvInitDate         = models.DateTimeField(default=datetime.datetime.now,verbose_name= 'Fecha de Inicio')
   cvEndDate          = models.DateTimeField(default=datetime.datetime.now,verbose_name= 'Fecha de termino')
   cvIsActive         = models.BooleanField(default=False, verbose_name= 'Sigue estudiando?')


   class Meta:
      verbose_name= 'Experiencia Academica'
      verbose_name_plural='Experiencias Academicas'
   def __str__(self):
      return str(self.cvAcademicExpId)


@python_2_unicode_compatible 
class CVWorkExperience(models.Model):

   cvworkExpId        = models.AutoField(primary_key= True)
   cvCVId             = models.ForeignKey('CVCurriculumVitae',db_column='cvCVId', verbose_name="CV ID")
   cvJobTittle        = models.CharField(max_length=100, blank=False, null=False, verbose_name="Puesto")
   cvCompanyName      = models.CharField(max_length=100, blank=False, null=False, verbose_name="Empresa")
   cvActivities       = models.CharField(max_length=999, blank=False, null=False, verbose_name="Actividades")
   cvInitDate         = models.DateTimeField(default=datetime.datetime.now,verbose_name= 'Fecha de Inicio')
   cvEndDate          = models.DateTimeField(default=datetime.datetime.now,verbose_name= 'Fecha de termino')
   cvIsActive         = models.BooleanField(default=False, verbose_name= 'Sigue trabajando?')


   class Meta:
      verbose_name= 'Experiencia Laboral'
      verbose_name_plural='Experiencias Laborales'
   def __str__(self):
      return str(self.cvworkExpId)


@python_2_unicode_compatible 
class CVAbilities(models.Model):

   cvAbilitiesId      = models.AutoField(primary_key= True)
   cvCVId             = models.ForeignKey('CVCurriculumVitae',db_column='cvCVId', verbose_name="CV ID")
   cvAbility          = models.CharField(max_length=100, blank=False, null=False, verbose_name="Habilidad")


   class Meta:
      verbose_name= 'Habilidad'
      verbose_name_plural='Habilidades'
   def __str__(self):
      return str(self.cvAbilitiesId)


@python_2_unicode_compatible 
class CVTools(models.Model):

   cvToolsId          = models.AutoField(primary_key= True)
   cvCVId             = models.ForeignKey('CVCurriculumVitae',db_column='cvCVId', verbose_name="CV ID")
   cvtool             = models.CharField(max_length=100, blank=False, null=False, verbose_name="Herramientas")


   class Meta:
      verbose_name= 'Herramienta'
      verbose_name_plural='Herramientas'
   def __str__(self):
      return str(self.cvToolsId)


@python_2_unicode_compatible 
class CVLanguages(models.Model):

   cvLanguagesId      = models.AutoField(primary_key= True)
   cvCVId             = models.ForeignKey('CVCurriculumVitae',db_column='cvCVId', verbose_name="CV ID")
   cvLanguage         = models.CharField(max_length=100, blank=False, null=False, verbose_name="Idioma")
   cvLevel            = models.CharField(max_length=100, blank=False, null=False, verbose_name="Nivel")


   class Meta:
      verbose_name= 'Idioma'
      verbose_name_plural='Idiomas'
   def __str__(self):
      return str(self.cvLanguagesId)


@python_2_unicode_compatible 
class CVJobOffers(models.Model):

   cvJobOfferId       = models.AutoField(primary_key= True)
   cvUserAdminId      = models.ForeignKey('CVAdminUser',db_column='cvUserAdminId', null=True, blank=True, default='', verbose_name="Admin ID")
   cvCompanyId        = models.ForeignKey('CVCompany',db_column='cvCompanyId', null=True, blank=True, default='', verbose_name="Empresa ID")
   cvTittle           = models.CharField(max_length=100 ,blank=True, null=True, default=' ', verbose_name= 'Puesto Laboral')
   cvCreationDate     = models.DateTimeField(default=datetime.datetime.now,verbose_name= 'Fecha de creacion')
   cvExpirationDate   = models.DateTimeField(default=datetime.datetime.now,verbose_name= 'Fecha de expiracion')
   cvAgeOffer         = models.CharField(max_length=30,blank=True, null=True, default=" ", verbose_name="Rango de edad")
   cvExperiences      = models.CharField(max_length=30,blank=True, null=True, default=" ", verbose_name="Experiencia laboral deseada")
   cvCity             = models.CharField(max_length=50,blank=True, null=True, default=" ", verbose_name="Ciudad")
   cvMaxPostulant     = models.IntegerField(blank=True, null=True, verbose_name="Maximo de postulantes")
   cvDescription      = models.CharField(max_length=999 ,blank=True, null=True, verbose_name="Descripcion")
   cvSalary           = models.CharField(max_length=30 ,blank=True, null=True, default='0', verbose_name="Sueldo")
   cvIsActive         = models.BooleanField(default=True, verbose_name= 'vacante disponible?')

   class Meta:
      verbose_name= 'Oferta laboral'
      verbose_name_plural='Ofertas laborales'
   def __str__(self):
      return str(self.cvJobOfferId)

@python_2_unicode_compatible 
class CVSorterInfo(models.Model):

   cvSorterInfoId     = models.AutoField(primary_key= True)
   cvJobOfferId       = models.ForeignKey('CVJobOffers',db_column='cvJobOfferId', null=True, blank=True, default='', verbose_name="Oferta ID")
   cvUserPostulantId  = models.ForeignKey('CVUserPostulant',db_column='cvUserPostulantId', null=True, blank=True, default='', verbose_name="Usuario postulante ID")
   cvDescription      = models.CharField(max_length=500 ,blank=True, null=True, default=' ', verbose_name= 'Descripcion')
   cvPercentage       = models.CharField(max_length=10 ,blank=True, null=True, default='0', verbose_name= 'Porcentaje obtenido')

   class Meta:
      verbose_name= 'Clasificacion'
      verbose_name_plural='Clasificaciones'
   def __str__(self):
      return str(self.cvSorterInfoId)

