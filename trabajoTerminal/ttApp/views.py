from django.shortcuts import render
from django.core.cache import cache
from django.http import HttpResponse
import unidecode

from django.shortcuts import render_to_response
from django.template import RequestContext
from ttApp.voissEmail.src.voissemail import VoissEmail

# Create your views here.

import logging
import simplejson
import json

import spacy
import re
import PyPDF2
import nltk

nlp = spacy.load('es_core_news_sm')
from  spacy.matcher  import  Matcher            #Para encontrar coincidencias mejor que la tokenizacion
matcher = Matcher(nlp.vocab)
from nltk import SnowballStemmer 
from nltk.tokenize import sent_tokenize
spanishstemmer=SnowballStemmer('spanish')


logger = logging.getLogger(__name__)
VERSION =  "1.0.10"

from datetime import datetime, timedelta

import datetime

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

# Create your views here.

def json_response(func):#{{{#
    """
    A decorator thats takes a view response and turns it
    into json. If a callback is added through GET or POST
    the response is JSONP.
    """
    def decorator(request, *args, **kwargs):
        objects = func(request, *args, **kwargs)
        if isinstance(objects, HttpResponse):
            return objects
        try:
            data = simplejson.dumps(objects)
            if 'callback' in request.REQUEST:
                # a jsonp response!
                data = '%s(%s);' % (request.REQUEST['callback'], data)
                return HttpResponse(data, "text/javascript")
        except:
            data = simplejson.dumps(str(objects))
        return HttpResponse(data, "application/json")
            
    return decorator
#}}}#

def text_lower(cadena):
  minusculas = (cadena.lower())
  minus = nlp(minusculas)
  return minus

def remove_punctuation(text):
  words = [t.orth_ for t in text if not t.is_punct | t.is_stop]
  return words

def dictionary(diccionario):
  words = []
  for line in open(diccionario,'r').readlines(): 
    words.append(line.strip()) 
  return words

def dictionary_clean(lista, dictionary):
  comparacion = [item for item in lista if item in dictionary]
  return comparacion

def json_file(name):
  f = open(name, "r")
  content = f.read()
  jsondecoded = json.loads(content)
  return jsondecoded

def tokenizar(sample):
  words = nltk.word_tokenize(sample)
  return words

def listar_cv(curriculum):
  i=0
  skills = []
  while(i < len(curriculum)):
    i2 = str(i)
    skills.append(curriculum[i][i2])
    i= i+1
  return skills

def getRanking(offer):
  #oferta de ejemplo adquirir de la base de datos
  #document = ('EMPLEO PRESENCIAL PARA CIUDAD OBREGON SONORA, NO SE TOMARAN EN CUENTA CANDIDATOS FUERA DEL AREA. \n\nERUS Eco Tecnologías, empresa reconocida a nivel nacional, dedicados a la venta de productos para el hogar, te invitamos a postularte para tener la oportunidad formar parte de nuestro equipo como DESARROLLADOR/PROGRAMADOR WEB (Solo postulantes de Cd. Obregon, Sonora). \n\nREQUISITOS \n\tEscolaridad: Ing. en Sistemas Computacionales, Lic. en Informática, Técnico Superior Universitario o afín. (Sin carrera, compensar con experiencia). \nProgramador Front-End y Back-End \n\nEXPERIENCIA MÍNIMA DE 1 AÑO \nProgramación PHP \nHTML5 \nCSS3 \nJavascript (jQuery o similar) \nManejo de Base de Datos MySQL \n\nAmazon web services y Python \n\nCONOCIMIENTOS BÁSICOS \nDrupal CMS \nSEO \n\nDESEABLE \nLinux (CentOS / Ubuntu) \nDiseño web (Adobe Illustrator) \nWordpress \nNodeJS \n\nProgramador Aplicaciones Móviles (Híbridas) \n\nEXPERIENCIA MÍNIMA DE 1 AÑO \n-Cordova Framewok \n-HTML5 \n-CSS3 \n-Javascript (jQuery o similar) \nCONOCIMIENTOS BÁSICOS \n-Programación PHP \n-Manejo de Base de Datos MySQL \nDESEABLE \n-Desarrollo de Android Nativo \n-Desarrollo de iOS Nativo (Swift) \n\nOFRECEMOS: \n\t· Home office disponible en base a resultados. \n\t· Excelente ambiente laboral y oportunidades únicas de aprendizaje. \n\t· Oportunidad de crecimiento profesional. \n\t· Sueldo base según aptitudes y experiencia. \n\t· Bonos por desempeño. \n\t· Prestaciones de Ley. \n\t· Horario: Lunes a Viernes de 9:00 a 18:00 horas / Sábados 9:00 a 14:00 horas \n\nFecha de inicio prevista: 02/11/2020 \n\nTipo de puesto: Tiempo completo, Indefinido \n\nSalario: $8,000.00 - $10,000.00 al mes \n\nHorario: \n\nTurno de 8 horas \n\tTurno matutino \n\nExperiencia:  \n\n\tHTML5: 1 año (Requisito mínimo) \n\tProgramacion PHP: 1 año (Requisito mínimo) \n\tJavascript: 1 año (Requisito mínimo) \n\tManejo de Base de datos MySQL : 1 año (Requisito mínimo) \n\tCSS3: 1 año (Requisito mínimo) \nInglés intermedio \n\nDeberes laborales: \n\n\tCiudad Obregón, Son.: A menos de 5 kilómetros (Requisito mínimo) \n\nTrabajar desde casa: \n\n\tTemporalmente debido al COVID-19')

  oferta = text_lower(offer)                           #Todo a minusculas
  oferta_token = remove_punctuation(oferta)               #Quitar signos de puntuacion

  diccionario = dictionary('./media/files/diccionario.txt')             #Extraemos las palabras mas comunes de las ofertas de un txt

  oferta_reducida = dictionary_clean(oferta_token, diccionario)     #Creamos una lista con las palabras relevantes
  oferta_limpia = list(set(oferta_reducida))              #Convertimos en una lista

  curriculum = json_file("./media/files/prueba.json")                   #Extraemos el json
  cv_skills = listar_cv(curriculum.get("infoCV"))         #Creamos una lista con las habilidades del postulante
  values = ','.join([str(i) for i in cv_skills])          #Convertimos a una cadena
  cv = text_lower(values)                                 #Convertimos a minusculas
  cv = remove_punctuation(cv)                             #tokenizar y eliminar puntuacion 
  cv_reducido = dictionary_clean(cv, oferta_limpia)       #Matching entre la lista de oferta y cv
  porcentaje = len(cv_reducido)*(100)/len(oferta_limpia)  
  porcentaje = round(porcentaje, 2)
  print("Puntaje: ",porcentaje, "%")

  return porcentaje


@json_response
def loginUser(request):#{{{#
  resultJSON = {}
  logger.info('')
  logger.info('')
  if not cache.get('current_transaction'):
    cache.set('current_transaction',0)

  cache.incr('current_transaction')
  currentTransaction = str(cache.get('current_transaction'))
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'START loginUser')
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('LOG_ID<' + currentTransaction + '> '+'New Login Request ' + VERSION)
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('')
  logger.info('LOG_ID<' + currentTransaction + '> '+'EMAIL           : [' + request.GET['email'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'PASS            : [' + request.GET['password'] + ']')

  try:
    user = CVUser.objects.get(cvMail=request.GET['email'], cvPassAccess=request.GET['password'])
    logger.info('USER FOUND ON SYSTEM')

    resultJSON['userKind'] = str(user.cvKind)
    resultJSON['infoUser'] = getUserInfo(user.cvUserId)
    if user.cvKind == 'POSTULANTE':
      resultJSON['infoUserCV']   = getUserCV(user)
      resultJSON['infoJobOffer'] = getJobOffers()
      resultJSON['JobPostulant'] = getJobPostulant(user)
    else:
      IsRecruiter = CVAdminUser.objects.filter(cvUserId=user.cvUserId)[0]
      if IsRecruiter.cvIsRecruiter == False:
        resultJSON['isAdmin'] = 'YES'
        resultJSON['allUsersRecruiter'] = getRecruiterInfo(IsRecruiter.cvCompanyId.cvCompanyId)
        resultJSON['allJobOffers'] = getAdminJobOffers(IsRecruiter.cvCompanyId.cvCompanyId)
      else:
        resultJSON['isAdmin'] = 'NO'
        resultJSON['recruiterJobOffers'] = getRecruiterJobOffers(user.cvUserId)

    resultJSON['Status'] = 'OK'

  except CVUser.DoesNotExist:
    logger.info('The user with the email: ' + str(request.GET['email']) + 'Does not exist')
    resultJSON['Status'] = 'NO_USER'

  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+ str(resultJSON))
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'END loginUser')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('')
  logger.info('')

  return resultJSON
#}}}#


@json_response
def RegisterUser(request):#{{{#

  resultJSON = {}
  logger.info('')
  logger.info('')
  if not cache.get('current_transaction'):
    cache.set('current_transaction',0)

  cache.incr('current_transaction')
  currentTransaction = str(cache.get('current_transaction'))
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'START RegisterUser')
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('LOG_ID<' + currentTransaction + '> '+'New RegisterUser Request ' + VERSION)
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('')
  logger.info('LOG_ID<' + currentTransaction + '> '+'NAME            : [' + request.GET['name'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'EMAIL           : [' + request.GET['email'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'USERNAME        : [' + request.GET['username'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'PASSWORD        : [' + request.GET['password'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'KIND            : [' + request.GET['userKind'] + ']')

  try:
    users = CVUser.objects.get(cvMail=request.GET['email'])
    logger.error('The user with the email: '+ str(request.GET['email']) + 'is already exist')
    resultJSON['Status'] = 'ALREADY_EXIST'
    return resultJSON

  except CVUser.DoesNotExist:
    newUser = CVUser(cvActive=True,
             cvKind=request.GET['userKind'],
             cvName=request.GET['name'],
             cvMail=request.GET['email'],
             cvUserAccess=request.GET['username'],
             cvPassAccess=request.GET['password'])

    newUser.save()
    logger.info('The user has been saved with the id: '+ str(newUser.cvUserId))

    if newUser.cvKind == 'POSTULANTE':
      newUserKind = CVUserPostulant()
      newUserKind.cvUserId = newUser
      newUserKind.cvCURP = ''
      newUserKind.cvRFC = ''
      newUserKind.cvNSS = ''

      newUserKind.save()
      logger.info('The user Postulant has been created with the id: '+ str(newUserKind))

      newUserCV = CVCurriculumVitae()
      newUserCV.cvUserPostulantId = newUserKind
      newUserCV.cvProfessionalObj = ''
      newUserCV.cvOtherInfo = ''
      newUserCV.save()
      logger.info('The Postulant CV has been created with the id: '+ str(newUserCV))

    else:
      newUserKind = CVAdminUser()
      newUserKind.cvUserId = newUser
      newUserKind.cvJobTittle = ''
      newUserKind.cvIsRecruiter = False
      newUserKind.save()
      logger.info('The user Admin has been created with the id: '+ str(newUserKind))

    resultJSON['Status'] = 'OK'

  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+ str(resultJSON))
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'END RegisterUser')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('')
  logger.info('')

  return resultJSON
#}}}#

def getUserInfo(userId):

  try:
    userInfoDict = []
    currentInfo = {}
    userInfo = CVUser.objects.get(cvUserId=userId)

    currentInfo['cvUserId']       = str(userInfo.cvUserId)
    currentInfo['cvActive']       = str(userInfo.cvActive)
    currentInfo['cvKind']         = str(userInfo.cvKind)
    currentInfo['cvName']         = str(userInfo.cvName)
    currentInfo['cvAge']          = str(userInfo.cvAge)
    currentInfo['cvMail']         = str(userInfo.cvMail)
    currentInfo['cvPhone']        = str(userInfo.cvPhone)
    currentInfo['cvMobilePhone']  = str(userInfo.cvMobilePhone)
    currentInfo['cvUserAccess']   = str(userInfo.cvUserAccess)
    currentInfo['cvPassAccess']   = str(userInfo.cvPassAccess)
    currentInfo['cvAddress']      = str(userInfo.cvAddress)

    if userInfo.cvKind == 'POSTULANTE':
      infoPostulant = CVUserPostulant.objects.filter(cvUserId=userInfo)
      print(infoPostulant)
      if infoPostulant:
        currentInfo['infoUser']  = 'YES'
        currentInfo['cvUserPostulantId']  = str(infoPostulant[0].cvUserPostulantId)
        currentInfo['cvCURP']             = str(infoPostulant[0].cvCURP)
        currentInfo['cvRFC']              = str(infoPostulant[0].cvRFC)
        currentInfo['cvNSS']              = str(infoPostulant[0].cvNSS)
      else:
        currentInfo['infoUser']  = 'NO'
    else:
      infoAdmin = CVAdminUser.objects.filter(cvUserId=userInfo)
      if infoAdmin:
        currentInfo['infoUser']  = 'YES'
        currentInfo['cvUserAdminId']  = str(infoAdmin[0].cvUserAdminId)
        currentInfo['cvCompanyId']    = str(infoAdmin[0].cvCompanyId)
        currentInfo['cvJobTittle']    = str(infoAdmin[0].cvJobTittle)
        currentInfo['cvIsRecruiter']  = str(infoAdmin[0].cvIsRecruiter)
      else:
        currentInfo['infoUser']  = 'NO'

    userInfoDict.append(currentInfo)
    logger.info('Se guardó correctamente la información del usuario')
    return userInfoDict

  except CVUser.DoesNotExist:
    logger.error('No se encontró información del usuario')
    return userInfoDict

def getUserCV(userId):

  try:
    userCVDict = []
    currentInfo = {}
    userPostulant = CVUserPostulant.objects.get(cvUserId=userId)
    userCV = CVCurriculumVitae.objects.get(cvUserPostulantId=userPostulant)

    currentInfo['cvCVId']              = str(userCV.cvCVId)
    currentInfo['cvUserPostulantId']   = str(userCV.cvUserPostulantId)
    currentInfo['cvProfessionalObj']   = str(userCV.cvProfessionalObj)
    currentInfo['cvOtherInfo']         = str(userCV.cvOtherInfo)

    academicExperience = CVAcademicExperience.objects.filter(cvCVId=userCV)
    academicExpDict = []
    if academicExperience:
      for currentObject in academicExperience:
        currentAcademic = {}
        currentAcademic['cvAcademicExpId']  = str(currentObject.cvAcademicExpId)
        currentAcademic['cvCVId']           = str(currentObject.cvCVId)
        currentAcademic['cvLevel']          = str(currentObject.cvLevel)
        currentAcademic['cvInstitute']      = str(currentObject.cvInstitute)
        currentAcademic['cvDegree']         = str(currentObject.cvDegree)
        currentAcademic['cvInitDate']       = str(currentObject.cvInitDate).split(' ')[0]
        currentAcademic['cvEndDate']        = str(currentObject.cvEndDate).split(' ')[0]
        currentAcademic['cvIsActive']       = str(currentObject.cvIsActive)

        academicExpDict.append(currentAcademic)
      currentInfo['academicExperience'] = academicExpDict
    else:
      currentInfo['academicExperience'] = ''

    workExperience = CVWorkExperience.objects.filter(cvCVId=userCV)
    workExpDict = []
    if workExperience:
      for currentObject in workExperience:
        currentWork = {}
        currentWork['cvworkExpId']    = str(currentObject.cvworkExpId)
        currentWork['cvCVId']         = str(currentObject.cvCVId)
        currentWork['cvJobTittle']    = str(currentObject.cvJobTittle)
        currentWork['cvCompanyName']  = str(currentObject.cvCompanyName)
        currentWork['cvActivities']   = str(currentObject.cvActivities)
        currentWork['cvInitDate']     = str(currentObject.cvInitDate).split(' ')[0]
        currentWork['cvEndDate']      = str(currentObject.cvEndDate).split(' ')[0]
        currentWork['cvIsActive']     = str(currentObject.cvIsActive)

        workExpDict.append(currentWork)
      currentInfo['workExperience'] = workExpDict
    else:
      currentInfo['workExperience'] = ''

    abilities = CVAbilities.objects.filter(cvCVId=userCV)
    abilitiesDict = []
    if abilities:
      for currentObject in abilities:
        currentAbilities = {}
        currentAbilities['cvAbilitiesId']  = str(currentObject.cvAbilitiesId)
        currentAbilities['cvCVId']         = str(currentObject.cvCVId)
        currentAbilities['cvAbility']      = str(currentObject.cvAbility)

        abilitiesDict.append(currentAbilities)
      currentInfo['abilities'] = abilitiesDict
    else:
      currentInfo['abilities'] = ''

    tools = CVTools.objects.filter(cvCVId=userCV)
    toolsDict = []
    if tools:
      for currentObject in tools:
        currentTools = {}
        currentTools['cvToolsId']  = str(currentObject.cvToolsId)
        currentTools['cvCVId']     = str(currentObject.cvCVId)
        currentTools['cvtool']     = str(currentObject.cvtool)

        toolsDict.append(currentTools)
      currentInfo['tools'] = toolsDict
    else:
      currentInfo['tools'] = ''

    languages = CVLanguages.objects.filter(cvCVId=userCV)
    languagesDict = []
    if languages:
      for currentObject in languages:
        currentLanguages = {}
        currentLanguages['cvLanguagesId']  = str(currentObject.cvLanguagesId)
        currentLanguages['cvCVId']         = str(currentObject.cvCVId)
        currentLanguages['cvLanguage']     = str(currentObject.cvLanguage)
        currentLanguages['cvLevel']        = str(currentObject.cvLevel)

        languagesDict.append(currentLanguages)
      currentInfo['languages'] = languagesDict
    else:
      currentInfo['languages'] = ''

    userCVDict.append(currentInfo)
    logger.info('Se guardó correctamente la información del CV')
    return userCVDict

  except CVUserPostulant.DoesNotExist:
    logger.error('No se encontró información del usuario')
    return userCVDict

  except CVCurriculumVitae.DoesNotExist:
    logger.error('No se encontró información del CV')
    return userCVDict

def getJobOffers():

  try:
    JobOfferDict = []
    jobOffers = CVJobOffers.objects.filter(cvIsActive=True).order_by('cvCreationDate')

    if jobOffers:
      for currentData in jobOffers:
        currentInfo = {}
        currentInfo['cvJobOfferId']      = str(currentData.cvJobOfferId)
        currentInfo['cvTittle']          = str(currentData.cvTittle)
        currentInfo['cvUserAdminId']     = str(currentData.cvUserAdminId.cvUserId)
        currentInfo['cvCompanyId']       = str(currentData.cvCompanyId)
        currentInfo['cvCreationDate']    = str(currentData.cvCreationDate).split(' ')[0]
        currentInfo['cvExpirationDate']  = str(currentData.cvExpirationDate).split(' ')[0]
        currentInfo['cvMaxPostulant']    = str(currentData.cvMaxPostulant)
        currentInfo['cvDescription']     = str(currentData.cvDescription)
        currentInfo['cvSalary']          = str(currentData.cvSalary)
        currentInfo['cvIsActive']        = str(currentData.cvIsActive)
        currentInfo['cvAgeOffer']        = str(currentData.cvAgeOffer)
        currentInfo['cvExperiences']     = str(currentData.cvExperiences)
        currentInfo['cvCity']            = str(currentData.cvCity)
        JobOfferDict.append(currentInfo)
    logger.info('Se guardó correctamente la información de las vacantes')
    return JobOfferDict

  except CVJobOffers.DoesNotExist:
    logger.error('No se encontró información de vacantes')
    return JobOfferDict

def getJobPostulant(userId):

  try:
    postulaciones = []
    userPostulant = CVUserPostulant.objects.get(cvUserId=userId)
    offers = CVSorterInfo.objects.filter(cvUserPostulantId=userPostulant)

    if offers:
      for currentData in offers:
        currentObject = {}
        currentObject["cvSorterInfoId"] = str(currentData.cvSorterInfoId)
        currentObject["cvJobOfferId"] = str(currentData.cvJobOfferId)
        currentObject['cvCompanyId'] = str(currentData.cvJobOfferId.cvCompanyId)
        currentObject['cvTittle'] = str(currentData.cvJobOfferId.cvTittle)
        currentObject['cvCity'] = str(currentData.cvJobOfferId.cvCity)
        currentObject['cvSalary'] = str(currentData.cvJobOfferId.cvSalary)

        postulaciones.append(currentObject)
      logger.info('Se guardó correctamente la información de las vacantes')
    
      return postulaciones
    else:
      return 'NO_INFO'

  except CVUserPostulant.DoesNotExist:
    logger.error('No se encontró información del usuario')
    return postulaciones

def getRecruiterInfo(companyId):

  try:
    userInfoDict = []
    company = CVCompany.objects.get(cvCompanyId=companyId)
    recruiters = CVAdminUser.objects.filter(cvCompanyId=company,cvIsRecruiter=True)

    if recruiters:
      for currentData in recruiters:
        currentObject = {}
        currentObject['cvUserAdminId'] = str(currentData.cvUserAdminId)
        currentObject['cvUserId'] = str(currentData.cvUserId)
        currentObject['cvCompanyId'] = str(currentData.cvCompanyId)
        currentObject['cvJobTittle'] = str(currentData.cvJobTittle)
        currentObject['cvIsRecruiter'] = str(currentData.cvIsRecruiter)
        userInfoDict.append(currentObject)

    return userInfoDict

  except CVCompany.DoesNotExist:
    logger.error('No se encontró información de la empresa')
    return userInfoDict

def getAdminJobOffers(companyId):

  try:
    offersInfoDict = []
    company = CVCompany.objects.get(cvCompanyId=companyId)
    jobOfferts = CVJobOffers.objects.filter(cvCompanyId=company).order_by('cvCreationDate')

    if jobOfferts:
      for currentData in jobOfferts:
        currentObject = {}
        currentObject['cvJobOfferId'] = str(currentData.cvJobOfferId)
        currentObject['cvUserAdminId'] = str(currentData.cvUserAdminId.cvUserId)
        currentObject['cvCompanyId'] = str(currentData.cvCompanyId)
        currentObject['cvTittle'] = str(currentData.cvTittle)
        currentObject['cvCreationDate'] = str(currentData.cvCreationDate)
        currentObject['cvExpirationDate'] = str(currentData.cvExpirationDate)
        currentObject['cvAgeOffer'] = str(currentData.cvAgeOffer)
        currentObject['cvExperiences'] = str(currentData.cvExperiences)
        currentObject['cvCity'] = str(currentData.cvCity)
        currentObject['cvMaxPostulant'] = str(currentData.cvMaxPostulant)
        currentObject['cvDescription'] = str(currentData.cvDescription)
        currentObject['cvSalary'] = str(currentData.cvSalary)
        currentObject['cvIsActive'] = str(currentData.cvIsActive)
        offersInfoDict.append(currentObject)
    else: 
      offersInfoDict = 'NO_INFO'

    return offersInfoDict

  except CVCompany.DoesNotExist:
    logger.error('No se encontró información de la empresa')
    return offersInfoDict

def getRecruiterJobOffers(userId):

  try:
    offersInfoDict = []
    user = CVUser.objects.get(cvUserId=userId)
    adminUser = CVAdminUser.objects.get(cvUserId=user)
    jobOfferts = CVJobOffers.objects.filter(cvUserAdminId=adminUser).order_by('cvCreationDate')

    if jobOfferts:
      for currentData in jobOfferts:
        currentObject = {}
        currentObject['cvJobOfferId'] = str(currentData.cvJobOfferId)
        currentObject['cvUserAdminId'] = str(currentData.cvUserAdminId.cvUserId)
        currentObject['cvCompanyId'] = str(currentData.cvCompanyId)
        currentObject['cvTittle'] = str(currentData.cvTittle)
        currentObject['cvCreationDate'] = str(currentData.cvCreationDate)
        currentObject['cvExpirationDate'] = str(currentData.cvExpirationDate)
        currentObject['cvAgeOffer'] = str(currentData.cvAgeOffer)
        currentObject['cvExperiences'] = str(currentData.cvExperiences)
        currentObject['cvCity'] = str(currentData.cvCity)
        currentObject['cvMaxPostulant'] = str(currentData.cvMaxPostulant)
        currentObject['cvDescription'] = str(currentData.cvDescription)
        currentObject['cvSalary'] = str(currentData.cvSalary)
        currentObject['cvIsActive'] = str(currentData.cvIsActive)
        offersInfoDict.append(currentObject)
    else: 
      offersInfoDict = 'NO_INFO'

    return offersInfoDict

  except objects.DoesNotExist:
    logger.error('No se encontró información del usuario')
    return offersInfoDict
  except CVAdminUser.DoesNotExist:
    logger.error('No se encontró información del usaurio')
    return offersInfoDict

@json_response
def addAcademicExperience(request):#{{{#
  resultJSON = {}
  logger.info('')
  logger.info('')
  if not cache.get('current_transaction'):
    cache.set('current_transaction',0)

  cache.incr('current_transaction')
  currentTransaction = str(cache.get('current_transaction'))
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'START addAcademicExperience')
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('LOG_ID<' + currentTransaction + '> '+'New addAcademicExperience Request ' + VERSION)
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID CV           : [' + request.GET['cvID'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID USER         : [' + request.GET['cvUserId'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'LEVEL           : [' + request.GET['cvLevel'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'INSTITUTE       : [' + request.GET['cvInstitute'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'DEGREE          : [' + request.GET['cvDegree'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'INIT DATE       : [' + request.GET['cvInitDate'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'END DATE        : [' + request.GET['cvEndDate'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'IS ACTIVE       : [' + request.GET['cvIsActive'] + ']')

  try:
    user = CVUser.objects.get(cvUserId=request.GET['cvUserId'])
    currentCV = CVCurriculumVitae.objects.get(cvCVId=request.GET['cvID'])

    isActive = False
    if request.GET['cvIsActive'] == 'true':
      isActive = True

    newAcademicExp = CVAcademicExperience()
    newAcademicExp.cvCVId       = currentCV
    newAcademicExp.cvLevel      = request.GET['cvLevel']
    newAcademicExp.cvInstitute  = request.GET['cvInstitute']
    newAcademicExp.cvDegree     = request.GET['cvDegree']
    if request.GET['cvInitDate'] != "":
      newAcademicExp.cvInitDate   = request.GET['cvInitDate']
    if request.GET['cvEndDate'] != "":
      newAcademicExp.cvEndDate    = request.GET['cvEndDate']
    newAcademicExp.cvIsActive   = isActive
    newAcademicExp.save()
    logger.info('Se guardo la información de la experiencia academica carrectamente')

    resultJSON['infoUserCV']   = getUserCV(user)
    resultJSON['Status'] = 'OK'

  except CVUser.DoesNotExist:
    logger.info('No se encontró información del usuario')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró información del usuario'

  except CVCurriculumVitae.DoesNotExist:
    logger.info('No se encontró información del CV del usuario')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró información del CV del usuario'

  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+ str(resultJSON))
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'END addAcademicExperience')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('')
  logger.info('')

  return resultJSON
#}}}#

@json_response
def editAcademicExperience(request):#{{{#
  resultJSON = {}
  logger.info('')
  logger.info('')
  if not cache.get('current_transaction'):
    cache.set('current_transaction',0)

  cache.incr('current_transaction')
  currentTransaction = str(cache.get('current_transaction'))
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'START editAcademicExperience')
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('LOG_ID<' + currentTransaction + '> '+'New editAcademicExperience Request ' + VERSION)
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID CV           : [' + request.GET['cvID'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID ACADEMIC EXP : [' + request.GET['cvAcademicExpId'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID USER         : [' + request.GET['cvUserId'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'LEVEL           : [' + request.GET['cvLevel'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'INSTITUTE       : [' + request.GET['cvInstitute'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'DEGREE          : [' + request.GET['cvDegree'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'INIT DATE       : [' + request.GET['cvInitDate'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'END DATE        : [' + request.GET['cvEndDate'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'IS ACTIVE       : [' + request.GET['cvIsActive'] + ']')

  try:
    user = CVUser.objects.get(cvUserId=request.GET['cvUserId'])
    currentCV = CVCurriculumVitae.objects.get(cvCVId=request.GET['cvID'])
    academicExp = CVAcademicExperience.objects.get(cvAcademicExpId=request.GET['cvAcademicExpId'])

    isActive = False
    if request.GET['cvIsActive'] == 'true':
      isActive = True

    academicExp.cvCVId       = currentCV
    academicExp.cvLevel      = request.GET['cvLevel']
    academicExp.cvInstitute  = request.GET['cvInstitute']
    academicExp.cvDegree     = request.GET['cvDegree']
    if request.GET['cvInitDate'] != "":
      academicExp.cvInitDate   = request.GET['cvInitDate']
    if request.GET['cvEndDate'] != "":
      academicExp.cvEndDate    = request.GET['cvEndDate']
    academicExp.cvIsActive   = isActive
    academicExp.save()
    logger.info('Se edito la información de la experiencia academica carrectamente')

    resultJSON['infoUserCV']   = getUserCV(user)
    resultJSON['Status'] = 'OK'

  except CVUser.DoesNotExist:
    logger.info('No se encontró información del usuario')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró información del usuario'

  except CVCurriculumVitae.DoesNotExist:
    logger.info('No se encontró información del CV del usuario')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró información del CV del usuario'

  except CVAcademicExperience.DoesNotExist:
    logger.info('No se encontró información del CV del usuario')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se pudo actualizar la información'

  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+ str(resultJSON))
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'END editAcademicExperience')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('')
  logger.info('')

  return resultJSON
#}}}#

@json_response
def deleteAcademicExperience(request):#{{{#
  resultJSON = {}
  logger.info('')
  logger.info('')
  if not cache.get('current_transaction'):
    cache.set('current_transaction',0)

  cache.incr('current_transaction')
  currentTransaction = str(cache.get('current_transaction'))
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'START deleteAcademicExperience')
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('LOG_ID<' + currentTransaction + '> '+'New deleteAcademicExperience Request ' + VERSION)
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID CV           : [' + request.GET['cvID'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID USER         : [' + request.GET['cvUserId'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID ACADEMIC EXP : [' + request.GET['cvAcademicExpId'] + ']')

  try:
    user = CVUser.objects.get(cvUserId=request.GET['cvUserId'])
    academicExp = CVAcademicExperience.objects.get(cvAcademicExpId=request.GET['cvAcademicExpId'])

    academicExp.delete()
    
    logger.info('Se borro la informacion de la experiencia academica')

    resultJSON['infoUserCV']   = getUserCV(user)
    resultJSON['Status'] = 'OK'

  except CVUser.DoesNotExist:
    logger.info('No se encontró información del usuario')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró información del usuario'

  except CVAcademicExperience.DoesNotExist:
    logger.info('No se encontró información del registro de la experiencia academica')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se pudo borrar la información'

  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+ str(resultJSON))
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'END deleteAcademicExperience')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('')
  logger.info('')

  return resultJSON
#}}}#

@json_response
def addWorkExperience(request):#{{{#
  resultJSON = {}
  logger.info('')
  logger.info('')
  if not cache.get('current_transaction'):
    cache.set('current_transaction',0)

  cache.incr('current_transaction')
  currentTransaction = str(cache.get('current_transaction'))
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'START addWorkExperience')
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('LOG_ID<' + currentTransaction + '> '+'New addWorkExperience Request ' + VERSION)
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID CV           : [' + request.GET['cvID'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID USER         : [' + request.GET['cvUserId'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'LEVEL           : [' + request.GET['cvJobTittle'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'INSTITUTE       : [' + request.GET['cvCompanyName'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'DEGREE          : [' + request.GET['cvActivities'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'INIT DATE       : [' + request.GET['cvInitDate'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'END DATE        : [' + request.GET['cvEndDate'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'IS ACTIVE       : [' + request.GET['cvIsActive'] + ']')

  try:
    user = CVUser.objects.get(cvUserId=request.GET['cvUserId'])
    currentCV = CVCurriculumVitae.objects.get(cvCVId=request.GET['cvID'])

    isActive = False
    if request.GET['cvIsActive'] == 'true':
      isActive = True

    newWorkExp = CVWorkExperience()
    newWorkExp.cvCVId       = currentCV
    newWorkExp.cvJobTittle      = request.GET['cvJobTittle']
    newWorkExp.cvCompanyName  = request.GET['cvCompanyName']
    newWorkExp.cvActivities     = request.GET['cvActivities']
    if request.GET['cvInitDate'] != "":
      newWorkExp.cvInitDate   = request.GET['cvInitDate']
    if request.GET['cvEndDate'] != "":
      newWorkExp.cvEndDate    = request.GET['cvEndDate']
    newWorkExp.cvIsActive   = isActive
    newWorkExp.save()
    logger.info('Se guardo la información de la experiencia laboral carrectamente')

    resultJSON['infoUserCV']   = getUserCV(user)
    resultJSON['Status'] = 'OK'

  except CVUser.DoesNotExist:
    logger.info('No se encontró información del usuario')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró información del usuario'

  except CVCurriculumVitae.DoesNotExist:
    logger.info('No se encontró información del CV del usuario')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró información del CV del usuario'

  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+ str(resultJSON))
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'END addWorkExperience')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('')
  logger.info('')

  return resultJSON
#}}}#

@json_response
def editWorkExperience(request):#{{{#
  resultJSON = {}
  logger.info('')
  logger.info('')
  if not cache.get('current_transaction'):
    cache.set('current_transaction',0)

  cache.incr('current_transaction')
  currentTransaction = str(cache.get('current_transaction'))
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'START editWorkExperience')
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('LOG_ID<' + currentTransaction + '> '+'New editWorkExperience Request ' + VERSION)
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID CV           : [' + request.GET['cvID'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID WORK EXP     : [' + request.GET['cvworkExpId'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID USER         : [' + request.GET['cvUserId'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'JOB TITTLE      : [' + request.GET['cvJobTittle'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'COMPANY         : [' + request.GET['cvCompanyName'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ACTIVITIES      : [' + request.GET['cvActivities'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'INIT DATE       : [' + request.GET['cvInitDate'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'END DATE        : [' + request.GET['cvEndDate'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'IS ACTIVE       : [' + request.GET['cvIsActive'] + ']')

  try:
    user = CVUser.objects.get(cvUserId=request.GET['cvUserId'])
    currentCV = CVCurriculumVitae.objects.get(cvCVId=request.GET['cvID'])
    workExp = CVWorkExperience.objects.get(cvworkExpId=request.GET['cvworkExpId'])

    isActive = False
    if request.GET['cvIsActive'] == 'true':
      isActive = True

    workExp.cvCVId       = currentCV
    workExp.cvJobTittle      = request.GET['cvJobTittle']
    workExp.cvCompanyName  = request.GET['cvCompanyName']
    workExp.cvActivities     = request.GET['cvActivities']
    if request.GET['cvInitDate'] != "":
      workExp.cvInitDate   = request.GET['cvInitDate']
    if request.GET['cvEndDate'] != "":
      workExp.cvEndDate    = request.GET['cvEndDate']
    workExp.cvIsActive   = isActive
    workExp.save()
    logger.info('Se edito la información de la experiencia laboral carrectamente')

    resultJSON['infoUserCV']   = getUserCV(user)
    resultJSON['Status'] = 'OK'

  except CVUser.DoesNotExist:
    logger.info('No se encontró información del usuario')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró información del usuario'

  except CVCurriculumVitae.DoesNotExist:
    logger.info('No se encontró información del CV del usuario')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró información del CV del usuario'

  except CVWorkExperience.DoesNotExist:
    logger.info('No se encontró información del CV del usuario')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se pudo actualizar la información'

  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+ str(resultJSON))
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'END editWorkExperience')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('')
  logger.info('')

  return resultJSON
#}}}#

@json_response
def deleteWorkExperience(request):#{{{#
  resultJSON = {}
  logger.info('')
  logger.info('')
  if not cache.get('current_transaction'):
    cache.set('current_transaction',0)

  cache.incr('current_transaction')
  currentTransaction = str(cache.get('current_transaction'))
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'START deleteWorkExperience')
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('LOG_ID<' + currentTransaction + '> '+'New deleteWorkExperience Request ' + VERSION)
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID CV           : [' + request.GET['cvID'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID USER         : [' + request.GET['cvUserId'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID WORK EXP     : [' + request.GET['cvworkExpId'] + ']')

  try:
    user = CVUser.objects.get(cvUserId=request.GET['cvUserId'])
    workExp = CVWorkExperience.objects.get(cvworkExpId=request.GET['cvworkExpId'])

    workExp.delete()
    
    logger.info('Se borro la informacion de la experiencia laboral')

    resultJSON['infoUserCV']   = getUserCV(user)
    resultJSON['Status'] = 'OK'

  except CVUser.DoesNotExist:
    logger.info('No se encontró información del usuario')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró información del usuario'

  except CVWorkExperience.DoesNotExist:
    logger.info('No se encontró información del registro de la experiencia laboral')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se pudo borrar la información'

  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+ str(resultJSON))
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'END deleteWorkExperience')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('')
  logger.info('')

  return resultJSON
#}}}#

@json_response
def addNewAbility(request):#{{{#
  resultJSON = {}
  logger.info('')
  logger.info('')
  if not cache.get('current_transaction'):
    cache.set('current_transaction',0)

  cache.incr('current_transaction')
  currentTransaction = str(cache.get('current_transaction'))
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'START addNewAbility')
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('LOG_ID<' + currentTransaction + '> '+'New addNewAbility Request ' + VERSION)
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID CV           : [' + request.GET['cvID'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID USER         : [' + request.GET['cvUserId'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ABILITY         : [' + request.GET['cvAbility'] + ']')

  try:
    user = CVUser.objects.get(cvUserId=request.GET['cvUserId'])
    currentCV = CVCurriculumVitae.objects.get(cvCVId=request.GET['cvID'])

    ability = CVAbilities()
    ability.cvCVId       = currentCV
    ability.cvAbility    = request.GET['cvAbility']
    ability.save()
    logger.info('Se guardo la información habilidad o aptitud carrectamente')

    resultJSON['infoUserCV']   = getUserCV(user)
    resultJSON['Status'] = 'OK'

  except CVUser.DoesNotExist:
    logger.info('No se encontró información del usuario')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró información del usuario'

  except CVCurriculumVitae.DoesNotExist:
    logger.info('No se encontró información del CV del usuario')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró información del CV del usuario'

  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+ str(resultJSON))
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'END addNewAbility')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('')
  logger.info('')

  return resultJSON
#}}}#

@json_response
def editAbility(request):#{{{#
  resultJSON = {}
  logger.info('')
  logger.info('')
  if not cache.get('current_transaction'):
    cache.set('current_transaction',0)

  cache.incr('current_transaction')
  currentTransaction = str(cache.get('current_transaction'))
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'START editAbility')
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('LOG_ID<' + currentTransaction + '> '+'New editAbility Request ' + VERSION)
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID CV           : [' + request.GET['cvID'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID ABILITY      : [' + request.GET['cvAbilitiesId'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID USER         : [' + request.GET['cvUserId'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ABILITY         : [' + request.GET['cvAbility'] + ']')

  try:
    user = CVUser.objects.get(cvUserId=request.GET['cvUserId'])
    currentCV = CVCurriculumVitae.objects.get(cvCVId=request.GET['cvID'])
    ability = CVAbilities.objects.get(cvAbilitiesId=request.GET['cvAbilitiesId'])

    ability.cvCVId     = currentCV
    ability.cvAbility  = request.GET['cvAbility']
    ability.save()
    logger.info('Se edito la información de la habilidad')

    resultJSON['infoUserCV']   = getUserCV(user)
    resultJSON['Status'] = 'OK'

  except CVUser.DoesNotExist:
    logger.info('No se encontró información del usuario')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró información del usuario'

  except CVCurriculumVitae.DoesNotExist:
    logger.info('No se encontró información del CV del usuario')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró información del CV del usuario'

  except CVAbilities.DoesNotExist:
    logger.info('No se encontró información del CV del usuario')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se pudo actualizar la información'

  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+ str(resultJSON))
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'END editAbility')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('')
  logger.info('')

  return resultJSON
#}}}#

@json_response
def deleteAbility(request):#{{{#
  resultJSON = {}
  logger.info('')
  logger.info('')
  if not cache.get('current_transaction'):
    cache.set('current_transaction',0)

  cache.incr('current_transaction')
  currentTransaction = str(cache.get('current_transaction'))
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'START deleteAbility')
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('LOG_ID<' + currentTransaction + '> '+'New deleteAbility Request ' + VERSION)
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID CV           : [' + request.GET['cvID'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID USER         : [' + request.GET['cvUserId'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID ABILITY      : [' + request.GET['cvAbilitiesId'] + ']')

  try:
    user = CVUser.objects.get(cvUserId=request.GET['cvUserId'])
    ability = CVAbilities.objects.get(cvAbilitiesId=request.GET['cvAbilitiesId'])

    ability.delete()
    
    logger.info('Se borro la informacion de la habilidida')

    resultJSON['infoUserCV']   = getUserCV(user)
    resultJSON['Status'] = 'OK'

  except CVUser.DoesNotExist:
    logger.info('No se encontró información del usuario')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró información del usuario'

  except CVAbilities.DoesNotExist:
    logger.info('No se encontró información del registro de la habilidad')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se pudo borrar la información'

  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+ str(resultJSON))
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'END deleteAbility')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('')
  logger.info('')

  return resultJSON
#}}}#

@json_response
def addNewTool(request):#{{{#
  resultJSON = {}
  logger.info('')
  logger.info('')
  if not cache.get('current_transaction'):
    cache.set('current_transaction',0)

  cache.incr('current_transaction')
  currentTransaction = str(cache.get('current_transaction'))
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'START addNewTool')
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('LOG_ID<' + currentTransaction + '> '+'New addNewTool Request ' + VERSION)
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID CV           : [' + request.GET['cvID'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID USER         : [' + request.GET['cvUserId'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'TOOL            : [' + request.GET['cvtool'] + ']')

  try:
    user = CVUser.objects.get(cvUserId=request.GET['cvUserId'])
    currentCV = CVCurriculumVitae.objects.get(cvCVId=request.GET['cvID'])

    newTool = CVTools()
    newTool.cvCVId       = currentCV
    newTool.cvtool    = request.GET['cvtool']
    newTool.save()
    logger.info('Se guardo la información de la herramienta carrectamente')

    resultJSON['infoUserCV']   = getUserCV(user)
    resultJSON['Status'] = 'OK'

  except CVUser.DoesNotExist:
    logger.info('No se encontró información del usuario')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró información del usuario'

  except CVCurriculumVitae.DoesNotExist:
    logger.info('No se encontró información del CV del usuario')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró información del CV del usuario'

  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+ str(resultJSON))
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'END addNewTool')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('')
  logger.info('')

  return resultJSON
#}}}#

@json_response
def editTool(request):#{{{#
  resultJSON = {}
  logger.info('')
  logger.info('')
  if not cache.get('current_transaction'):
    cache.set('current_transaction',0)

  cache.incr('current_transaction')
  currentTransaction = str(cache.get('current_transaction'))
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'START editTool')
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('LOG_ID<' + currentTransaction + '> '+'New editTool Request ' + VERSION)
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID CV           : [' + request.GET['cvID'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID TOOL         : [' + request.GET['cvToolsId'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID USER         : [' + request.GET['cvUserId'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'TOOL            : [' + request.GET['cvtool'] + ']')

  try:
    user = CVUser.objects.get(cvUserId=request.GET['cvUserId'])
    currentCV = CVCurriculumVitae.objects.get(cvCVId=request.GET['cvID'])
    tool = CVTools.objects.get(cvToolsId=request.GET['cvToolsId'])

    tool.cvCVId  = currentCV
    tool.cvtool  = request.GET['cvtool']
    tool.save()
    logger.info('Se edito la información de la herramienta')

    resultJSON['infoUserCV']   = getUserCV(user)
    resultJSON['Status'] = 'OK'

  except CVUser.DoesNotExist:
    logger.info('No se encontró información del usuario')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró información del usuario'

  except CVCurriculumVitae.DoesNotExist:
    logger.info('No se encontró información del CV del usuario')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró información del CV del usuario'

  except CVTools.DoesNotExist:
    logger.info('No se encontró información del CV del usuario')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se pudo actualizar la información'

  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+ str(resultJSON))
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'END editTool')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('')
  logger.info('')

  return resultJSON
#}}}#

@json_response
def deleteTool(request):#{{{#
  resultJSON = {}
  logger.info('')
  logger.info('')
  if not cache.get('current_transaction'):
    cache.set('current_transaction',0)

  cache.incr('current_transaction')
  currentTransaction = str(cache.get('current_transaction'))
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'START deleteTool')
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('LOG_ID<' + currentTransaction + '> '+'New deleteTool Request ' + VERSION)
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID CV           : [' + request.GET['cvID'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID USER         : [' + request.GET['cvUserId'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID TOOL         : [' + request.GET['cvToolsId'] + ']')

  try:
    user = CVUser.objects.get(cvUserId=request.GET['cvUserId'])
    tool = CVTools.objects.get(cvToolsId=request.GET['cvToolsId'])

    tool.delete()
    
    logger.info('Se borro la informacion de la herramienta')

    resultJSON['infoUserCV']   = getUserCV(user)
    resultJSON['Status'] = 'OK'

  except CVUser.DoesNotExist:
    logger.info('No se encontró información del usuario')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró información del usuario'

  except CVTools.DoesNotExist:
    logger.info('No se encontró información del registro de la herramienta')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se pudo borrar la información'

  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+ str(resultJSON))
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'END deleteTool')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('')
  logger.info('')

  return resultJSON
#}}}#

@json_response
def addLanguage(request):#{{{#
  resultJSON = {}
  logger.info('')
  logger.info('')
  if not cache.get('current_transaction'):
    cache.set('current_transaction',0)

  cache.incr('current_transaction')
  currentTransaction = str(cache.get('current_transaction'))
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'START addLanguage')
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('LOG_ID<' + currentTransaction + '> '+'New addLanguage Request ' + VERSION)
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID CV           : [' + request.GET['cvID'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID USER         : [' + request.GET['cvUserId'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'LANGUAGE        : [' + request.GET['cvLanguage'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'LEVEL           : [' + request.GET['cvLevel'] + ']')

  try:
    user = CVUser.objects.get(cvUserId=request.GET['cvUserId'])
    currentCV = CVCurriculumVitae.objects.get(cvCVId=request.GET['cvID'])

    newLanguage = CVLanguages()
    newLanguage.cvCVId     = currentCV
    newLanguage.cvLanguage = request.GET['cvLanguage']
    newLanguage.cvLevel    = request.GET['cvLevel']
    newLanguage.save()
    logger.info('Se guardo la información del idioma correctamente')

    resultJSON['infoUserCV']   = getUserCV(user)
    resultJSON['Status'] = 'OK'

  except CVUser.DoesNotExist:
    logger.info('No se encontró información del usuario')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró información del usuario'

  except CVCurriculumVitae.DoesNotExist:
    logger.info('No se encontró información del CV del usuario')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró información del CV del usuario'

  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+ str(resultJSON))
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'END addLanguage')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('')
  logger.info('')

  return resultJSON
#}}}#

@json_response
def editLanguage(request):#{{{#
  resultJSON = {}
  logger.info('')
  logger.info('')
  if not cache.get('current_transaction'):
    cache.set('current_transaction',0)

  cache.incr('current_transaction')
  currentTransaction = str(cache.get('current_transaction'))
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'START editLanguage')
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('LOG_ID<' + currentTransaction + '> '+'New editLanguage Request ' + VERSION)
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID CV           : [' + request.GET['cvID'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID TOOL         : [' + request.GET['cvLanguagesId'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID LANGUAGE     : [' + request.GET['cvUserId'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'LANGUAGE        : [' + request.GET['cvLanguage'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'LEVEL           : [' + request.GET['cvLevel'] + ']')

  try:
    user = CVUser.objects.get(cvUserId=request.GET['cvUserId'])
    currentCV = CVCurriculumVitae.objects.get(cvCVId=request.GET['cvID'])
    language = CVLanguages.objects.get(cvLanguagesId=request.GET['cvLanguagesId'])

    language.cvCVId     = currentCV
    language.cvLanguage = request.GET['cvLanguage']
    language.cvLevel    = request.GET['cvLevel']
    language.save()
    logger.info('Se edito la información del idioma')

    resultJSON['infoUserCV']   = getUserCV(user)
    resultJSON['Status'] = 'OK'

  except CVUser.DoesNotExist:
    logger.info('No se encontró información del usuario')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró información del usuario'

  except CVCurriculumVitae.DoesNotExist:
    logger.info('No se encontró información del CV del usuario')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró información del CV del usuario'

  except CVLanguages.DoesNotExist:
    logger.info('No se encontró información del CV del usuario')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se pudo actualizar la información'

  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+ str(resultJSON))
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'END editLanguage')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('')
  logger.info('')

  return resultJSON
#}}}#

@json_response
def deleteLanguage(request):#{{{#
  resultJSON = {}
  logger.info('')
  logger.info('')
  if not cache.get('current_transaction'):
    cache.set('current_transaction',0)

  cache.incr('current_transaction')
  currentTransaction = str(cache.get('current_transaction'))
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'START deleteLanguage')
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('LOG_ID<' + currentTransaction + '> '+'New deleteLanguage Request ' + VERSION)
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID CV           : [' + request.GET['cvID'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID USER         : [' + request.GET['cvUserId'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID LANGUAGE     : [' + request.GET['cvLanguagesId'] + ']')

  try:
    user = CVUser.objects.get(cvUserId=request.GET['cvUserId'])
    language = CVLanguages.objects.get(cvLanguagesId=request.GET['cvLanguagesId'])

    language.delete()
    
    logger.info('Se borro la informacion del idioma')

    resultJSON['infoUserCV']   = getUserCV(user)
    resultJSON['Status'] = 'OK'

  except CVUser.DoesNotExist:
    logger.info('No se encontró información del usuario')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró información del usuario'

  except CVLanguages.DoesNotExist:
    logger.info('No se encontró información del registro de la herramienta')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se pudo borrar la información'

  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+ str(resultJSON))
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'END deleteLanguage')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('')
  logger.info('')

  return resultJSON
#}}}#

@json_response
def searchInfoUser(request):#{{{#
  resultJSON = {}
  logger.info('')
  logger.info('')
  if not cache.get('current_transaction'):
    cache.set('current_transaction',0)

  cache.incr('current_transaction')
  currentTransaction = str(cache.get('current_transaction'))
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'START searchInfoUser')
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('LOG_ID<' + currentTransaction + '> '+'New searchInfoUser Request ' + VERSION)
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID CV           : [' + request.GET['cvID'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID USER         : [' + request.GET['cvUserId'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID RECRUITER    : [' + request.GET['cvRecruiterId'] + ']')

  try:
    recruiter = CVAdminUser.objects.get(cvUserAdminId=request.GET['cvRecruiterId'])
    user = CVUser.objects.get(cvUserId=recruiter.cvUserId.cvUserId)

    infoUser = []
    currentInfo = {}

    currentInfo['cvUserAdminId'] = str(recruiter.cvUserAdminId)
    currentInfo['cvCompanyId'] = str(recruiter.cvCompanyId)
    currentInfo['cvJobTittle'] = str(recruiter.cvJobTittle)
    currentInfo['cvIsRecruiter'] = str(recruiter.cvIsRecruiter)

    currentInfo['cvUserId'] = str(user.cvUserId)
    currentInfo['cvActive'] = str(user.cvActive)
    currentInfo['cvKind'] = str(user.cvKind)
    currentInfo['cvName'] = str(user.cvName)
    currentInfo['cvAge'] = str(user.cvAge)
    currentInfo['cvMail'] = str(user.cvMail)
    currentInfo['cvPhone'] = str(user.cvPhone)
    currentInfo['cvMobilePhone'] = str(user.cvMobilePhone)
    currentInfo['cvUserAccess'] = str(user.cvUserAccess)
    currentInfo['cvPassAccess'] = str(user.cvPassAccess)
    currentInfo['cvAddress'] = str(user.cvAddress)

    infoUser.append(currentInfo)

    resultJSON['infoRecruiter'] = infoUser

    resultJSON['Status'] = 'OK'

  except CVUser.DoesNotExist:
    logger.info('No se encontró información del usuario')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró información del usuario'

  except CVAdminUser.DoesNotExist:
    logger.info('No se encontró información del usaurio reclutador')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró la información del usuario'

  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+ str(resultJSON))
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'END searchInfoUser')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('')
  logger.info('')

  return resultJSON
#}}}#

@json_response
def addNewJobOffer(request):#{{{#
  resultJSON = {}
  logger.info('')
  logger.info('')
  if not cache.get('current_transaction'):
    cache.set('current_transaction',0)

  cache.incr('current_transaction')
  currentTransaction = str(cache.get('current_transaction'))
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'START addNewJobOffer')
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('LOG_ID<' + currentTransaction + '> '+'New addNewJobOffer Request ' + VERSION)
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID USER         : [' + request.GET['cvUserId'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID COMPANY      : [' + request.GET['cvCompany'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'TITTLE          : [' + request.GET['cvTittle'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'AGE             : [' + request.GET['cvAgeOffer'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'EXPERINCE       : [' + request.GET['cvExperiences'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'CITY            : [' + request.GET['cvCity'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'MAX POSTULANT   : [' + request.GET['cvMaxPostulant'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'SALARY          : [' + request.GET['cvSalary'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'DESCRIPTION     : [' + request.GET['cvDescription'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'IS ACTIVE       : [' + request.GET['cvIsActive'] + ']')

  try:
    user = CVUser.objects.get(cvUserId=request.GET['cvUserId'])
    adminUser = CVAdminUser.objects.get(cvUserId=user)
    company = CVCompany.objects.get(cvName=request.GET['cvCompany'])

    isActive = False
    if request.GET['cvIsActive'] == 'true':
      isActive = True
    newJobOffer = CVJobOffers()

    newJobOffer.cvUserAdminId = adminUser
    newJobOffer.cvCompanyId = company
    newJobOffer.cvTittle = request.GET['cvTittle']
    newJobOffer.cvAgeOffer = request.GET['cvAgeOffer']
    newJobOffer.cvExperiences = request.GET['cvExperiences']
    newJobOffer.cvCity = request.GET['cvCity']
    newJobOffer.cvMaxPostulant = request.GET['cvMaxPostulant']
    newJobOffer.cvDescription = request.GET['cvDescription']
    newJobOffer.cvSalary = request.GET['cvSalary']
    newJobOffer.cvIsActive = isActive

    newJobOffer.save()

    logger.info('Se agrego la oferta laboral correctamente')


    resultJSON['allJobOffers'] = getAdminJobOffers(company.cvCompanyId)

    resultJSON['Status'] = 'OK'

  except CVUser.DoesNotExist:
    logger.info('No se encontró información del usuario')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró información del usuario'

  except CVAdminUser.DoesNotExist:
    logger.info('No se encontró información del usaurio reclutador')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró la información del usuario'

  except CVCompany.DoesNotExist:
    logger.info('No se encontró información de la empresa')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró la información de la empresa'

  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+ str(resultJSON))
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'END addNewJobOffer')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('')
  logger.info('')

  return resultJSON
#}}}#

@json_response
def editJobOffer(request):#{{{#
  resultJSON = {}
  logger.info('')
  logger.info('')
  if not cache.get('current_transaction'):
    cache.set('current_transaction',0)

  cache.incr('current_transaction')
  currentTransaction = str(cache.get('current_transaction'))
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'START editJobOffer')
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('LOG_ID<' + currentTransaction + '> '+'New editJobOffer Request ' + VERSION)
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID USER         : [' + request.GET['cvUserId'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID COMPANY      : [' + request.GET['cvCompany'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID OFFER        : [' + request.GET['offerId'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'USER JOB OFFER  : [' + request.GET['cvUserAdminId'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'TITTLE          : [' + request.GET['cvTittle'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'AGE             : [' + request.GET['cvAgeOffer'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'EXPERINCE       : [' + request.GET['cvExperiences'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'CITY            : [' + request.GET['cvCity'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'MAX POSTULANT   : [' + request.GET['cvMaxPostulant'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'SALARY          : [' + request.GET['cvSalary'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'DESCRIPTION     : [' + request.GET['cvDescription'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'IS ACTIVE       : [' + request.GET['cvIsActive'] + ']')

  try:
    user = CVUser.objects.get(cvUserId=request.GET['cvUserId'])
    adminUser = CVAdminUser.objects.get(cvUserId=user)
    jobOffer = CVJobOffers.objects.get(cvJobOfferId=request.GET['offerId'])
    company = CVCompany.objects.get(cvName=request.GET['cvCompany'])

    isActive = False
    if request.GET['cvIsActive'] == 'true':
      isActive = True

    #jobOffer.cvUserAdminId = adminUser
    jobOffer.cvTittle = request.GET['cvTittle']
    jobOffer.cvAgeOffer = request.GET['cvAgeOffer']
    jobOffer.cvExperiences = request.GET['cvExperiences']
    jobOffer.cvCity = request.GET['cvCity']
    jobOffer.cvMaxPostulant = request.GET['cvMaxPostulant']
    jobOffer.cvDescription = request.GET['cvDescription']
    jobOffer.cvSalary = request.GET['cvSalary']
    jobOffer.cvIsActive = isActive

    jobOffer.save()

    logger.info('Se actualizo la oferta laboral correctamente')


    resultJSON['allJobOffers'] = getAdminJobOffers(company.cvCompanyId)

    resultJSON['Status'] = 'OK'

  except CVUser.DoesNotExist:
    logger.info('No se encontró información del usuario')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró información del usuario'

  except CVAdminUser.DoesNotExist:
    logger.info('No se encontró información del usaurio reclutador')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró la información del usuario'

  except CVJobOffers.DoesNotExist:
    logger.info('No se encontró información de la oferta laboral')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró la información de la oferta laboral'

  except CVCompany.DoesNotExist:
    logger.info('No se encontró información de la empresa')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró la información de la empresa'

  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+ str(resultJSON))
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'END editJobOffer')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('')
  logger.info('')

  return resultJSON
#}}}#

@json_response
def askClasifier(request):#{{{#
  resultJSON = {}
  logger.info('')
  logger.info('')
  if not cache.get('current_transaction'):
    cache.set('current_transaction',0)

  cache.incr('current_transaction')
  currentTransaction = str(cache.get('current_transaction'))
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'START askClasifier')
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('LOG_ID<' + currentTransaction + '> '+'New askClasifier Request ' + VERSION)
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID JOB OFFER    : [' + request.GET['jobOfferId'] + ']')

  try:
    jobOffer = CVJobOffers.objects.get(cvJobOfferId=request.GET['jobOfferId'])
    clasifier = CVSorterInfo.objects.filter(cvJobOfferId=jobOffer)

    clasifierDict = []

    if clasifier:
      for currentData in clasifier:
        currentObject = {}
        currentObject['cvSorterInfoId']     = str(currentData.cvSorterInfoId)
        currentObject['cvJobOfferId']       = str(currentData.cvJobOfferId)
        currentObject['cvUserPostulantId']  = str(currentData.cvUserPostulantId)
        currentObject['cvUserPostulant']    = str(currentData.cvUserPostulantId.cvUserId)
        currentObject['cvDescription']      = str(currentData.cvDescription)
        currentObject['cvPercentage']       = str(currentData.cvPercentage)

        clasifierDict.append(currentObject)


    resultJSON['clasifierInfo'] = clasifierDict
    resultJSON['Status'] = 'OK'

  except CVJobOffers.DoesNotExist:
    logger.info('No se encontró información de la clasificación')
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró información de la clasificación'

  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+ str(resultJSON))
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'END askClasifier')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('')
  logger.info('')

  return resultJSON
#}}}#

@json_response
def addUserRecruiter(request):#{{{#
  resultJSON = {}
  logger.info('')
  logger.info('')
  if not cache.get('current_transaction'):
    cache.set('current_transaction',0)

  cache.incr('current_transaction')
  currentTransaction = str(cache.get('current_transaction'))
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'START addUserRecruiter')
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('LOG_ID<' + currentTransaction + '> '+'New addUserRecruiter Request ' + VERSION)
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID JOB TITTLE   : [' + request.GET['cvJobTittle'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'NAME            : [' + request.GET['cvName'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'AGE             : [' + request.GET['cvAge'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'EMAIL           : [' + request.GET['cvMail'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'PHONE           : [' + request.GET['cvPhone'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'MOBILE PHONE    : [' + request.GET['cvMobilePhone'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'USER ACCESS     : [' + request.GET['cvUserAccess'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'PASS ACCESS     : [' + request.GET['cvPassAccess'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ADDRESS         : [' + request.GET['cvAddress'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'IS RECRUITER    : [' + request.GET['cvIsRecruiter'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'IS ACTIVE       : [' + request.GET['cvActive'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'COMPANY         : [' + request.GET['cvCompany'] + ']')

  try:
    user = CVUser.objects.get(cvMail=request.GET['cvMail'])
    
    resultJSON['Status'] = 'ALREADY_EXIST'
    resultJSON['Error_Message'] = 'Ya existe un usuario con el correo: '+ str(user.cvMail)

  except CVUser.DoesNotExist:
    try:
      company = CVCompany.objects.get(cvName=request.GET['cvCompany'])

      isActive = False
      if request.GET['cvActive'] == 'true':
        isActive = True

      isRecruiter = False
      if request.GET['cvIsRecruiter'] == 'true':
        isRecruiter = True

      newUser = CVUser()
      newUser.cvActive = isActive
      newUser.cvKind = 'ADMINISTRADOR'
      newUser.cvName = request.GET['cvName'] 
      newUser.cvAge = request.GET['cvAge']
      newUser.cvMail = request.GET['cvMail']
      newUser.cvPhone = request.GET['cvPhone']
      newUser.cvMobilePhone = request.GET['cvMobilePhone']
      newUser.cvUserAccess = request.GET['cvUserAccess']
      newUser.cvPassAccess = request.GET['cvPassAccess']
      newUser.cvAddress = request.GET['cvAddress']

      newUser.save()

      if newUser:
        newRecruiter = CVAdminUser()
        newRecruiter.cvUserId = newUser
        newRecruiter.cvCompanyId = company
        newRecruiter.cvJobTittle = request.GET['cvJobTittle']
        newRecruiter.cvIsRecruiter = isRecruiter

        newRecruiter.save()

        resultJSON['allUsersRecruiter'] = getRecruiterInfo(company.cvCompanyId)
        resultJSON['Status'] = 'OK'
      else:
        resultJSON['Status'] = 'NO'
        resultJSON['Error_Message'] = 'No se pudo guardar el usaurio, intente de nuevo.'
        return resultJSON

    except CVCompany.DoesNotExist:
      logger.info('No se encontró información de la empresa')
      resultJSON['Status'] = 'NO'
      resultJSON['Error_Message'] = 'No se ecnontro la información de la empresa.'

  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+ str(resultJSON))
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'END addUserRecruiter')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('')
  logger.info('')

  return resultJSON
#}}}#

@json_response
def editInfoRecruiter(request):#{{{#
  resultJSON = {}
  logger.info('')
  logger.info('')
  if not cache.get('current_transaction'):
    cache.set('current_transaction',0)

  cache.incr('current_transaction')
  currentTransaction = str(cache.get('current_transaction'))
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'START editInfoRecruiter')
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('LOG_ID<' + currentTransaction + '> '+'New editInfoRecruiter Request ' + VERSION)
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID USER ADMIN   : [' + request.GET['cvUserAdminId'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID USER         : [' + request.GET['cvUserId'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID JOB TITTLE   : [' + request.GET['cvJobTittle'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'NAME            : [' + request.GET['cvName'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'AGE             : [' + request.GET['cvAge'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'EMAIL           : [' + request.GET['cvMail'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'PHONE           : [' + request.GET['cvPhone'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'MOBILE PHONE    : [' + request.GET['cvMobilePhone'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'USER ACCESS     : [' + request.GET['cvUserAccess'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'PASS ACCESS     : [' + request.GET['cvPassAccess'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ADDRESS         : [' + request.GET['cvAddress'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'IS RECRUITER    : [' + request.GET['cvIsRecruiter'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'IS ACTIVE       : [' + request.GET['cvActive'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'COMPANY         : [' + request.GET['cvCompany'] + ']')

  try:
    user = CVUser.objects.get(cvUserId=request.GET['cvUserId'])
    modifiedUser = CVUser.objects.filter(cvMail=request.GET['cvMail'])

    if modifiedUser:
      if not user.cvUserId == modifiedUser[0].cvUserId:
        resultJSON['Status'] = 'ALREADY_EXIST'
        resultJSON['Error_Message'] = 'Ya existe un usuario con el correo: '+ str(user.cvMail)
        return resultJSON

    company = CVCompany.objects.get(cvName=request.GET['cvCompany'])
    userAdmin = CVAdminUser.objects.get(cvUserAdminId=request.GET['cvUserAdminId'])

    isActive = False
    if request.GET['cvActive'] == 'true':
      isActive = True

    isRecruiter = False
    if request.GET['cvIsRecruiter'] == 'true':
      isRecruiter = True

    user.cvActive = isActive
    user.cvName = request.GET['cvName'] 
    user.cvAge = request.GET['cvAge']
    user.cvMail = request.GET['cvMail']
    user.cvPhone = request.GET['cvPhone']
    user.cvMobilePhone = request.GET['cvMobilePhone']
    user.cvUserAccess = request.GET['cvUserAccess']
    user.cvPassAccess = request.GET['cvPassAccess']
    user.cvAddress = request.GET['cvAddress']

    user.save()

    if user:
      userAdmin.cvJobTittle = request.GET['cvJobTittle']
      userAdmin.cvIsRecruiter = isRecruiter

      userAdmin.save()

      resultJSON['allUsersRecruiter'] = getRecruiterInfo(company.cvCompanyId)
      resultJSON['Status'] = 'OK'
    else:
      resultJSON['Status'] = 'NO'
      resultJSON['Error_Message'] = 'No se pudo actualizar el usaurio, intente de nuevo.'
      return resultJSON

  except CVUser.DoesNotExist:
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró información del usuario'
  except CVAdminUser.DoesNotExist:
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró información del usuario'
  except CVCompany.DoesNotExist:
    resultJSON['Status'] = 'NO'
    resultJSON['Error_Message'] = 'No se encontró información de la empresa'

  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+ str(resultJSON))
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'END editInfoRecruiter')
  logger.info('LOG_ID<' + str(currentTransaction) + '> '+'******************************')
  logger.info('')
  logger.info('')

  return resultJSON
#}}}#

@json_response
def getCVRanking(request):#{{{#
  resultJSON = {}
  logger.info('')
  logger.info('')
  if not cache.get('current_transaction'):
    cache.set('current_transaction',0)

  cache.incr('current_transaction')
  currentTransaction = str(cache.get('current_transaction'))
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'START getCVRanking')
  logger.info('LOG_ID<' + currentTransaction + '> '+'******************************')
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('LOG_ID<' + currentTransaction + '> '+'New getCVRanking Request ' + VERSION)
  logger.info('LOG_ID<' + currentTransaction + '> '+'------------------------------------------------------------')
  logger.info('')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID USER         : [' + request.GET['cvUserId'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID USER         : [' + request.GET['cvUserPostulantId'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID CV           : [' + request.GET['cvID'] + ']')
  logger.info('LOG_ID<' + currentTransaction + '> '+'ID OFFER        : [' + request.GET['offerId'] + ']')

  try:
    userCVDict = []
    currentInfo = {}
    userPostulant = CVUserPostulant.objects.get(cvUserPostulantId=request.GET['cvUserPostulantId'])
    userCV = CVCurriculumVitae.objects.get(cvUserPostulantId=userPostulant)
    jobOffer = CVJobOffers.objects.get(cvJobOfferId=request.GET['offerId'])

    checkUser = CVSorterInfo.objects.filter(cvUserPostulantId=userPostulant,cvJobOfferId=jobOffer)

    if checkUser:
      resultJSON['Status'] = 'ALREADY_EXIST'
      resultJSON['Error_Message'] = "Ya te has postulado a esta vacante."
      return resultJSON

    academicExperience = CVAcademicExperience.objects.filter(cvCVId=userCV)
    academicExpDict = []
    i = 0
    if academicExperience:
      for currentObject in academicExperience:
        currentAcademic = {}
        currentAcademic[i]         = str(currentObject.cvDegree)

        userCVDict.append(currentAcademic)
        i = i + 1

    workExperience = CVWorkExperience.objects.filter(cvCVId=userCV)
    workExpDict = []
    if workExperience:
      for currentObject in workExperience:
        currentWork = {}
        currentWork[i]    = str(currentObject.cvJobTittle)

        userCVDict.append(currentWork)
        i = i + 1

    abilities = CVAbilities.objects.filter(cvCVId=userCV)
    abilitiesDict = []
    if abilities:
      for currentObject in abilities:
        currentAbilities = {}
        currentAbilities[i]      = str(currentObject.cvAbility)

        userCVDict.append(currentAbilities)
        i = i + 1

    tools = CVTools.objects.filter(cvCVId=userCV)
    toolsDict = []
    if tools:
      for currentObject in tools:
        currentTools = {}
        currentTools[i]     = str(currentObject.cvtool)

        userCVDict.append(currentTools)
        i = i + 1

    languages = CVLanguages.objects.filter(cvCVId=userCV)
    languagesDict = []
    if languages:
      for currentObject in languages:
        currentLanguages = {}
        currentLanguages[i]     = str(currentObject.cvLanguage) + ' ' + str(currentObject.cvLevel)

        userCVDict.append(currentLanguages)
        i = i + 1

    resultJSON["infoCV"] = userCVDict
    archivo =open ("./media/files/prueba.json","w+") 
    archivo.write(json.dumps(resultJSON, ensure_ascii=False))
    archivo.close()
    offer = getOffer(jobOffer.cvJobOfferId)
    if offer != 'NO':
      ranking = getRanking(offer)

      newRanking = CVSorterInfo()
      newRanking.cvJobOfferId = jobOffer
      newRanking.cvUserPostulantId = userPostulant
      newRanking.cvDescription = str('Se ha postulado a la vacante')
      newRanking.cvPercentage = ranking
      newRanking.save()

      resultJSON['Status'] = 'OK'
      resultJSON['flag'] = str(request.GET['flag'])
      resultJSON['JobPostulant'] = getJobPostulant(request.GET['cvUserId'])
    else:
      resultJSON['Status'] = 'NO'
      resultJSON['Error_Message'] = 'Hubo un problema con la oferta laboral.'

    #logger.info(resultJSON)
    #return resultJSON

  except CVUserPostulant.DoesNotExist:
    logger.error('No se encontró información del usuario')
    return 'NO'

  except CVCurriculumVitae.DoesNotExist:
    logger.error('No se encontró información del CV')
    return 'NO'

  logger.info('******************************')
  logger.info(str(resultJSON))
  logger.info('END getCVRanking')
  logger.info('******************************')
  logger.info('')
  logger.info('')

  return resultJSON

def getOffer(cvOfferId):

  try:
    JobOfferDict = []
    jobOffers = CVJobOffers.objects.get(cvJobOfferId=cvOfferId)

    return str(jobOffers.cvDescription) + str(jobOffers.cvCity) + str(jobOffers.cvTittle)
    
  except CVJobOffers.DoesNotExist:
    logger.error('No se encontró información de vacantes')
    return 'NO'

@json_response
def newMail(request):#{{{#

  resultJSON = {}
  logger.info('')
  logger.info('')
   
  logger.info('LOG_ID<*> '+'******************************')
  logger.info('LOG_ID<*> '+'START newMail')
  logger.info('LOG_ID<*> '+'******************************')
  logger.info('LOG_ID<*> '+'------------------------------------------------------------')
  logger.info('LOG_ID<*> '+'New newMail Request ')
  logger.info('LOG_ID<*> '+'------------------------------------------------------------')
  logger.info('LOG_ID<*>'+'ID USER         : [' + request.GET['cvUserId'] + ']')
  logger.info('LOG_ID<*>'+'ID OFFER        : [' + request.GET['cvJobOfferId'] + ']')
  logger.info('')
  logger.info('')

  try:
    user = CVUserPostulant.objects.get(cvUserPostulantId = request.GET['cvUserId'])
      
    sendMail(request.GET['cvJobOfferId'],user.cvUserId.cvMail,"Has sido seleccionado")
    resultJSON['Status'] = "OK"

  except CVUser.DoesNotExist:
    logger.info('User does not exist')
    resultJSON['Status'] = 'NO'
    return resultJSON  

  logger.info('******************************')
  logger.info(str(resultJSON))
  logger.info('END newMail')
  logger.info('******************************')
  logger.info('')
  logger.info('')

  return resultJSON

def sendMail(offer,mailToSend, title):
  messageHtml=''
  with open('email.htm', 'r',encoding="utf8") as myfile:
    print("fileOPENED")
    messageHtml= myfile.read().replace('\n', '')
  print("fileOPENED")
  messageHtml= replaceInfo(messageHtml,offer)
  logger.info(' (0)Generating mail  ...: ' + mailToSend )
  email = VoissEmail()
  #currentBusiness = VoissBusiness.objects.all()[0]
  #copyToSend = currentBusiness.vMailsToSent

  logger.info(' Message : ' +str(messageHtml) )
  messageHtml = unidecode.unidecode(messageHtml)

  response = email.sendTicket(
   title,
   mailToSend,
   'gponceg19@gmail.com',
   messageHtml)
  logger.info( 'Mail has been sent :'  + str(response))
  return bool(response)
#}}}#

def replaceInfo(mString,offer):#{{{#
   try:
     offer = CVJobOffers.objects.get(cvJobOfferId=offer)
   except Exception as e:
     print("Cant found transaction")
     print(e)

   mainString= mString
   dateMail = datetime.datetime.now()

   mainString =mainString.replace('SEND_DATE', str(dateMail).split(' ')[0]) 
   mainString =mainString.replace('NAME_COMPANY'  , str(offer.cvCompanyId)) 
   mainString =mainString.replace('JOB_OFFER' , str(offer.cvTittle)) 


   return mainString
#}}}#