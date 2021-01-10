function CVWindow()
{

}

CVWindow.prototype.showWindow = function(windowName){

   switch(windowName)
   {
      case 'Inicio':
         cvUserMain.showWindow();;
      break;

      case 'Ofertas laborales':
         cvJobOffers.showWindow();;
      break;

      case 'Usuario':
         cvEditUserData.showWindow();
      break;

      case 'CV':
         cvPostulantModify.showWindow();
      break;

      case 'UsersAdmin':
         cvUsersAdmin.showWindow();
      break;
   }

}

var cvWindow= new CVWindow();
