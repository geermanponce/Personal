
from django.conf.urls import patterns, url

from ttApp import views

urlpatterns = patterns('',
	url(r'^loginUser/', views.loginUser, name='loginUser'),
	url(r'^RegisterUser/', views.RegisterUser, name='RegisterUser'),

	url(r'^addAcademicExperience/', views.addAcademicExperience, name='addAcademicExperience'),
	url(r'^editAcademicExperience/', views.editAcademicExperience, name='editAcademicExperience'),
	url(r'^deleteAcademicExperience/', views.deleteAcademicExperience, name='deleteAcademicExperience'),

	url(r'^addWorkExperience/', views.addWorkExperience, name='addWorkExperience'),
	url(r'^editWorkExperience/', views.editWorkExperience, name='editWorkExperience'),
	url(r'^deleteWorkExperience/', views.deleteWorkExperience, name='deleteWorkExperience'),

	url(r'^addNewAbility/', views.addNewAbility, name='addNewAbility'),
	url(r'^editAbility/', views.editAbility, name='editAbility'),
	url(r'^deleteAbility/', views.deleteAbility, name='deleteAbility'),

	url(r'^addNewTool/', views.addNewTool, name='addNewTool'),
	url(r'^editTool/', views.editTool, name='editTool'),
	url(r'^deleteTool/', views.deleteTool, name='deleteTool'),

	url(r'^addLanguage/', views.addLanguage, name='addLanguage'),
	url(r'^editLanguage/', views.editLanguage, name='editLanguage'),
	url(r'^deleteLanguage/', views.deleteLanguage, name='deleteLanguage'),

	url(r'^searchInfoUser/', views.searchInfoUser, name='searchInfoUser'),
	url(r'^addUserRecruiter/', views.addUserRecruiter, name='addUserRecruiter'),
	url(r'^editInfoRecruiter/', views.editInfoRecruiter, name='editInfoRecruiter'),

	url(r'^addNewJobOffer/', views.addNewJobOffer, name='addNewJobOffer'),
	url(r'^editJobOffer/', views.editJobOffer, name='editJobOffer'),
	url(r'^askClasifier/', views.askClasifier, name='askClasifier'),

	url(r'^getCVRanking/', views.getCVRanking, name='getCVRanking'),
	url(r'^newMail/', views.newMail, name='newMail'),
)