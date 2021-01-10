function CVResponse()
{

}

CVResponse.prototype.loginuserResponse = function(data)/*{{{*/
{
   switch(data.Status)
   {
      case 'OK':
      {
      	alert('Exito');
      }

      break;

      default:
      {
        alert('Error desconocido');
      }
   }
   return;
}
/*}}}*/

CVResponse.prototype.registeruserResponse = function(data)/*{{{*/
{
   switch(data.Status)
   {
      case 'OK':
      {
         alert('Registro exitoso');
         window.location="../index.html";
      }

      break;

      case 'ALREADY_EXIST':
      {
         alert('Ya existe una cuenta registrada con ese correo');
      }

      break;

      default:
      {
        alert('Error desconocido');
      }
   }
   return;
}
/*}}}*/

var cvResponse = new CVResponse();