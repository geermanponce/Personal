
function CVString()/*{{{*/
{

   //Production Cloud Testing
   this.webHost                = '127.0.0.1' //The IP or domain where the web app will live 
   this.serviceHost            = '127.0.0.1' //The IP or domain where the django service will live
   

   this.servicePort          = '9998'
   // this.servicePort          = '1985'
   this.webVersion           = '1.1.11'
   this.basicVersion         = '0';

   this.htmlContent          = "";
   
   }
/*}}}*/

var cvString= new CVString();
