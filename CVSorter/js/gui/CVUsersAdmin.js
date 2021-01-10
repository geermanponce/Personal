function CVUsersAdmin()/*{{{*/
{

}
/*}}}*/

CVUsersAdmin.prototype.showWindow = function(){
	allUsersRecruiter = JSON.parse(localStorage.allUsersRecruiter || "{}");

	var htmlContent = '';
	
    htmlContent += '<div class="col-md-12 col-sm-6 mb">'
	htmlContent += '    <div class="darkblue-panel pn donut-chart" style="height: 420px !important;">'
	htmlContent += '      <div class="darkblue-header">'
	htmlContent += '        <h2>Usuarios</h2>'
	htmlContent += '      </div>'

	htmlContent += '       	<div class="col-sm-12 col-xs-6" style="color: white;">'

	htmlContent+='           <table class="table col-sm-12 col-xs-6" id="voissMainTable">';
    htmlContent+='            <tbody id="voissTableDeliveryCatalog">';
    htmlContent+='             <tr class="TableHeader">';
    htmlContent+='               <th class="alignCenter">ID Usuario</th>';
    htmlContent+='               <th class="alignCenter">Nombre</th>';
    htmlContent+='               <th class="alignCenter">Empresa</th>';
    htmlContent+='               <th class="alignCenter">Puesto</th>';
    htmlContent+='               <th class="alignCenter">Editar</th>';
    htmlContent+='               <th class="alignCenter">Eliminar</th>';

    htmlContent+='             </tr>';

    for(currentData in allUsersRecruiter){
	    htmlContent+='             <tr class="">';
	    htmlContent+='               <th class="alignCenter">'+allUsersRecruiter[currentData].cvUserAdminId+'</th>';
	    htmlContent+='               <th class="alignCenter">'+allUsersRecruiter[currentData].cvUserId+'</th>';
	    htmlContent+='               <th class="alignCenter">'+allUsersRecruiter[currentData].cvCompanyId+'</th>';
	    htmlContent+='               <th class="alignCenter">'+allUsersRecruiter[currentData].cvJobTittle+'</th>';
	    htmlContent+='               <th class="alignCenter"><i class="fa fa-pencil changeColor" aria-hidden="true" onclick="cvUsersAdmin.searchInfoUser('+allUsersRecruiter[currentData].cvUserAdminId+')"></i></th>';
	    htmlContent+='               <th class="alignCenter"><i class="fa fa-trash changeColor" aria-hidden="true" onclick="cvUsersAdmin.deleteUserInfo('+allUsersRecruiter[currentData].cvUserAdminId+')"></i></th>';

	    htmlContent+='             </tr>';
	}
    htmlContent+='           </tbody></table>';

	htmlContent += '        </div>'

	
    htmlContent += '    </div>'
    htmlContent += '</div>'

    htmlContent += '<div class="col-md-12 col-sm-6 mb">'
    htmlContent += '    <div class="save-info">'
    htmlContent += '        <a class="btn btn-save btnFormat" onclick="cvUsersAdmin.addNewRecruiter();">Agregar Usuario</a>'
    //htmlContent += '        <a id="saveAcademicExperience" class="btn btn-save btnFormat">Guardar</a>'
    htmlContent += '    </div>'
    htmlContent += '</div>'


    document.getElementById("divMainContent").innerHTML = htmlContent;
}

CVUsersAdmin.prototype.searchInfoUser = function(userId){
	var params = "";
    
    params += "cvID=" + localStorage.cvID;
    params += "&cvUserId=" + localStorage.userID;
    params += "&cvRecruiterId=" + userId;

    cvRequest.makeRequest("ttApp","searchInfoUser",params);

}

CVUsersAdmin.prototype.editInfoUser = function(){
	infoRecruiter = JSON.parse(localStorage.infoRecruiter || "{}");

	var dialogContent="";
    dialogContent += ' <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">'
    dialogContent += ' </button>'

    dialogContent += ' <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'
    dialogContent += '   <div class="modal-dialog modal-dialog-centered" role="document">'
    dialogContent += '     <div class="modal-content">'
    dialogContent += '       <div class="modal-header">'
    dialogContent += '         <h4 class="modal-title" id="exampleModalLongTitle">Editar información de usuario reclutador</h4>'
    dialogContent += '         <button type="button" class="close" data-dismiss="modal" aria-label="Close">'
    dialogContent += '           <span aria-hidden="true">&times;</span>'
    dialogContent += '         </button>'
    dialogContent += '       </div>'
    dialogContent += '       <div class="modal-body">'

    dialogContent += '          <div class="form-group" style="display:none;">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">ID admin:</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvUserAdminId" value="'+infoRecruiter[0].cvUserAdminId+'">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group" style="display:none;">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">id usuario</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvUserId" value="'+infoRecruiter[0].cvUserId+'">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Empresa</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvCompanyId" value="'+infoRecruiter[0].cvCompanyId+'">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Puesto laboral</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvJobTittle" value="'+infoRecruiter[0].cvJobTittle+'">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Nombre</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvName" value="'+infoRecruiter[0].cvName+'">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Edad</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvAge" value="'+infoRecruiter[0].cvAge+'">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">correo</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvMail" value="'+infoRecruiter[0].cvMail+'">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Telefono</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvPhone" value="'+infoRecruiter[0].cvPhone+'">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Celular</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvMobilePhone" value="'+infoRecruiter[0].cvMobilePhone+'">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Usuario</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvUserAccess" value="'+infoRecruiter[0].cvUserAccess+'">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Contraseña</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvPassAccess" value="'+infoRecruiter[0].cvPassAccess+'">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Dirección</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvAddress" value="'+infoRecruiter[0].cvAddress+'">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Es reclutador?</label>'
    dialogContent += '              <input type="checkbox" class="ez-checkbox" id="cvIsRecruiter" value="">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Usuario activo?</label>'
    dialogContent += '              <input type="checkbox" class="ez-checkbox" id="cvActive" value="">'
    dialogContent += '          </div>'

    dialogContent += '       </div>'
    dialogContent += '       <div class="modal-footer">'
    dialogContent += '         <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>'
    dialogContent += '         <button type="button" class="btn btn-primary" id="editLanguageButton" onclick="cvUsersAdmin.editInfoRecruiter();">Editar</button>'
    dialogContent += '       </div>'
    dialogContent += '     </div>'
    dialogContent += '   </div>'
    dialogContent += ' </div>'

    document.getElementById('cvConfirmation').innerHTML=dialogContent;
    $('#myModal').modal('show');

    if(infoRecruiter[0].cvIsRecruiter == 'True')
    	document.getElementById("cvIsRecruiter").checked = true;
    if(infoRecruiter[0].cvActive == 'True')
    	document.getElementById("cvActive").checked = true;

}

CVUsersAdmin.prototype.addNewRecruiter = function(){
	infoRecruiter = JSON.parse(localStorage.infoRecruiter || "{}");

	var dialogContent="";
    dialogContent += ' <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">'
    dialogContent += ' </button>'

    dialogContent += ' <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'
    dialogContent += '   <div class="modal-dialog modal-dialog-centered" role="document">'
    dialogContent += '     <div class="modal-content">'
    dialogContent += '       <div class="modal-header">'
    dialogContent += '         <h4 class="modal-title" id="exampleModalLongTitle">Editar información de usuario reclutador</h4>'
    dialogContent += '         <button type="button" class="close" data-dismiss="modal" aria-label="Close">'
    dialogContent += '           <span aria-hidden="true">&times;</span>'
    dialogContent += '         </button>'
    dialogContent += '       </div>'
    dialogContent += '       <div class="modal-body">'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Puesto laboral</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvJobTittle" value="">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Nombre</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvName" value="">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Edad</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvAge" value="">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">correo</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvMail" value="">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Telefono</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvPhone" value="">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Celular</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvMobilePhone" value="">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Usuario</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvUserAccess" value="">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Contraseña</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvPassAccess" value="">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Dirección</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvAddress" value="">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Es reclutador?</label>'
    dialogContent += '              <input type="checkbox" class="ez-checkbox" checked id="cvIsRecruiter" value="">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Usuario activo?</label>'
    dialogContent += '              <input type="checkbox" class="ez-checkbox" checked id="cvActive" value="">'
    dialogContent += '          </div>'

    dialogContent += '       </div>'
    dialogContent += '       <div class="modal-footer">'
    dialogContent += '         <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>'
    dialogContent += '         <button type="button" class="btn btn-primary" onclick="cvUsersAdmin.addUserRecruiter();">Agregar</button>'
    dialogContent += '       </div>'
    dialogContent += '     </div>'
    dialogContent += '   </div>'
    dialogContent += ' </div>'

    document.getElementById('cvConfirmation').innerHTML=dialogContent;
    $('#myModal').modal('show');

}

CVUsersAdmin.prototype.addUserRecruiter = function(){

	var params = "";
    
    var cvJobTittle	   = cvUtils.getPropertyFromHtmlObject("cvJobTittle","value");
    var cvName		   = cvUtils.getPropertyFromHtmlObject("cvName","value");
    var cvAge		   = cvUtils.getPropertyFromHtmlObject("cvAge","value");
    var cvMail		   = cvUtils.getPropertyFromHtmlObject("cvMail","value");
    var cvPhone		   = cvUtils.getPropertyFromHtmlObject("cvPhone","value");
    var cvMobilePhone  = cvUtils.getPropertyFromHtmlObject("cvMobilePhone","value");
    var cvUserAccess   = cvUtils.getPropertyFromHtmlObject("cvUserAccess","value");
    var cvPassAccess   = cvUtils.getPropertyFromHtmlObject("cvPassAccess","value");
    var cvAddress	   = cvUtils.getPropertyFromHtmlObject("cvAddress","value");
    var cvIsRecruiter  = document.getElementById("cvIsRecruiter").checked;
    var cvActive	   = document.getElementById("cvActive").checked;
    
    params += "cvJobTittle=" + cvJobTittle;
    params += "&cvName=" + cvName;
    params += "&cvAge=" + cvAge;
    params += "&cvMail=" + cvMail;
    params += "&cvPhone=" + cvPhone;
    params += "&cvMobilePhone=" + cvMobilePhone;
    params += "&cvUserAccess=" + cvUserAccess;
    params += "&cvPassAccess=" + cvPassAccess;
    params += "&cvAddress=" + cvAddress;
    params += "&cvIsRecruiter=" + cvIsRecruiter;
    params += "&cvActive=" + cvActive;
    params += "&cvCompany=" + localStorage.companyID;

    cvRequest.makeRequest("ttApp","addUserRecruiter",params);

}

CVUsersAdmin.prototype.editInfoRecruiter = function(){

	var params = "";

	var cvUserAdminId  = cvUtils.getPropertyFromHtmlObject("cvUserAdminId","value");     
	var cvUserId       = cvUtils.getPropertyFromHtmlObject("cvUserId","value");
    var cvJobTittle	   = cvUtils.getPropertyFromHtmlObject("cvJobTittle","value");
    var cvName		   = cvUtils.getPropertyFromHtmlObject("cvName","value");
    var cvAge		   = cvUtils.getPropertyFromHtmlObject("cvAge","value");
    var cvMail		   = cvUtils.getPropertyFromHtmlObject("cvMail","value");
    var cvPhone		   = cvUtils.getPropertyFromHtmlObject("cvPhone","value");
    var cvMobilePhone  = cvUtils.getPropertyFromHtmlObject("cvMobilePhone","value");
    var cvUserAccess   = cvUtils.getPropertyFromHtmlObject("cvUserAccess","value");
    var cvPassAccess   = cvUtils.getPropertyFromHtmlObject("cvPassAccess","value");
    var cvAddress	   = cvUtils.getPropertyFromHtmlObject("cvAddress","value");
    var cvIsRecruiter  = document.getElementById("cvIsRecruiter").checked;
    var cvActive	   = document.getElementById("cvActive").checked;
    
    params += "cvUserAdminId=" + cvUserAdminId;
    params += "&cvUserId=" + cvUserId;
    params += "&cvJobTittle=" + cvJobTittle;
    params += "&cvName=" + cvName;
    params += "&cvAge=" + cvAge;
    params += "&cvMail=" + cvMail;
    params += "&cvPhone=" + cvPhone;
    params += "&cvMobilePhone=" + cvMobilePhone;
    params += "&cvUserAccess=" + cvUserAccess;
    params += "&cvPassAccess=" + cvPassAccess;
    params += "&cvAddress=" + cvAddress;
    params += "&cvIsRecruiter=" + cvIsRecruiter;
    params += "&cvActive=" + cvActive;
    params += "&cvCompany=" + localStorage.companyID;

    cvRequest.makeRequest("ttApp","editInfoRecruiter",params);

}

CVUsersAdmin.prototype.deleteUserInfo = function(cvUserId){

    var params = "";
    
    var dialogContent="";
    dialogContent += ' <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">'
    dialogContent += ' </button>'

    dialogContent += ' <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'
    dialogContent += '   <div class="modal-dialog modal-dialog-centered" role="document">'
    dialogContent += '     <div class="modal-content">'
    dialogContent += '       <div class="modal-header">'
    dialogContent += '         <h4 class="modal-title" id="exampleModalLongTitle">Eliminar usuario</h4>'
    dialogContent += '         <button type="button" class="close" data-dismiss="modal" aria-label="Close">'
    dialogContent += '           <span aria-hidden="true">&times;</span>'
    dialogContent += '         </button>'
    dialogContent += '       </div>'
    dialogContent += '       <div class="modal-body">'

    dialogContent += '          <div class="form-group infoDelete">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">¿Estás seguro de borrar este registro?</label>'
    dialogContent += '          </div>'

    dialogContent += '       </div>'
    dialogContent += '       <div class="modal-footer">'
    dialogContent += '         <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>'
    dialogContent += '         <button type="button" class="btn btn-primary deleteBtn" id="deleteUserRecruiter">Borrar</button>'
    dialogContent += '       </div>'
    dialogContent += '     </div>'
    dialogContent += '   </div>'
    dialogContent += ' </div>'

    document.getElementById('cvConfirmation').innerHTML=dialogContent;
    $('#myModal').modal('show');

    $("#deleteUserRecruiter").click(function(){
        var params = "";
        params += "&cvUserId=" + cvUserId;
        alert(params);
        //cvRequest.makeRequest("ttApp","deleteAcademicExperience",params);
    });

}

var cvUsersAdmin= new CVUsersAdmin();