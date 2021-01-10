from email import encoders
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.encoders import encode_base64
from email.mime.base import MIMEBase
from smtplib import SMTP
#TODO get the Configuration functionallity
from ttApp.voissEmail.src.util.configuration.configuration import Configuration
import logging
logger = logging.getLogger(__name__)


class VoissEmail(object):

    def __init__(self):
        self.__smtp = Configuration.section("smtp")
        self.__msg = None

    def send(self, subject, to, copy,body, attach, attach2):
        try:

            print(self.__smtp["host"])
            print(self.__smtp["port"])
            print(self.__smtp["from"])
            print(self.__smtp["password"])
            sender = SMTP(self.__smtp["host"], int(self.__smtp["port"]))
            sender.ehlo()
            sender.starttls()
            sender.login(self.__smtp["from"], self.__smtp["password"])
            #print("Paso")
            self.__message(subject, to,copy, body, attach, attach2)
            listOfMails=[]
            listTo = to.split(',')
            listCopy = copy.split(',')
            for item in listTo:
                listOfMails.append(item)
            for item in listCopy:
                listOfMails.append(item)
            print(listOfMails)
            sender.sendmail(self.__smtp['from'], listOfMails, self.__msg.as_string())
        except Exception as e:
            print(str(e))
            return False
        return True
 
    def sendTicket(self, subject, to, copy,body):
        try:

            print(self.__smtp["host"])
            print(self.__smtp["port"])
            print(self.__smtp["from"])
            print(self.__smtp["password"])
            sender = SMTP(self.__smtp["host"], int(self.__smtp["port"]))
            sender.ehlo()
            sender.starttls()
            sender.login(self.__smtp["from"], self.__smtp["password"])
            #print("Paso")
            self.__message2(subject, to,copy, body)
            listOfMails=[]
            listTo = to.split(',')
            listCopy = copy.split(',')
            for item in listTo:
                listOfMails.append(item)
            for item in listCopy:
                listOfMails.append(item)
            print(listOfMails)
            sender.sendmail(self.__smtp['from'], listOfMails, self.__msg.as_string())
        except Exception as e:
            print(str(e))
            return False
        return True

    def __message(self, subject, to, copy,body, attach, attach2):
        self.__msg = MIMEMultipart()
        listTo = to.split(',')
        listCopy = copy.split(',')        
        self.__msg["Subject"] = subject
        self.__msg["From"] = self.__smtp["from"]
        self.__msg["To"] = ", ".join(listTo)
        self.__msg["Cc"] = ", ".join(listCopy)
        self.__msg.attach(MIMEText(self.__html(body), "html"))
        #print("Paso")
        self.__msg.attach(self.__attach(attach))
        self.__msg.attach(self.__attach(attach2))
        #print("Paso")
        return

    def __message2(self, subject, to, copy,body):
        self.__msg = MIMEMultipart()
        listTo = to.split(',')
        listCopy = copy.split(',')        
        self.__msg["Subject"] = subject
        self.__msg["From"] = self.__smtp["from"]
        self.__msg["To"] = ", ".join(listTo)
        self.__msg["Cc"] = ", ".join(listCopy)
        self.__msg.attach(MIMEText(self.__html(body), "html"))
        #print("Paso")
        # self.__msg.attach(self.__attach(attach))
        # self.__msg.attach(self.__attach(attach2))
        #print("Paso")
        return

    def __html(self, body):
        html = "<html><head><title></title></head><body><h6 align=center></h6>\
            <h3 align=center>%s</h3><h6 align=center></h6></body>\
            </html>" % body
        return html

    def __attach(self, filename):
        print("Entro con file: " + str(filename))
        fileattach = MIMEBase("application", "octet-stream")
        fileattach.set_payload(open(filename,'rb').read())
        #print("*-****-**-*-*-*- PASO POR AQUI *-****-**-*-*-*-")
        encoders.encode_base64(fileattach)
        attachment = "attachment;filename={0}".format(filename.split('/')[-1])
        fileattach.add_header("Content-Disposition", attachment)
        return fileattach


