function CVEditUserData(){
    
}

CVEditUserData.prototype.showWindow = function(){

    var htmlContent = '';

    htmlContent += '<div class="col-md-12 col-sm-6 mb">'
    htmlContent += '    <div class="photo-container" id="photo-container">'
    htmlContent += '        <div class="add-new-photo" id="add-photo">'
    htmlContent += '            <img class="photo" id="photo">'
    htmlContent += '        </div>'
    htmlContent += '        <input type="file" class="my-file" id="add-new-photo">'
    htmlContent += '    </div>'
    htmlContent += '</div>'

    htmlContent += '<div class="col-md-12 col-sm-5 mb">'
    htmlContent += '    <div class="btn-container">'
    htmlContent += '        <a class="btn btn-color" id="personalInfo">Datos personales</a>'
    htmlContent += '        <a class="btn btn-color" id="accessInfo">Datos de acceso</a>'
    htmlContent += '        <a class="btn btn-color" id="contactInfo">Datos de contacto</a>'
    htmlContent += '    </div>'
    htmlContent += '</div>'

    htmlContent += '<div class="col-md-12 col-sm-6 mb" id="dataContainer">'
    htmlContent += '</div>'

    document.getElementById("divMainContent").innerHTML = htmlContent;

    cvEditUserData.showPersonalInfo();

    $("#personalInfo").click(function(){
        cvEditUserData.showPersonalInfo();
    });

    $("#accessInfo").click(function(){
        cvEditUserData.showAccessInfo();
    });

    $("#contactInfo").click(function(){
        cvEditUserData.showContactInfo();
    });

}

CVEditUserData.prototype.showPersonalInfo = function(){
    var htmlContent = '';
    var user = localStorage.userKind;
    userInfo = JSON.parse(localStorage.infoUser || "{}");

    
	if(user == "POSTULANTE"){

        
        htmlContent += '    <div class="info-container" style="margin-top: 30px !important;">'
        htmlContent += '        <form class="personal-info">'
        
		htmlContent += '            <div class="col-sm-6 col-xs-6"> '
        htmlContent += '              <label for="nombre" class="form-info labelFormat">Nombre: </label>'
        htmlContent += '              <input type="text" class="nombre inputFormat" id="cvName"> '
        htmlContent += '            </div>'
        
        
		htmlContent += '       		<div class="col-sm-6 col-xs-6">' 
        htmlContent += '              <label for="edad" class="form-info labelFormat">Edad: </label>'
        htmlContent += '		      <input type="text" class="edad inputFormat" id="cvAge">'
        htmlContent += '            </div>'
        
        htmlContent += '            <div class="col-sm-6 col-xs-6"> '
        htmlContent += '	    	  <label for="telefono" class="form-info labelFormat">CURP: </label>'
		htmlContent += '    		  <input type="text" class="telefono inputFormat" id="cvCurp"> '
        htmlContent += '            </div>'
				
		/*
        htmlContent += '    		<div class="col-sm-6 col-xs-6">'
        htmlContent += '              <label for="edo-civil" class="form-info labelFormat">Estado civil </label>'
		htmlContent += '              <select name="edo-civil" class="edo-civil inputFormat">'
		htmlContent += '    		    <option>Soltero</option>'
		htmlContent += '    			<option>Casado</option>'
        htmlContent += '    		  </select>'
        htmlContent += '            </div>'
        */
        
				
		htmlContent += '    		<div class="col-sm-6 col-xs-6">'
        htmlContent += '              <label for="alcaldia" class="form-info labelFormat">RFC: </label>'
		htmlContent += '    		  <input type="text" class="alcaldia inputFormat" id="cvRFC">'
        htmlContent += '            </div>'
		
		htmlContent += '	    </form>'
        htmlContent += '	</div>'

        htmlContent += '<div class="col-md-12 col-sm-6 mb">'
        htmlContent += '    <div class="save-info">'
        htmlContent += '        <a id="" class="btn btn-save btnFormat">Guardar</a>'
        htmlContent += '    </div>'
        htmlContent += '</div>'
            
        document.getElementById("dataContainer").innerHTML = htmlContent;

        $("#cvName").val(userInfo[0].cvName);
        
        if(userInfo[0].cvAge !== 'None')
            $("#cvAge").val(userInfo[0].cvAge);
        else
            $("#cvAge").val('');

        if(userInfo[0].cvCURP !== 'None')
            $("#cvCurp").val(userInfo[0].cvCURP);
        else
            $("#cvCurp").val('');

        if(userInfo[0].cvRFC !== 'None')
            $("#cvRFC").val(userInfo[0].cvRFC);
        else
            $("#cvRFC").val('');
    }

    else{

        htmlContent += '    <div class="info-container" style="margin-top: 30px !important;">'
        htmlContent += '        <form class="personal-info">'
        
        htmlContent += '            <div class="col-sm-6 col-xs-6"> '
        htmlContent += '              <label for="nombre" class="form-info labelFormat">Nombre: </label>'
        htmlContent += '              <input type="text" class="nombre inputFormat" id="cvName"> '
        htmlContent += '            </div>'
        
        htmlContent += '            <div class="col-sm-6 col-xs-6"> '
        htmlContent += '              <label for="email" class="form-info labelFormat">Empresa: </label>'
        htmlContent += '              <input type="text" class="email inputFormat" id="cvCompanyId">' 
        htmlContent += '            </div>'
        
        htmlContent += '            <div class="col-sm-6 col-xs-6">' 
        htmlContent += '              <label for="edad" class="form-info labelFormat">Edad: </label>'
        htmlContent += '              <input type="text" class="edad inputFormat" id="cvAge">'
        htmlContent += '            </div>'
        
        htmlContent += '            <div class="col-sm-6 col-xs-6"> '
        htmlContent += '              <label for="telefono" class="form-info labelFormat">Puesto laboral: </label>'
        htmlContent += '              <input type="text" class="telefono inputFormat" id="cvJobTittle"> '
        htmlContent += '            </div>'
        
        htmlContent += '            <div class="col-sm-6 col-xs-6"> '
        htmlContent += '              <label for="cel" class="form-info labelFormat">¿Usuario reclutador?: </label>'         
        htmlContent += '              <input type="text" class="cel inputFormat" id="cvIsRecruiter">'
        htmlContent += '            </div>'
        htmlContent += '        </form>'
        htmlContent += '    </div>'

        htmlContent += '<div class="col-md-12 col-sm-6 mb">'
        htmlContent += '    <div class="save-info">'
        htmlContent += '        <a id="" class="btn btn-save btnFormat">Guardar</a>'
        htmlContent += '    </div>'
        htmlContent += '</div>'
            
        document.getElementById("dataContainer").innerHTML = htmlContent;

        $("#cvName").val(userInfo[0].cvName);

        if(userInfo[0].cvCompanyId !== 'None')
            $("#cvCompanyId").val(userInfo[0].cvCompanyId);
        else
            $("#cvCompanyId").val('');

        if(userInfo[0].cvAge !== 'None')
            $("#cvAge").val(userInfo[0].cvAge);
        else
            $("#cvAge").val('');

        if(userInfo[0].cvJobTittle !== 'None')
            $("#cvJobTittle").val(userInfo[0].cvJobTittle);
        else
            $("#cvJobTittle").val('');

        if(userInfo[0].cvIsRecruiter !== 'None')
            $("#cvIsRecruiter").val(userInfo[0].cvIsRecruiter);
        else
            $("#cvIsRecruiter").val('');
        
    }
}

CVEditUserData.prototype.showAccessInfo = function(){
    var htmlContent = '';
    var user = localStorage.userKind;
    userInfo = JSON.parse(localStorage.infoUser || "{}");

    
    if(user == "POSTULANTE"){

        
        htmlContent += '    <div class="info-container" style="margin-top: 30px !important;">'
        htmlContent += '        <form class="personal-info">'
        
        
        htmlContent += '            <div class="col-sm-6 col-xs-6"> '
        htmlContent += '              <label for="email" class="form-info labelFormat">E-mail: </label>'
        htmlContent += '              <input type="email" class="email inputFormat" id="cvMail">' 
        htmlContent += '            </div>'
        
        htmlContent += '            <div class="col-sm-6 col-xs-6">' 
        htmlContent += '              <label for="edad" class="form-info labelFormat">Usuario: </label>'
        htmlContent += '              <input type="text" class="edad inputFormat" id="cvUserAccess">'
        htmlContent += '            </div>'

        htmlContent += '            <div class="col-sm-6 col-xs-6"> '
        htmlContent += '              <label for="city" class="form-info labelFormat">Contraseña: </label>'
        htmlContent += '              <input type="text" class="city inputFormat" id="cvPassAccess">' 
        htmlContent += '            </div>'
                
        htmlContent += '            <div class="col-sm-6 col-xs-6">'
        htmlContent += '              <label for="alcaldia" class="form-info labelFormat">¿Cuenta activa?: </label>'
        htmlContent += '              <input type="checkbox" class="alcaldia inputFormat" id="cvActive">'
        htmlContent += '            </div>'
        htmlContent += '        </form>'
        htmlContent += '    </div>'

        htmlContent += '<div class="col-md-12 col-sm-6 mb">'
        htmlContent += '    <div class="save-info">'
        htmlContent += '        <a id="" class="btn btn-save btnFormat">Guardar</a>'
        htmlContent += '    </div>'
        htmlContent += '</div>'

            
        document.getElementById("dataContainer").innerHTML = htmlContent;

        $("#cvMail").val(userInfo[0].cvMail);
        $("#cvUserAccess").val(userInfo[0].cvUserAccess);
        $("#cvPassAccess").val(userInfo[0].cvPassAccess);

        if(userInfo[0].cvActive == 'True')
            document.getElementById("cvActive").checked = true
    }

    else{

        htmlContent += '    <div class="info-container" style="margin-top: 30px !important;">'
        htmlContent += '        <form class="personal-info">'
        
        
        htmlContent += '            <div class="col-sm-6 col-xs-6"> '
        htmlContent += '              <label for="email" class="form-info labelFormat">E-mail: </label>'
        htmlContent += '              <input type="email" class="email inputFormat" id="cvMail">' 
        htmlContent += '            </div>'
        
        htmlContent += '            <div class="col-sm-6 col-xs-6">' 
        htmlContent += '              <label for="edad" class="form-info labelFormat">Usuario: </label>'
        htmlContent += '              <input type="text" class="edad inputFormat" id="cvUserAccess">'
        htmlContent += '            </div>'

        htmlContent += '            <div class="col-sm-6 col-xs-6"> '
        htmlContent += '              <label for="city" class="form-info labelFormat">Contraseña: </label>'
        htmlContent += '              <input type="text" class="city inputFormat" id="cvPassAccess">' 
        htmlContent += '            </div>'
                
        htmlContent += '            <div class="col-sm-6 col-xs-6">'
        htmlContent += '              <label for="alcaldia" class="form-info labelFormat">¿Cuenta activa?: </label>'
        htmlContent += '              <input type="checkbox" class="alcaldia inputFormat" id="cvActive">'
        htmlContent += '            </div>'
        htmlContent += '        </form>'
        htmlContent += '    </div>'

        htmlContent += '<div class="col-md-12 col-sm-6 mb">'
        htmlContent += '    <div class="save-info">'
        htmlContent += '        <a id="" class="btn btn-save btnFormat">Guardar</a>'
        htmlContent += '    </div>'
        htmlContent += '</div>'

            
        document.getElementById("dataContainer").innerHTML = htmlContent;

        $("#cvMail").val(userInfo[0].cvMail);
        $("#cvUserAccess").val(userInfo[0].cvUserAccess);
        $("#cvPassAccess").val(userInfo[0].cvPassAccess);

        if(userInfo[0].cvActive == 'True')
            document.getElementById("cvActive").checked = true
        
    }
}

CVEditUserData.prototype.showContactInfo = function(){
    var htmlContent = '';
    var user = localStorage.userKind;
    userInfo = JSON.parse(localStorage.infoUser || "{}");

    
    if(user == "POSTULANTE"){

        
        htmlContent += '    <div class="info-container" style="margin-top: 30px !important;">'
        htmlContent += '        <form class="personal-info">'
        
        htmlContent += '            <div class="col-sm-6 col-xs-6"> '
        htmlContent += '              <label for="nombre" class="form-info labelFormat">Teléfono: </label>'
        htmlContent += '              <input type="text" class="nombre inputFormat" id="cvPhone"> '
        htmlContent += '            </div>'
        
        htmlContent += '            <div class="col-sm-6 col-xs-6"> '
        htmlContent += '              <label for="email" class="form-info labelFormat">Celular: </label>'
        htmlContent += '              <input type="text" class="email inputFormat" id="cvMobilePhone">' 
        htmlContent += '            </div>'
        
        htmlContent += '            <div class="col-sm-6 col-xs-6">' 
        htmlContent += '              <label for="edad" class="form-info labelFormat">Dirección: </label>'
        htmlContent += '              <input type="text" class="edad inputFormat" id="cvAddress">'
        htmlContent += '            </div>'
        htmlContent += '        </form>'
        htmlContent += '    </div>'

        htmlContent += '<div class="col-md-12 col-sm-6 mb">'
        htmlContent += '    <div class="save-info">'
        htmlContent += '        <a id="" class="btn btn-save btnFormat">Guardar</a>'
        htmlContent += '    </div>'
        htmlContent += '</div>'
            
        document.getElementById("dataContainer").innerHTML = htmlContent;
        
        if(userInfo[0].cvPhone !== 'None')
            $("#cvPhone").val(userInfo[0].cvPhone);
        else
            $("#cvPhone").val('');

        if(userInfo[0].cvMobilePhone !== 'None')
            $("#cvMobilePhone").val(userInfo[0].cvMobilePhone);
        else
            $("#cvMobilePhone").val('');

        if(userInfo[0].cvAddress !== 'None')
            $("#cvAddress").val(userInfo[0].cvAddress);
        else
            $("#cvAddress").val('');
    }

    else{

        htmlContent += '    <div class="info-container" style="margin-top: 30px !important;">'
        htmlContent += '        <form class="personal-info">'
        
        htmlContent += '            <div class="col-sm-6 col-xs-6"> '
        htmlContent += '              <label for="nombre" class="form-info labelFormat">Teléfono: </label>'
        htmlContent += '              <input type="text" class="nombre inputFormat" id="cvPhone"> '
        htmlContent += '            </div>'
        
        htmlContent += '            <div class="col-sm-6 col-xs-6"> '
        htmlContent += '              <label for="email" class="form-info labelFormat">Celular: </label>'
        htmlContent += '              <input type="text" class="email inputFormat" id="cvMobilePhone">' 
        htmlContent += '            </div>'
        
        htmlContent += '            <div class="col-sm-6 col-xs-6">' 
        htmlContent += '              <label for="edad" class="form-info labelFormat">Dirección: </label>'
        htmlContent += '              <input type="text" class="edad inputFormat" id="cvAddress">'
        htmlContent += '            </div>'
        htmlContent += '        </form>'
        htmlContent += '    </div>'

        htmlContent += '<div class="col-md-12 col-sm-6 mb">'
        htmlContent += '    <div class="save-info">'
        htmlContent += '        <a id="" class="btn btn-save btnFormat">Guardar</a>'
        htmlContent += '    </div>'
        htmlContent += '</div>'
            
        document.getElementById("dataContainer").innerHTML = htmlContent;
        
        if(userInfo[0].cvPhone !== 'None')
            $("#cvPhone").val(userInfo[0].cvPhone);
        else
            $("#cvPhone").val('');

        if(userInfo[0].cvMobilePhone !== 'None')
            $("#cvMobilePhone").val(userInfo[0].cvMobilePhone);
        else
            $("#cvMobilePhone").val('');

        if(userInfo[0].cvAddress !== 'None')
            $("#cvAddress").val(userInfo[0].cvAddress);
        else
            $("#cvAddress").val('');
        
    }
}

var cvEditUserData = new CVEditUserData();