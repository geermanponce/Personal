from django.contrib import admin

from ttApp.models import CVUser
from ttApp.models import CVAdminUser
from ttApp.models import CVUserPostulant
from ttApp.models import CVCompany
from ttApp.models import CVCurriculumVitae
from ttApp.models import CVJobOffers
from ttApp.models import CVAcademicExperience
from ttApp.models import CVWorkExperience
from ttApp.models import CVAbilities
from ttApp.models import CVTools
from ttApp.models import CVLanguages
from ttApp.models import CVSorterInfo

class CVAcademicExperienceInline(admin.TabularInline):#{{{#
      model = CVAcademicExperience
      extra = 0
      #}}}#


class CVWorkExperienceInline(admin.TabularInline):#{{{#
      model = CVWorkExperience
      extra = 0
      #}}}#


class CVAbilitiesInline(admin.TabularInline):#{{{#
      model = CVAbilities
      extra = 0
      #}}}#


class CVToolsInline(admin.TabularInline):#{{{#
      model = CVTools
      extra = 0
      #}}}#


class CVLanguagesInline(admin.TabularInline):#{{{#
      model = CVLanguages
      extra = 0
      #}}}#

class CVSorterInfoInline(admin.TabularInline):#{{{#
      model = CVSorterInfo
      extra = 0
      #}}}#

class CVUserAdmin(admin.ModelAdmin):#{{{#
   list_display  = ['cvUserId','cvActive','cvKind','cvName','cvUserAccess','cvPassAccess']
   list_filter   = ['cvKind','cvName','cvUserAccess']
   search_fields = ['cvName']

class CVAdminUserAdmin(admin.ModelAdmin):#{{{#
   list_display  = ['cvUserAdminId','cvUserId','cvCompanyId','cvJobTittle','cvIsRecruiter']
   list_filter   = ['cvUserId','cvCompanyId','cvJobTittle']
   search_fields = ['cvCompanyId']

class CVUserPostulantAdmin(admin.ModelAdmin):#{{{#
   list_display  = ['cvUserPostulantId','cvUserId','cvCURP','cvRFC','cvNSS']
   list_filter   = ['cvUserId','cvCURP']
   search_fields = ['cvCURP']

class CVCompanyAdmin(admin.ModelAdmin):#{{{#
   list_display  = ['cvCompanyId','cvName','cvAddress','cvKind']
   list_filter   = ['cvName']
   search_fields = ['cvName']

class CVCurriculumVitaeAdmin(admin.ModelAdmin):#{{{#
   list_display  = ['cvCVId','cvOtherInfo']
   list_filter   = ['cvCVId']
   search_fields = ['cvCVId']

   inlines = [CVAcademicExperienceInline, CVWorkExperienceInline, CVAbilitiesInline, CVToolsInline, CVLanguagesInline]

class CVJobOffersAdmin(admin.ModelAdmin):#{{{#
   list_display  = ['cvJobOfferId','cvCreationDate','cvExpirationDate','cvMaxPostulant','cvDescription']
   list_filter   = ['cvJobOfferId','cvCreationDate','cvExpirationDate']
   search_fields = ['cvJobOfferId']

   inlines = [CVSorterInfoInline]
   
'''
class CVAcademicExperienceAdmin(admin.ModelAdmin):#{{{#
   list_display  = ['cvAcademicExpId','cvCVId','cvLevel','cvInstitute','cvDegree']
   list_filter   = ['cvLevel','cvInstitute','cvDegree']
   search_fields = ['cvLevel','cvInstitute','cvDegree']
'''

admin.site.register(CVUser, CVUserAdmin)
admin.site.register(CVAdminUser, CVAdminUserAdmin)
admin.site.register(CVUserPostulant, CVUserPostulantAdmin)
admin.site.register(CVCompany, CVCompanyAdmin)
admin.site.register(CVCurriculumVitae, CVCurriculumVitaeAdmin)
admin.site.register(CVJobOffers, CVJobOffersAdmin)
#admin.site.register(CVAcademicExperience, CVAcademicExperienceAdmin)