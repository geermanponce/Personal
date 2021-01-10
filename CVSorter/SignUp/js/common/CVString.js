
var VOISS_DIALOG_ERROR = 'Error'
var VOISS_DIALOG_INFO  = 'Info'
var VOISS_DIALOG_WARN  = 'Warning'
var VOISS_DIALOG_FATAL = 'Fatal'

var TICKET_BAR = 1;
var TICKET_KITCHEN = 2;

function CVString()/*{{{*/
{

   //DIRECTORIES names
   //this.defaultHtmlPath  ="voissHtml/";
   //this.defaultWidgetPath="voissWidgets/";
   //this.countKeys=0;

   //HTML files
   /*{{{*/
   //this.HTML_MAIN_DASHBOARD     = this.defaultHtmlPath + "mainContent.html"; 
   //this.HTML_MAIN_WIDGET        = this.defaultHtmlPath + "mainWidgetContent.html"; 
   //this.HTML_DEFAULT_WIDGET     = this.defaultHtmlPath + "defaultWidgetContent.html"; 
   //this.HTML_SYSTEM             = 'system.html';
   /*}}}*/

   //DIV names
   /*{{{*/
   //this.DIV_MAIN_CONTENT = "voissMainContent"; 
   //this.DIV_MAIN_TITLE   = "voissMainTitle"; 
   /*}}}*/


   //Server parameters Prod
   //this.webHost              = 'revepos.com'     //The IP or domain where the web app will live 
   //this.serviceHost          = 'jaiboli.hopto.org' //The IP or domain where the django service will live
   

   //Server parameters Test
 
   //Production Cloud Testing
   this.webHost                = '127.0.0.1' //The IP or domain where the web app will live 
   //this.serviceHost            = 'azucaragave.hopto.org' //The IP or domain where the django service will live
   this.serviceHost            = '127.0.0.1' //The IP or domain where the django service will live
   
   
   //Soad config
   //this.webHost                = '0.0.0.0' //The IP or domain where the web app will live 
   //this.serviceHost            = '0.0.0.0' //The IP or domain where the django service will live

   this.servicePort          = '9998'
   // this.servicePort          = '1985'
   this.webVersion           = '1.1.11'
   this.basicVersion         = '0';

   //Don't modify at least you know what you're doing
   
   //this.projectURL         = 'http://' + this.webHost + '/phonegap/azucaragave/'
   //this.projectURL           = 'http://' + this.webHost + '/azucaragave/'
   //this.projectURL           = 'http://' + this.webHost + '/azucaragavedemo/'
   //this.homeURL              = this.projectURL + '/voissHtml/system.html'
   this.htmlContent          = "";
   
   }
/*}}}*/

var cvString= new CVString();

