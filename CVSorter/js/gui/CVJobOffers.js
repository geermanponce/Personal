function CVJobOffers()/*{{{*/
{

}
/*}}}*/

CVJobOffers.prototype.showWindow = function(){
	jobOffers = JSON.parse(localStorage.jobOffers || "{}");
	var htmlContent = '';
	var user = localStorage.userKind;

	if(user == "POSTULANTE"){

		for(currentData in jobOffers){
			htmlContent += '<div class="col-md-12 col-sm-6 mb" id="'+jobOffers[currentData].cvJobOfferId+'">'
			htmlContent += '  	<p class="showMoreInfo" onclick="cvJobOffers.showJobOffer('+jobOffers[currentData].cvJobOfferId+')"><u>ver vacante</u></p>'
			htmlContent += '    <div class="darkblue-panel pn donut-chart" style="max-height: 280px !important;min-height: 280px !important;">'
			htmlContent += '      <div class="darkblue-header">'
			htmlContent += '        <h5>'+jobOffers[currentData].cvCompanyId+'</h5>'
			htmlContent += '      </div>'
			htmlContent += '       	<div class="col-sm-12 col-xs-6" style="color: white;">'
		    htmlContent += '       		<div class="col-sm-3 col-xs-6">'
		    htmlContent += '        		<p style="margin-top: 25%;">'+jobOffers[currentData].cvTittle+''
		    htmlContent += '				<br>'
		    if(jobOffers[currentData].cvSalary == '0')
		    	htmlContent += '				Salario no especificado</p>'
		    else
		    	htmlContent += '				'+jobOffers[currentData].cvSalary+'</p>'
		    htmlContent += '        	</div>'
		    htmlContent += '       		<div class="col-sm-6 col-xs-6">'
		    htmlContent += '        		<p style="margin-top: 5%;">'+jobOffers[currentData].cvDescription+'</p>'
		    htmlContent += '        	</div>'
		    htmlContent += '       		<div class="col-sm-3 col-xs-6">'
		    htmlContent += '        		<button class="buttonPostular" style="margin-top: 25%;" onclick="cvJobOffers.sendCv('+jobOffers[currentData].cvJobOfferId+',1)">Postularme</button>'
		    htmlContent += '        	</div>'
		    htmlContent += '        </div>'
		    htmlContent += '    </div>'
		    htmlContent += '</div>'
		}


		document.getElementById("divMainContent").innerHTML = htmlContent;

	}
	else{
		if(localStorage.isAdmin == 'YES')
			allJobOffers = JSON.parse(localStorage.allJobOffers || "{}");
		else
			allJobOffers = JSON.parse(localStorage.recruiterJobOffers || "{}");

		if(allJobOffers !== 'NO_INFO'){
			for(currentData in allJobOffers){
				htmlContent += '<div class="col-md-12 col-sm-6 mb" id="'+allJobOffers[currentData].cvJobOfferId+'">'
				htmlContent += '    <div class="darkblue-panel pn donut-chart" style="max-height: 280px !important;min-height: 280px !important;">'
				htmlContent += '      <div class="darkblue-header">'
				htmlContent += ' 		<div class="btnEditOffer">'
				htmlContent += '  	   		<i class="fa fa-pencil fa-2x changeColor" aria-hidden="true" onclick="cvJobOffers.editOfferAdmin('+allJobOffers[currentData].cvJobOfferId+')"></i>'
				htmlContent += '      	</div>'
				htmlContent += ' 		<div class="btnViewOffer">'
				htmlContent += '  	   		<i class="fa fa-eye fa-2x changeColor" aria-hidden="true" onclick="cvJobOffers.askClasifier('+allJobOffers[currentData].cvJobOfferId+')"></i>'
				htmlContent += '      	</div>'
				htmlContent += '        <h5>Usuario encargado: '+allJobOffers[currentData].cvUserAdminId+'</h5>'
				htmlContent += '      </div>'
				htmlContent += '       	<div class="col-sm-12 col-xs-6" style="color: white;">'

				htmlContent += '       		<div class="col-sm-3 col-xs-6">'
			    htmlContent += '        		<p style="margin-top: 25%;">'+allJobOffers[currentData].cvTittle+''
			    htmlContent += '				<br>'
			    if(allJobOffers[currentData].cvSalary == '0')
			    	htmlContent += '				Salario no especificado</p>'
			    else
			    	htmlContent += '				'+allJobOffers[currentData].cvSalary+'</p>'
			    htmlContent += '        	</div>'
			    htmlContent += '       		<div class="col-sm-6 col-xs-6">'
			    htmlContent += '        		<p style="margin-top: 5%;">'+allJobOffers[currentData].cvDescription+'</p>'
			    htmlContent += '        	</div>'

			    htmlContent += '       		<div class="col-sm-3 col-xs-6">'
			    htmlContent += '        		<p style="margin-top: 25%;">'+allJobOffers[currentData].cvCompanyId+'</p>'
			    htmlContent += '        	</div>'
			    
			    
			    htmlContent += '        </div>'
			    htmlContent += '    </div>'
			    htmlContent += '</div>'

			}
		}

		else{
			htmlContent += '<div class="col-md-12 col-sm-6 mb" id="">'
			htmlContent += '    <div class="darkblue-panel pn donut-chart" style="max-height: 280px !important;min-height: 280px !important;">'
			htmlContent += '      <div class="darkblue-header">'
			htmlContent += '        <h3>NO SE HAN AGREGADO VACANTES.</h3>'
			htmlContent += '      </div>'
			htmlContent += '       	<div class="col-sm-12 col-xs-6" style="color: white;">'

		    htmlContent += '       		<div class="col-sm-12 col-xs-6">'
		    htmlContent += '        		<h3>Puedes agregar una nueva vacante presionando el boton \"Agregar\".<h3>'
		    htmlContent += '        	</div>'
		    
		    htmlContent += '        </div>'
		    htmlContent += '    </div>'
		    htmlContent += '</div>'
		}

	    htmlContent += '<div class="col-md-12 col-sm-6 mb">'
	    htmlContent += '    <div class="save-info">'
	    if(localStorage.isAdmin == 'YES')
	    	htmlContent += '        <a id="addNewJobOffer" class="btn btn-save btnFormat" onclick="cvJobOffers.addJobOffer()">Agregar</a>'
	    else
	    	htmlContent += '        <a id="addNewJobOffer" class="btn btn-save btnFormat" onclick="cvJobOffers.addRecruiterJobOffer()">Agregar</a>'
	    //htmlContent += '        <a id="saveAcademicExperience" class="btn btn-save btnFormat">Guardar</a>'
	    htmlContent += '    </div>'
	    htmlContent += '</div>'

		document.getElementById("divMainContent").innerHTML = htmlContent;
	}

}

CVJobOffers.prototype.replaceFunction = function(cadena){
	return cadena.replace(",",'\n')
}

CVJobOffers.prototype.editOfferAdmin = function(offerId){
	if(localStorage.isAdmin == 'YES')
			allJobOffers = JSON.parse(localStorage.allJobOffers || "{}");
		else
			allJobOffers = JSON.parse(localStorage.recruiterJobOffers || "{}");
	
	var dialogContent = "";
	var htmlContent = "";

	for(currentData in allJobOffers){
		if(allJobOffers[currentData].cvJobOfferId == offerId){

			dialogContent += ' <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">'
			dialogContent += ' </button>'

			dialogContent += ' <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'
			dialogContent += '   <div class="modal-dialog modal-dialog-centered" role="document">'
			dialogContent += '     <div class="modal-content">'
			dialogContent += '       <div class="modal-header">'
			dialogContent += '         <h4 class="modal-title" id="exampleModalLongTitle">'+allJobOffers[currentData].cvTittle+'</h4>'
			dialogContent += '		   <h5 class="modal-title" id="exampleModalLongTitle">'+allJobOffers[currentData].cvUserAdminId+'<h5>'
			dialogContent += '         <button type="button" class="close" data-dismiss="modal" aria-label="Close">'
			dialogContent += '           <span aria-hidden="true">&times;</span>'
			dialogContent += '         </button>'
			dialogContent += '       </div>'
			dialogContent += '       <div class="modal-body">'

			dialogContent += '          <div class="form-group" style="display:none;">'
		    dialogContent += '              <label for="recipient-name" class="col-form-label">ID vacante:</label>'
		    dialogContent += '              <input type="text" class="form-control" name="offerId" id="offerId" value="'+offerId+'">'
		    dialogContent += '          </div>'

		    dialogContent += '          <div class="form-group">'
		    dialogContent += '              <label for="recipient-name" class="col-form-label">Usuario encargado:</label>'
		    dialogContent += '              <input type="text" class="form-control" name="cvUserAdminId" id="cvUserAdminId" value="'+allJobOffers[currentData].cvUserAdminId+'">'
		    dialogContent += '          </div>'

			dialogContent += '          <div class="form-group">'
		    dialogContent += '              <label for="recipient-name" class="col-form-label">Nombre de la vacante:</label>'
		    dialogContent += '              <input type="text" class="form-control" name="cvTittle" id="cvTittle" value="'+allJobOffers[currentData].cvTittle+'">'
		    dialogContent += '          </div>'

		    dialogContent += '          <div class="form-group">'
		    dialogContent += '              <label for="recipient-name" class="col-form-label">Rango de edad:</label>'
		    dialogContent += '              <input type="text" class="form-control" name="cvAgeOffer" id="cvAgeOffer" value="'+allJobOffers[currentData].cvAgeOffer+'">'
		    dialogContent += '          </div>'

		    dialogContent += '          <div class="form-group">'
		    dialogContent += '              <label for="recipient-name" class="col-form-label">Experiencia loboral:</label>'
		    dialogContent += '              <input type="text" class="form-control" name="cvExperiences" id="cvExperiences" value="'+allJobOffers[currentData].cvExperiences+'">'
		    dialogContent += '          </div>'

		    dialogContent += '          <div class="form-group">'
		    dialogContent += '              <label for="recipient-name" class="col-form-label">Ciudad:</label>'
		    dialogContent += '              <input type="text" class="form-control" name="cvCity" id="cvCity" value="'+allJobOffers[currentData].cvCity+'">'
		    dialogContent += '          </div>'

		    dialogContent += '          <div class="form-group">'
		    dialogContent += '              <label for="recipient-name" class="col-form-label">Número máximo de postulantes:</label>'
		    dialogContent += '              <input type="text" class="form-control" name="cvMaxPostulant" id="cvMaxPostulant" value="'+allJobOffers[currentData].cvMaxPostulant+'">'
		    dialogContent += '          </div>'

		    dialogContent += '          <div class="form-group">'
		    dialogContent += '              <label for="recipient-name" class="col-form-label">Suelo:</label>'
		    dialogContent += '              <input type="text" class="form-control" name="cvSalary" id="cvSalary" value="'+allJobOffers[currentData].cvSalary+'">'
		    dialogContent += '          </div>'

		    dialogContent += '          <div class="form-group">'
		    dialogContent += '              <label for="recipient-name" class="col-form-label">Descripción (Separa con una coma para indicar un nuevo renglon):</label>'
		    dialogContent += '				<textarea class="form-control" id="cvDescription" placeholder="Habilidades, conocimientos, etc." rows="6">'+allJobOffers[currentData].cvDescription+'</textarea>'
		    dialogContent += '          </div>'

		    dialogContent += '          <div class="form-group">'
		    dialogContent += '              <label for="recipient-name" class="col-form-label">Habilitar Oferta?:</label>'
		    dialogContent += '              <input type="checkbox" class="ez-checkbox" id="cvIsActive" >'
		    dialogContent += '          </div>'

			dialogContent += '       </div>'
			dialogContent += '       <div class="modal-footer">'
			dialogContent += '         <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>'
			dialogContent += '         <button type="button" class="btn btn-primary" onclick="cvJobOffers.editRecord();">Editar</button>'
			dialogContent += '       </div>'
			dialogContent += '     </div>'
			dialogContent += '   </div>'
			dialogContent += ' </div>'
		}
	}

	document.getElementById('cvConfirmation').innerHTML=dialogContent;
    $('#myModal').modal('show');

    for(currentData in allJobOffers){
		if(allJobOffers[currentData].cvJobOfferId == offerId){
			if(allJobOffers[currentData].cvIsActive == "True"){
				document.getElementById("cvIsActive").checked = true;
			}
		}
	}

}

CVJobOffers.prototype.addJobOffer = function(){
	var dialogContent = "";

	dialogContent += ' <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">'
	dialogContent += ' </button>'

	dialogContent += ' <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'
	dialogContent += '   <div class="modal-dialog modal-dialog-centered" role="document">'
	dialogContent += '     <div class="modal-content">'
	dialogContent += '       <div class="modal-header">'
	dialogContent += '         <h4 class="modal-title" id="exampleModalLongTitle">AGREGAR NUEVA OFERTA LABORAL</h4>'
	dialogContent += '         <button type="button" class="close" data-dismiss="modal" aria-label="Close">'
	dialogContent += '           <span aria-hidden="true">&times;</span>'
	dialogContent += '         </button>'
	dialogContent += '       </div>'
	dialogContent += '       <div class="modal-body">'
    
    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Nombre de la vacante:</label>'
    dialogContent += '              <input type="text" class="form-control" name="cvTittle" id="cvTittle" value="">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Rango de edad:</label>'
    dialogContent += '              <input type="text" class="form-control" name="cvAgeOffer" id="cvAgeOffer" value="">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Experiencia loboral:</label>'
    dialogContent += '              <input type="text" class="form-control" name="cvExperiences" id="cvExperiences" value="">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Ciudad:</label>'
    dialogContent += '              <input type="text" class="form-control" name="cvCity" id="cvCity" value="">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Número máximo de postulantes:</label>'
    dialogContent += '              <input type="text" class="form-control" name="cvMaxPostulant" id="cvMaxPostulant" value="">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Suelo:</label>'
    dialogContent += '              <input type="text" class="form-control" name="cvSalary" id="cvSalary" value="">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Descripción (Separa con una coma para indicar un nuevo renglon):</label>'
    dialogContent += '				<textarea class="form-control" id="cvDescription" placeholder="Habilidades, conocimientos, etc." rows="6"></textarea>'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Habilitar Oferta?:</label>'
    dialogContent += '              <input type="checkbox" class="ez-checkbox" checked id="cvIsActive" >'
    dialogContent += '          </div>'

	dialogContent += '       </div>'
	dialogContent += '       <div class="modal-footer">'
	dialogContent += '         <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>'
	dialogContent += '         <button type="button" class="btn btn-primary" onclick="cvJobOffers.addNewRecord();">Agregar</button>'
	dialogContent += '       </div>'
	dialogContent += '     </div>'
	dialogContent += '   </div>'
	dialogContent += ' </div>'

	document.getElementById('cvConfirmation').innerHTML=dialogContent;
    $('#myModal').modal('show');


}

CVJobOffers.prototype.showJobOffer = function(idJobOffer){
	jobOffers = JSON.parse(localStorage.jobOffers || "{}");

	var dialogContent="";
	for(currentData in jobOffers){
		if(jobOffers[currentData].cvJobOfferId == idJobOffer){
			dialogContent += ' <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">'
			dialogContent += ' </button>'

			dialogContent += ' <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'
			dialogContent += '   <div class="modal-dialog modal-dialog-centered" role="document">'
			dialogContent += '     <div class="modal-content">'
			dialogContent += '       <div class="modal-header">'
			dialogContent += '         <h4 class="modal-title" id="exampleModalLongTitle">'+jobOffers[currentData].cvTittle+'</h4>'
			if(jobOffers[currentData].cvSalary == '0')
				dialogContent += '	   	   <h5 class="modal-title" id="exampleModalLongTitle">Salario no especificado<h5>'
			else
				dialogContent += '		   <h5 class="modal-title" id="exampleModalLongTitle">'+jobOffers[currentData].cvSalary+'<h5>'
			dialogContent += '         <button type="button" class="close" data-dismiss="modal" aria-label="Close">'
			dialogContent += '           <span aria-hidden="true">&times;</span>'
			dialogContent += '         </button>'
			dialogContent += '       </div>'
			dialogContent += '       <div class="modal-body">'
	        dialogContent += '  		<div class="form-group" style="display:none;">'
	        dialogContent += '    			<label for="recipient-name" class="col-form-label">ID:</label>'
	        dialogContent += '    			<input type="text" class="form-control" id="recipient-name" value="'+jobOffers[currentData].cvJobOfferId+'">'
	        dialogContent += '  		</div>'

	        dialogContent += '  		<div class="form-group">'
	        dialogContent += '    			<label for="recipient-name" class="col-form-label">'+jobOffers[currentData].cvDescription+'</label>'
	        dialogContent += '  		</div>'

			dialogContent += '       </div>'
			dialogContent += '       <div class="modal-footer">'
			dialogContent += '         <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>'
			dialogContent += '         <button type="button" class="btn btn-primary" onclick="cvJobOffers.sendCv('+jobOffers[currentData].cvJobOfferId+',2)">Postularme</button>'
			dialogContent += '       </div>'
			dialogContent += '     </div>'
			dialogContent += '   </div>'
			dialogContent += ' </div>'
	    }
	}

    document.getElementById('cvConfirmation').innerHTML=dialogContent;
    $('#myModal').modal('show');
}

CVJobOffers.prototype.showClasifierInfo = function(){
	clasifierInfo = JSON.parse(localStorage.clasifierInfo || "{}");

	var htmlContent = '';
	
    htmlContent += '<div class="col-md-12 col-sm-6 mb">'
	htmlContent += '    <div class="darkblue-panel pn donut-chart" style="height: 420px !important;">'
	htmlContent += '      <div class="darkblue-header">'
	htmlContent += ' 		<div class="btnBackPage">'
    htmlContent += '  	   		<i class="fa fa-chevron-circle-left fa-2x changeColor" aria-hidden="true" onclick="cvJobOffers.showWindow()"></i>'
	htmlContent += '      	</div>'
	htmlContent += '        <h3 style="color:white;">Clasificación obtenida</h3>'
	htmlContent += '      </div>'

	htmlContent += '       	<div class="col-sm-12 col-xs-6" style="color: white;">'
	if(clasifierInfo == ''){

		htmlContent += '        <h3 style="color:white;">No se ha postulado ningún candidato a la oferta laboral seleccionada.</h3>'

	}

	else{
		htmlContent+='           <table class="table col-sm-12 col-xs-6" id="voissMainTable">';
	    htmlContent+='            <tbody id="voissTableDeliveryCatalog">';
	    htmlContent+='             <tr class="TableHeader">';
	    htmlContent+='               <th class="alignCenter">Usuario</th>';
	    htmlContent+='               <th class="alignCenter">Descripcion</th>';
	    htmlContent+='               <th class="alignCenter">Porcentaje</th>';
	    htmlContent+='               <th class="alignCenter">Ver CV</th>';
	    htmlContent+='               <th class="alignCenter">Contactar</th>';

	    htmlContent+='             </tr>';

	    for(currentData in clasifierInfo){
		    htmlContent+='             <tr class="">'
		    htmlContent+='               <th class="alignCenter">'+clasifierInfo[currentData].cvUserPostulant+'</th>';
		    htmlContent+='               <th class="alignCenter">'+clasifierInfo[currentData].cvDescription+'</th>';
		    htmlContent+='               <th class="alignCenter">'+clasifierInfo[currentData].cvPercentage+'</th>';
		    htmlContent+='               <th class="alignCenter"><i class="fa fa-file-pdf-o changeColor" aria-hidden="true" onclick="alert('+clasifierInfo[currentData].cvUserPostulantId+')"></i></th>';
		    htmlContent+='               <th class="alignCenter"><i class="fa fa-envelope changeColor" aria-hidden="true" onclick="cvJobOffers.sendEmail('+clasifierInfo[currentData].cvUserPostulantId+','+localStorage.jobOfferId+')"></i></th>';
		    htmlContent+='             </tr>';
		}
	    htmlContent+='           </tbody></table>';

		htmlContent += '        </div>'
	}

	
    htmlContent += '    </div>'
    htmlContent += '</div>'

    document.getElementById("divMainContent").innerHTML = htmlContent;
}

CVJobOffers.prototype.askClasifier = function(jobOfferId){

	var params = "";
	localStorage.jobOfferId = jobOfferId;
        
    params += "jobOfferId=" + jobOfferId;

    cvRequest.makeRequest("ttApp","askClasifier",params);

}

CVJobOffers.prototype.sendEmail = function(userID,jobOfferId){

	var params = "";
        
    params += "cvUserId=" + userID;
    params += "&cvJobOfferId=" + jobOfferId;

    cvRequest.makeRequest("ttApp","newMail",params);

}

CVJobOffers.prototype.showMessage = function(){

	var dialogContent="";
	dialogContent += ' <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">'
	dialogContent += ' </button>'

	dialogContent += ' <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'
	dialogContent += '   <div class="modal-dialog modal-dialog-centered" role="document">'
	dialogContent += '     <div class="modal-content" >'
	dialogContent += '       <div class="modal-header" style="background-color: #3f3f3f !important">'
	dialogContent += '         <h3 class="modal-title" id="exampleModalLongTitle">Se ha enviado el correo.</h3>'
	dialogContent += '         <button type="button" class="close" data-dismiss="modal" aria-label="Close">'
	dialogContent += '           <span aria-hidden="true">&times;</span>'
	dialogContent += '         </button>'
	dialogContent += '       </div>'
	dialogContent += '     </div>'
	dialogContent += '   </div>'
	dialogContent += ' </div>'

    document.getElementById('cvConfirmation').innerHTML=dialogContent;
    $('#myModal').modal('show');
}

CVJobOffers.prototype.addNewRecord = function(){

	var params = "";
    
    var cvTittle        = cvUtils.getPropertyFromHtmlObject("cvTittle","value");
    var cvAgeOffer      = cvUtils.getPropertyFromHtmlObject("cvAgeOffer","value");
    var cvExperiences   = cvUtils.getPropertyFromHtmlObject("cvExperiences","value");
    var cvCity          = cvUtils.getPropertyFromHtmlObject("cvCity","value");
    var cvMaxPostulant  = cvUtils.getPropertyFromHtmlObject("cvMaxPostulant","value");
    var cvSalary        = cvUtils.getPropertyFromHtmlObject("cvSalary","value");
    var cvDescription   = cvUtils.getPropertyFromHtmlObject("cvDescription","value");
    var cvIsActive      = document.getElementById("cvIsActive").checked;
    
    params += "cvUserId=" + localStorage.userID;
    params += "&cvCompany=" + localStorage.companyID;
    params += "&cvTittle=" + cvTittle;
    params += "&cvAgeOffer=" + cvAgeOffer;
    params += "&cvExperiences=" + cvExperiences;
    params += "&cvCity=" + cvCity;
    params += "&cvMaxPostulant=" + cvMaxPostulant;
    params += "&cvSalary=" + cvSalary;
    params += "&cvDescription=" + cvDescription;
    params += "&cvIsActive=" + cvIsActive;

    cvRequest.makeRequest("ttApp","addNewJobOffer",params);

}

CVJobOffers.prototype.editRecord = function(){

	var params = "";
    
    var offerId         = cvUtils.getPropertyFromHtmlObject("offerId","value");
    var cvUserAdminId   = cvUtils.getPropertyFromHtmlObject("cvUserAdminId","value");
    var cvTittle        = cvUtils.getPropertyFromHtmlObject("cvTittle","value");
    var cvAgeOffer      = cvUtils.getPropertyFromHtmlObject("cvAgeOffer","value");
    var cvExperiences   = cvUtils.getPropertyFromHtmlObject("cvExperiences","value");
    var cvCity          = cvUtils.getPropertyFromHtmlObject("cvCity","value");
    var cvMaxPostulant  = cvUtils.getPropertyFromHtmlObject("cvMaxPostulant","value");
    var cvSalary        = cvUtils.getPropertyFromHtmlObject("cvSalary","value");
    var cvDescription   = cvUtils.getPropertyFromHtmlObject("cvDescription","value");
    var cvIsActive      = document.getElementById("cvIsActive").checked;
    
    params += "cvUserId=" + localStorage.userID;
    params += "&cvCompany=" + localStorage.companyID;
    params += "&offerId=" + offerId;
    params += "&cvUserAdminId=" + cvUserAdminId;
    params += "&cvTittle=" + cvTittle;
    params += "&cvAgeOffer=" + cvAgeOffer;
    params += "&cvExperiences=" + cvExperiences;
    params += "&cvCity=" + cvCity;
    params += "&cvMaxPostulant=" + cvMaxPostulant;
    params += "&cvSalary=" + cvSalary;
    params += "&cvDescription=" + cvDescription;
    params += "&cvIsActive=" + cvIsActive;

    cvRequest.makeRequest("ttApp","editJobOffer",params);

}

CVJobOffers.prototype.sendCv = function(cvJobOfferId,flag){

	var params = "";

    
    params += "cvUserId=" + localStorage.userID;
    params += "&cvUserPostulantId=" + localStorage.cvUserPosId
    params += "&cvID=" + localStorage.cvID;
    params += "&offerId=" + cvJobOfferId;
    params += "&flag=" + flag;

    cvRequest.makeRequest("ttApp","getCVRanking",params);

}

CVJobOffers.prototype.showMessageCV = function(){

	var dialogContent="";
	dialogContent += ' <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">'
	dialogContent += ' </button>'

	dialogContent += ' <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'
	dialogContent += '   <div class="modal-dialog modal-dialog-centered" role="document">'
	dialogContent += '     <div class="modal-content">'
	dialogContent += '       <div class="modal-header" style="background-color: #3f3f3f !important">'
	dialogContent += '         <h3 class="modal-title" id="exampleModalLongTitle">Te has postulado con éxito.</h3>'
	dialogContent += '         <button type="button" class="close" data-dismiss="modal" aria-label="Close">'
	dialogContent += '           <span aria-hidden="true">&times;</span>'
	dialogContent += '         </button>'
	dialogContent += '       </div>'
	dialogContent += '     </div>'
	dialogContent += '   </div>'
	dialogContent += ' </div>'

    document.getElementById('cvConfirmation').innerHTML=dialogContent;
    $('#myModal').modal('show');
}

var cvJobOffers= new CVJobOffers();