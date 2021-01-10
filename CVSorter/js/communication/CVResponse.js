function CVResponse()
{

}

CVResponse.prototype.loginuserResponse = function(data)/*{{{*/
{
   switch(data.Status)
   {
      case 'OK':
      {
         localStorage.userKind   = data.userKind;
         localStorage.userID     = data.infoUser[0].cvUserId;
         localStorage.cvUserPosId = data.infoUser[0].cvUserPostulantId;
         localStorage.name       = data.infoUser[0].cvName;
         localStorage.infoUser   = JSON.stringify(data.infoUser);
         if(data.userKind == "POSTULANTE"){
            localStorage.cvID       = data.infoUserCV[0].cvCVId;
            localStorage.userCV     = JSON.stringify(data.infoUserCV);
            localStorage.jobOffers  = JSON.stringify(data.infoJobOffer);
            localStorage.JobPostulant  = JSON.stringify(data.JobPostulant);
         }
         else{
            localStorage.companyID = data.infoUser[0].cvCompanyId;
            localStorage.isAdmin = data.isAdmin;
            if(data.isAdmin == 'YES'){
               localStorage.allUsersRecruiter   = JSON.stringify(data.allUsersRecruiter);
               localStorage.allJobOffers   = JSON.stringify(data.allJobOffers);
            }
            else{
               localStorage.recruiterJobOffers   = JSON.stringify(data.recruiterJobOffers);
            }

         }
         cvUtils.startSystem();
      }

      break;

      case 'NO_USER':
      {
         alert('Usuario o contraseña incorrecta');
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

CVResponse.prototype.addacademicexperienceResponse = function(data)/*{{{*/
{
   switch(data.Status)
   {
      case 'OK':
      {
         $('#myModal').modal('hide');
         localStorage.userCV     = JSON.stringify(data.infoUserCV);
         cvPostulantModify.showAcademicExperience();
      }

      break;

      case 'BAD':
      {
         alert(data.Error_Message);
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

CVResponse.prototype.editacademicexperienceResponse = function(data)/*{{{*/
{
   switch(data.Status)
   {
      case 'OK':
      {
         $('#myModal').modal('hide');
         localStorage.userCV     = JSON.stringify(data.infoUserCV);
         cvPostulantModify.showAcademicExperience();
      }

      break;

      case 'BAD':
      {
         alert(data.Error_Message);
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

CVResponse.prototype.deleteacademicexperienceResponse = function(data)/*{{{*/
{
   switch(data.Status)
   {
      case 'OK':
      {
         $('#myModal').modal('hide');
         localStorage.userCV     = JSON.stringify(data.infoUserCV);
         cvPostulantModify.showAcademicExperience();
      }

      break;

      case 'BAD':
      {
         alert(data.Error_Message);
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

CVResponse.prototype.addworkexperienceResponse = function(data)/*{{{*/
{
   switch(data.Status)
   {
      case 'OK':
      {
         $('#myModal').modal('hide');
         localStorage.userCV     = JSON.stringify(data.infoUserCV);
         cvPostulantModify.showWorkExperience();
      }

      break;

      case 'BAD':
      {
         alert(data.Error_Message);
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

CVResponse.prototype.editworkexperienceResponse = function(data)/*{{{*/
{
   switch(data.Status)
   {
      case 'OK':
      {
         $('#myModal').modal('hide');
         localStorage.userCV     = JSON.stringify(data.infoUserCV);
         cvPostulantModify.showWorkExperience();
      }

      break;

      case 'BAD':
      {
         alert(data.Error_Message);
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

CVResponse.prototype.deleteworkexperienceResponse = function(data)/*{{{*/
{
   switch(data.Status)
   {
      case 'OK':
      {
         $('#myModal').modal('hide');
         localStorage.userCV     = JSON.stringify(data.infoUserCV);
         cvPostulantModify.showWorkExperience();
      }

      break;

      case 'BAD':
      {
         alert(data.Error_Message);
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

CVResponse.prototype.addnewabilityResponse = function(data)/*{{{*/
{
   switch(data.Status)
   {
      case 'OK':
      {
         $('#myModal').modal('hide');
         localStorage.userCV = JSON.stringify(data.infoUserCV);
         cvPostulantModify.showAbilities();
      }

      break;

      case 'BAD':
      {
         alert(data.Error_Message);
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

CVResponse.prototype.editabilityResponse = function(data)/*{{{*/
{
   switch(data.Status)
   {
      case 'OK':
      {
         $('#myModal').modal('hide');
         localStorage.userCV = JSON.stringify(data.infoUserCV);
         cvPostulantModify.showAbilities();
      }

      break;

      case 'BAD':
      {
         alert(data.Error_Message);
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

CVResponse.prototype.deleteabilityResponse = function(data)/*{{{*/
{
   switch(data.Status)
   {
      case 'OK':
      {
         $('#myModal').modal('hide');
         localStorage.userCV = JSON.stringify(data.infoUserCV);
         cvPostulantModify.showAbilities();
      }

      break;

      case 'BAD':
      {
         alert(data.Error_Message);
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

CVResponse.prototype.addnewtoolResponse = function(data)/*{{{*/
{
   switch(data.Status)
   {
      case 'OK':
      {
         $('#myModal').modal('hide');
         localStorage.userCV = JSON.stringify(data.infoUserCV);
         cvPostulantModify.showTools();
      }

      break;

      case 'BAD':
      {
         alert(data.Error_Message);
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

CVResponse.prototype.edittoolResponse = function(data)/*{{{*/
{
   switch(data.Status)
   {
      case 'OK':
      {
         $('#myModal').modal('hide');
         localStorage.userCV = JSON.stringify(data.infoUserCV);
         cvPostulantModify.showTools();
      }

      break;

      case 'BAD':
      {
         alert(data.Error_Message);
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

CVResponse.prototype.deletetoolResponse = function(data)/*{{{*/
{
   switch(data.Status)
   {
      case 'OK':
      {
         $('#myModal').modal('hide');
         localStorage.userCV = JSON.stringify(data.infoUserCV);
         cvPostulantModify.showTools();
      }

      break;

      case 'BAD':
      {
         alert(data.Error_Message);
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

CVResponse.prototype.addlanguageResponse = function(data)/*{{{*/
{
   switch(data.Status)
   {
      case 'OK':
      {
         $('#myModal').modal('hide');
         localStorage.userCV = JSON.stringify(data.infoUserCV);
         cvPostulantModify.showLanguages();
      }

      break;

      case 'BAD':
      {
         alert(data.Error_Message);
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

CVResponse.prototype.editlanguageResponse = function(data)/*{{{*/
{
   switch(data.Status)
   {
      case 'OK':
      {
         $('#myModal').modal('hide');
         localStorage.userCV = JSON.stringify(data.infoUserCV);
         cvPostulantModify.showLanguages();
      }

      break;

      case 'BAD':
      {
         alert(data.Error_Message);
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

CVResponse.prototype.deletelanguageResponse = function(data)/*{{{*/
{
   switch(data.Status)
   {
      case 'OK':
      {
         $('#myModal').modal('hide');
         localStorage.userCV = JSON.stringify(data.infoUserCV);
         cvPostulantModify.showLanguages();
      }

      break;

      case 'BAD':
      {
         alert(data.Error_Message);
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

CVResponse.prototype.searchinfouserResponse = function(data)/*{{{*/
{
   switch(data.Status)
   {
      case 'OK':
      {
         localStorage.infoRecruiter = JSON.stringify(data.infoRecruiter);
         cvUsersAdmin.editInfoUser();
      }

      break;

      case 'BAD':
      {
         alert(data.Error_Message);
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

CVResponse.prototype.addnewjobofferResponse = function(data)/*{{{*/
{
   switch(data.Status)
   {
      case 'OK':
      {
         $('#myModal').modal('hide');
         localStorage.allJobOffers   = JSON.stringify(data.allJobOffers);
         cvJobOffers.showWindow();
      }

      break;

      case 'BAD':
      {
         alert(data.Error_Message);
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

CVResponse.prototype.editjobofferResponse = function(data)/*{{{*/
{
   switch(data.Status)
   {
      case 'OK':
      {
         $('#myModal').modal('hide');
         localStorage.allJobOffers   = JSON.stringify(data.allJobOffers);
         cvJobOffers.showWindow();
      }

      break;

      case 'BAD':
      {
         alert(data.Error_Message);
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

CVResponse.prototype.askclasifierResponse = function(data)/*{{{*/
{
   switch(data.Status)
   {
      case 'OK':
      {
         localStorage.clasifierInfo = JSON.stringify(data.clasifierInfo);
         cvJobOffers.showClasifierInfo();
      }

      break;

      case 'BAD':
      {
         alert(data.Error_Message);
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

CVResponse.prototype.adduserrecruiterResponse = function(data)/*{{{*/
{
   switch(data.Status)
   {
      case 'OK':
      {
         $('#myModal').modal('hide');
         localStorage.allUsersRecruiter = JSON.stringify(data.allUsersRecruiter);
         cvUsersAdmin.showWindow();
      }

      break;

      case 'NO':
      {
         alert(data.Error_Message);
      }

      case 'ALREADY_EXIST':
      {
         alert(data.Error_Message);
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

CVResponse.prototype.editinforecruiterResponse = function(data)/*{{{*/
{
   switch(data.Status)
   {
      case 'OK':
      {
         $('#myModal').modal('hide');
         localStorage.allUsersRecruiter = JSON.stringify(data.allUsersRecruiter);
         cvUsersAdmin.showWindow();
      }

      break;

      case 'NO':
      {
         alert(data.Error_Message);
      }

      case 'ALREADY_EXIST':
      {
         alert(data.Error_Message);
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

CVResponse.prototype.newmailResponse = function(data)/*{{{*/
{
   switch(data.Status)
   {
      case 'OK':
      {
         cvJobOffers.showMessage();
      }

      break;

      case 'NO':
      {
         alert(data.Error_Message);
      }

      case 'ALREADY_EXIST':
      {
         alert(data.Error_Message);
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

CVResponse.prototype.newmailResponse = function(data)/*{{{*/
{
   switch(data.Status)
   {
      case 'OK':
      {
         cvJobOffers.showMessage();
      }

      break;

      case 'NO':
      {
         alert(data.Error_Message);
      }

      case 'ALREADY_EXIST':
      {
         alert(data.Error_Message);
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

CVResponse.prototype.getcvrankingResponse = function(data)/*{{{*/
{
   switch(data.Status)
   {
      case 'OK':
      {
         localStorage.JobPostulant  = JSON.stringify(data.JobPostulant);
         if(data.flag == '2'){
            $('#myModal').modal('hide');
         }
         alert('Te has postulado a la vacante.');
      }

      break;

      case 'NO':
      {
         alert(data.Error_Message);
      }

      default:

      case 'ALREADY_EXIST':
      {
         alert(data.Error_Message);
      }

      break;

      {
        alert('Error desconocido');
      }
   }
   return;
}
/*}}}*/

var cvResponse = new CVResponse();