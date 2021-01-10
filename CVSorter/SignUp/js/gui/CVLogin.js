function CVLogin()/*{{{*/
{

}
/*}}}*/

CVLogin.prototype.handleLogin = function() {/*{{{*/


       $('.voissLoginForm').validate({
           errorElement: 'label', //default input error message container
           errorClass: 'help-inline', // default input error message class
           focusInvalid: false, // do not focus the last invalid input
           rules: {
               Email: {
                   email: true,
                   required: true
               },
               pass: {
                   required: true
               }
           },

           messages: {
               Email: {
                   email: "Correo no valido",
                   required: "email es requerido"
               },
               pass: {
                   required: "Contraseña es requerida"
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
            
               var username    = cvUtils.getPropertyFromHtmlObject("username","text");
               var password    = cvUtils.getPropertyFromHtmlObject("password","text");
               var params='';

               params+= 'username='+ username ;
               params+= '&password='+ password ; 

               cvRequest.makeRequest("ttApp","loginUser",params);

           }
       });

}
/*}}}*/

$(document).ready(function() { /*{{{*/ 

   cvLogin.handleLogin();

}); 
/*}}}*/


var cvLogin= new CVLogin();