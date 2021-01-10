function CVRegister()/*{{{*/
{

}
/*}}}*/

CVRegister.prototype.handleRegister = function() {/*{{{*/


       $('.validate-form').validate({
           errorElement: 'label', //default input error message container
           errorClass: 'help-inline', // default input error message class
           focusInvalid: false, // do not focus the last invalid input
           rules: {
               name: {
                   required: true
               },
               email: {
                   email:true,
                   required: true
               },
               username: {
                   required: true
               },
               pass: {
                   required: true
               },
               repeatPass: {
                   required: true
               }
           },

           messages: {
               name: {
                   required: "Usuario es requerido"
               },
               email: {
                   email: "Email no valido",
                   required: "Contraseña es requerida"
               },
               username: {
                   required: "Usuario es requerido"
               },
               pass: {
                   required: "Contraseña es requerida"
               },
               repeatPass: {
                   required: "Usuario es requerido"
               }
           },

           invalidHandler: function (event, validator) { //display error alert on form submit
               var input = $('.validate-input .input100');   
               var thisAlert = $(input).parent();

               $(thisAlert).addClass('alert-validate');
           },

           success: function (label) {
               var input = $('.validate-input .input100'); 
               var thisAlert = $(input).parent();

               $(thisAlert).removeClass('alert-validate');
           },

           submitHandler: function (form) {
            
               var name        = cvUtils.getPropertyFromHtmlObject("fullname","text");
               var email       = cvUtils.getPropertyFromHtmlObject("emailUser","text");
               var username    = cvUtils.getPropertyFromHtmlObject("username","text");
               var password    = cvUtils.getPropertyFromHtmlObject("password","text");
               var userKind    = cvUtils.getPropertyFromHtmlObject("userKind","text");

               var params='';

               params+= 'name='+ name ;
               params+= '&email='+ email ; 
               params+= '&username='+ username ;
               params+= '&password='+ password ;
               params+= '&userKind='+ userKind ; 

               cvRequest.makeRequest("ttApp","RegisterUser",params);

           }
       });

}
/*}}}*/

$(document).ready(function() { /*{{{*/ 

   cvRegister.handleRegister();

}); 
/*}}}*/


var cvRegister= new CVRegister();