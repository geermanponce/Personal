function CVPostulantModify(){
    
}

CVPostulantModify.prototype.showWindow = function(){
    var htmlContent = '';

    htmlContent += '<div class="col-md-12 col-sm-6 mb">'
    htmlContent += '	<ul class="menu-edit-cv">'
    htmlContent += '		<li class="col-md-2 btn-color buttonList"><a id="academicExperience"><i class="fas fa-graduation-cap"></i>Datos academicos</a></li>'
    htmlContent += '		<li class="col-md-2 btn-color buttonList"><a id="workExperience"><i class="fas fa-briefcase"></i>Datos laborales</a></li>'
    htmlContent += '		<li class="col-md-2 btn-color buttonList"><a id="abilities"><i class="fas fas fa-address-card"></i>Aptitudes</a></li>'
    htmlContent += '		<li class="col-md-2 btn-color buttonList"><a id="tools"><i class="fas fa-child"></i>Herramientas</a></li>'
    htmlContent += '		<li class="col-md-2 btn-color buttonList"><a id="languages"><i class="fas fas fa-heart"></i>Idiomas</a></li>'
    htmlContent += '		<li class="col-md-2 btn-color buttonList"><a id="other"><i class="fas fa-user-plus"></i>Otros</a></li>'
    htmlContent += '	</ul>'
    htmlContent += '</div>'

    htmlContent += '<div class="col-md-12 col-sm-6 mb" id="dataContainer">'
    
    htmlContent += '</div>'


    document.getElementById("divMainContent").innerHTML = htmlContent;

    cvPostulantModify.showAcademicExperience();

    $("#academicExperience").click(function(){
        cvPostulantModify.showAcademicExperience();
    });
    $("#workExperience").click(function(){
        cvPostulantModify.showWorkExperience();
    });
    $("#abilities").click(function(){
        cvPostulantModify.showAbilities();
    });
    $("#tools").click(function(){
        cvPostulantModify.showTools();
    });
    $("#languages").click(function(){
        cvPostulantModify.showLanguages();
    });
    $("#other").click(function(){
        cvPostulantModify.showOther();
    });
    
}

CVPostulantModify.prototype.showAcademicExperience = function(){
    userCV = JSON.parse(localStorage.userCV || "{}");
    var htmlContent = '';

    for(currentData in userCV){

        if(userCV[currentData].academicExperience !== ''){
            for(currentAcademic in userCV[currentData].academicExperience){
                htmlContent += '    <div class="info-container" id="'+userCV[currentData].academicExperience[currentAcademic].cvAcademicExpId+'" style="margin-top: 30px !important;">'
                htmlContent += '        <div class="btnDelete">'
                htmlContent += '            <i class="fa fa-trash fa-2x changeColor" onclick="cvPostulantModify.deleteAcademicExperience('+userCV[currentData].academicExperience[currentAcademic].cvAcademicExpId+')" aria-hidden="true"></i>'
                htmlContent += '        </div>'
                htmlContent += '        <div class="btnEdit">'
                htmlContent += '            <i class="fa fa-pencil fa-2x changeColor" onclick="cvPostulantModify.editAcademicExperience('+userCV[currentData].academicExperience[currentAcademic].cvAcademicExpId+')" aria-hidden="true"></i>'
                htmlContent += '        </div>'
                htmlContent += '        <form class="personal-info">'

                htmlContent += '            <div class="col-sm-6 col-xs-6" style="display:none;"> '
                htmlContent += '              <label for="nombre" class="form-info labelFormat">ID: </label>'
                htmlContent += '              <input type="text" readonly class="nombre inputFormat" id="cvAcademicExpId'+userCV[currentData].academicExperience[currentAcademic].cvAcademicExpId+'" value="'+userCV[currentData].academicExperience[currentAcademic].cvAcademicExpId+'"> '
                htmlContent += '            </div>'

                htmlContent += '            <div class="col-sm-6 col-xs-6" style="display:none;"> '
                htmlContent += '              <label for="nombre" class="form-info labelFormat">CVID: </label>'
                htmlContent += '              <input type="text" readonly class="nombre inputFormat" id="cvCVId'+userCV[currentData].academicExperience[currentAcademic].cvAcademicExpId+'" value="'+userCV[currentData].academicExperience[currentAcademic].cvCVId+'"> '
                htmlContent += '            </div>'

                htmlContent += '            <div class="col-sm-6 col-xs-6"> '
                htmlContent += '              <label for="nombre" class="form-info labelFormat">Nivel: </label>'
                htmlContent += '              <input type="text" readonly class="nombre inputFormat" id="cvLevel'+userCV[currentData].academicExperience[currentAcademic].cvAcademicExpId+'" value="'+userCV[currentData].academicExperience[currentAcademic].cvLevel+'"> '
                htmlContent += '            </div>'

                htmlContent += '            <div class="col-sm-6 col-xs-6"> '
                htmlContent += '              <label for="nombre" class="form-info labelFormat">Institución: </label>'
                htmlContent += '              <input type="text" readonly class="nombre inputFormat" id="cvInstitute'+userCV[currentData].academicExperience[currentAcademic].cvAcademicExpId+'" value="'+userCV[currentData].academicExperience[currentAcademic].cvInstitute+'"> '
                htmlContent += '            </div>'

                htmlContent += '            <div class="col-sm-6 col-xs-6"> '
                htmlContent += '              <label for="nombre" class="form-info labelFormat">Título: </label>'
                htmlContent += '              <input type="text" readonly class="nombre inputFormat" id="cvDegree'+userCV[currentData].academicExperience[currentAcademic].cvAcademicExpId+'" value="'+userCV[currentData].academicExperience[currentAcademic].cvDegree+'"> '
                htmlContent += '            </div>'

                htmlContent += '            <div class="col-sm-6 col-xs-6"> '
                htmlContent += '              <label for="nombre" class="form-info labelFormat">Fecha de inicio: </label>'
                htmlContent += '              <input type="text" readonly class="nombre inputFormat" id="cvInitDate'+userCV[currentData].academicExperience[currentAcademic].cvAcademicExpId+'" value="'+userCV[currentData].academicExperience[currentAcademic].cvInitDate+'"> '
                htmlContent += '            </div>'

                htmlContent += '            <div class="col-sm-6 col-xs-6"> '
                htmlContent += '              <label for="nombre" class="form-info labelFormat">Fecha de termino: </label>'
                htmlContent += '              <input type="text" readonly class="nombre inputFormat" id="cvEndDate'+userCV[currentData].academicExperience[currentAcademic].cvAcademicExpId+'" value="'+userCV[currentData].academicExperience[currentAcademic].cvEndDate+'"> '
                htmlContent += '            </div>'

                htmlContent += '            <div class="col-sm-6 col-xs-6"> '
                htmlContent += '              <label for="nombre" class="form-info labelFormat">¿Sigue estudiando?: </label>'
                htmlContent += '              <input type="checkbox" class="nombre inputFormat" onclick="return false;" id="cvIsActive'+userCV[currentData].academicExperience[currentAcademic].cvAcademicExpId+'"> '
                htmlContent += '            </div>'
                htmlContent += '        </form>'
                htmlContent += '    </div>'

                
            }
            
        }
    }

    htmlContent += '<div class="col-md-12 col-sm-6 mb" id="newContentAcademic">'
    htmlContent += '</div>'

    htmlContent += '<div class="col-md-12 col-sm-6 mb">'
    htmlContent += '    <div class="save-info">'
    htmlContent += '        <a id="addAcademicExperience" class="btn btn-save btnFormat" onclick="cvPostulantModify.addNewAcademicExperience();">Agregar</a>'
    //htmlContent += '        <a id="saveAcademicExperience" class="btn btn-save btnFormat">Guardar</a>'
    htmlContent += '    </div>'
    htmlContent += '</div>'
     
    document.getElementById("dataContainer").innerHTML = htmlContent;

    for(currentData in userCV){
        if(userCV[currentData].academicExperience !== ''){
            for(currentAcademic in userCV[currentData].academicExperience){
                if(userCV[currentData].academicExperience[currentAcademic].cvIsActive == 'True')
                    document.getElementById("cvIsActive"+userCV[currentData].academicExperience[currentAcademic].cvAcademicExpId).checked = true;
            }

        }
    }

}

CVPostulantModify.prototype.addNewAcademicExperience = function(){

    var dialogContent="";
    dialogContent += ' <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">'
    dialogContent += ' </button>'

    dialogContent += ' <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'
    dialogContent += '   <div class="modal-dialog modal-dialog-centered" role="document">'
    dialogContent += '     <div class="modal-content">'
    dialogContent += '       <div class="modal-header">'
    dialogContent += '         <h4 class="modal-title" id="exampleModalLongTitle">AGREGAR INFORMACÓN ACADÉMICA</h4>'
    dialogContent += '         <button type="button" class="close" data-dismiss="modal" aria-label="Close">'
    dialogContent += '           <span aria-hidden="true">&times;</span>'
    dialogContent += '         </button>'
    dialogContent += '       </div>'
    dialogContent += '       <div class="modal-body">'
    dialogContent += '        <form id="formAcademic">'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Nivel:</label>'
    dialogContent += '              <input type="text" class="form-control" name="cvLevel" id="cvLevel" value="">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Institución:</label>'
    dialogContent += '              <input type="text" class="form-control" name="cvInstitute" id="cvInstitute" value="">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Título:</label>'
    dialogContent += '              <input type="text" class="form-control" name="cvDegree" id="cvDegree" value="">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Fecha de inicio:</label>'
    dialogContent += '              <input type="date" class="form-control" id="cvInitDate" value="">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Fecha de termino:</label>'
    dialogContent += '              <input type="date" class="form-control" id="cvEndDate" value="">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">¿Sigues estudiando?:</label>'
    dialogContent += '              <input type="checkbox" class="ez-checkbox " id="cvIsActive" >'
    dialogContent += '          </div>'
    dialogContent += '        </form>'
    dialogContent += '       </div>'
    dialogContent += '       <div class="modal-footer" id="modalWaiting">'
    dialogContent += '         <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>'
    dialogContent += '         <button type="button" id="addAcademicButton" class="btn btn-primary">Agregar</button>'
    dialogContent += '       </div>'
    dialogContent += '     </div>'
    dialogContent += '   </div>'
    dialogContent += ' </div>'

    document.getElementById('cvConfirmation').innerHTML=dialogContent;
    $('#myModal').modal('show');

    $("#addAcademicButton").click(function(){
        cvPostulantModify.addAcademicExperience();

    });

}

CVPostulantModify.prototype.editAcademicExperience = function(idAcademicExperience){

    var dialogContent="";
    dialogContent += ' <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">'
    dialogContent += ' </button>'

    dialogContent += ' <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'
    dialogContent += '   <div class="modal-dialog modal-dialog-centered" role="document">'
    dialogContent += '     <div class="modal-content">'
    dialogContent += '       <div class="modal-header">'
    dialogContent += '         <h4 class="modal-title" id="exampleModalLongTitle">EDITAR INFORMACÓN ACADÉMICA</h4>'
    dialogContent += '         <button type="button" class="close" data-dismiss="modal" aria-label="Close">'
    dialogContent += '           <span aria-hidden="true">&times;</span>'
    dialogContent += '         </button>'
    dialogContent += '       </div>'
    dialogContent += '       <div class="modal-body">'

    dialogContent += '          <div class="form-group" style="display:none;">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">ID:</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvAcademicExpId" value="'+$("#cvAcademicExpId"+idAcademicExperience).val()+'">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group" style="display:none;">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">CVID:</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvCVId" value="'+$("#cvCVId"+idAcademicExperience).val()+'">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Nivel:</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvLevel" value="'+$("#cvLevel"+idAcademicExperience).val()+'">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Institución:</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvInstitute" value="'+$("#cvInstitute"+idAcademicExperience).val()+'">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Título:</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvDegree" value="'+$("#cvDegree"+idAcademicExperience).val()+'">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Fecha de inicio:</label>'
    dialogContent += '              <input type="date" class="form-control" id="cvInitDate" value="'+$("#cvInitDate"+idAcademicExperience).val()+'">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Fecha de termino:</label>'
    dialogContent += '              <input type="date" class="form-control" id="cvEndDate" value="'+$("#cvEndDate"+idAcademicExperience).val()+'">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">¿Sigues estudiando?:</label>'
    dialogContent += '              <input type="checkbox" class="ez-checkbox " id="cvIsActive">'
    dialogContent += '          </div>'

    dialogContent += '       </div>'
    dialogContent += '       <div class="modal-footer">'
    dialogContent += '         <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>'
    dialogContent += '         <button type="button" class="btn btn-primary" id="editAcademicButton">Editar</button>'
    dialogContent += '       </div>'
    dialogContent += '     </div>'
    dialogContent += '   </div>'
    dialogContent += ' </div>'

    document.getElementById('cvConfirmation').innerHTML=dialogContent;
    $('#myModal').modal('show');

    if(document.getElementById("cvIsActive"+idAcademicExperience).checked == true)
                    document.getElementById("cvIsActive").checked = true;

    $("#editAcademicButton").click(function(){
        cvPostulantModify.editAcademicExp();

    });

}

CVPostulantModify.prototype.showWorkExperience = function(){
    userCV = JSON.parse(localStorage.userCV || "{}");
    var htmlContent = '';

    for(currentData in userCV){

        if(userCV[currentData].workExperience !== ''){
            for(currentWork in userCV[currentData].workExperience){
                htmlContent += '    <div class="info-container" id="'+userCV[currentData].workExperience[currentWork].cvworkExpId+'" style="margin-top: 30px !important;">'
                htmlContent += '        <div class="btnDelete">'
                htmlContent += '            <i class="fa fa-trash fa-2x changeColor" onclick="cvPostulantModify.deleteWorkExperience('+userCV[currentData].workExperience[currentWork].cvworkExpId+')" aria-hidden="true"></i>'
                htmlContent += '        </div>'
                htmlContent += '        <div class="btnEdit">'
                htmlContent += '            <i class="fa fa-pencil fa-2x changeColor" onclick="cvPostulantModify.editWorkExperience('+userCV[currentData].workExperience[currentWork].cvworkExpId+')" aria-hidden="true"></i>'
                htmlContent += '        </div>'
                htmlContent += '        <form class="personal-info">'

                htmlContent += '            <div class="col-sm-6 col-xs-6" style="display:none;"> '
                htmlContent += '              <label for="nombre" class="form-info labelFormat">ID: </label>'
                htmlContent += '              <input type="text" class="nombre inputFormat" id="cvworkExpId'+userCV[currentData].workExperience[currentWork].cvworkExpId+'" value="'+userCV[currentData].workExperience[currentWork].cvworkExpId+'"> '
                htmlContent += '            </div>'

                htmlContent += '            <div class="col-sm-6 col-xs-6" style="display:none;"> '
                htmlContent += '              <label for="nombre" class="form-info labelFormat">CVID: </label>'
                htmlContent += '              <input type="text" class="nombre inputFormat" id="cvCVId'+userCV[currentData].workExperience[currentWork].cvworkExpId+'" value="'+userCV[currentData].workExperience[currentWork].cvCVId+'"> '
                htmlContent += '            </div>'

                htmlContent += '            <div class="col-sm-6 col-xs-6"> '
                htmlContent += '              <label for="nombre" class="form-info labelFormat">Puesto: </label>'
                htmlContent += '              <input type="text" class="nombre inputFormat" id="cvJobTittle'+userCV[currentData].workExperience[currentWork].cvworkExpId+'" value="'+userCV[currentData].workExperience[currentWork].cvJobTittle+'"> '
                htmlContent += '            </div>'

                htmlContent += '            <div class="col-sm-6 col-xs-6"> '
                htmlContent += '              <label for="nombre" class="form-info labelFormat">Empresa: </label>'
                htmlContent += '              <input type="text" class="nombre inputFormat" id="cvCompanyName'+userCV[currentData].workExperience[currentWork].cvworkExpId+'" value="'+userCV[currentData].workExperience[currentWork].cvCompanyName+'"> '
                htmlContent += '            </div>'

                htmlContent += '            <div class="col-sm-6 col-xs-6"> '
                htmlContent += '              <label for="nombre" class="form-info labelFormat">Actividades: </label>'
                htmlContent += '              <input type="text" class="nombre inputFormat" id="cvActivities'+userCV[currentData].workExperience[currentWork].cvworkExpId+'" value="'+userCV[currentData].workExperience[currentWork].cvActivities+'"> '
                htmlContent += '            </div>'

                htmlContent += '            <div class="col-sm-6 col-xs-6"> '
                htmlContent += '              <label for="nombre" class="form-info labelFormat">Fecha de inicio: </label>'
                htmlContent += '              <input type="text" class="nombre inputFormat" id="cvInitDate'+userCV[currentData].workExperience[currentWork].cvworkExpId+'" value="'+userCV[currentData].workExperience[currentWork].cvInitDate+'"> '
                htmlContent += '            </div>'

                htmlContent += '            <div class="col-sm-6 col-xs-6"> '
                htmlContent += '              <label for="nombre" class="form-info labelFormat">Fecha de termino: </label>'
                htmlContent += '              <input type="text" class="nombre inputFormat" id="cvEndDate'+userCV[currentData].workExperience[currentWork].cvworkExpId+'" value="'+userCV[currentData].workExperience[currentWork].cvEndDate+'"> '
                htmlContent += '            </div>'

                htmlContent += '            <div class="col-sm-6 col-xs-6"> '
                htmlContent += '              <label for="nombre" class="form-info labelFormat">¿Sigue estudiando?: </label>'
                htmlContent += '              <input type="checkbox" class="nombre inputFormat" onclick="return false;" id="cvIsActive'+userCV[currentData].workExperience[currentWork].cvworkExpId+'" value="'+userCV[currentData].workExperience[currentWork].cvIsActive+'"> '
                htmlContent += '            </div>'
                htmlContent += '        </form>'
                htmlContent += '    </div>'
            }
            
        }
    }

    htmlContent += '<div class="col-md-12 col-sm-6 mb" id="newContentWork">'
    htmlContent += '</div>'

    htmlContent += '<div class="col-md-12 col-sm-6 mb">'
    htmlContent += '    <div class="save-info">'
    htmlContent += '        <a id="addWorkExperience" class="btn btn-save btnFormat" onclick="cvPostulantModify.addNewWorkExperience();">Agregar</a>'
    //htmlContent += '        <a id="" class="btn btn-save btnFormat">Guardar</a>'
    htmlContent += '    </div>'
    htmlContent += '</div>'
     
    document.getElementById("dataContainer").innerHTML = htmlContent;

    for(currentData in userCV){
        if(userCV[currentData].workExperience !== ''){
            for(currentWork in userCV[currentData].workExperience){
                if(userCV[currentData].workExperience[currentWork].cvIsActive == 'True')
                    document.getElementById("cvIsActive"+userCV[currentData].workExperience[currentWork].cvworkExpId).checked = true;
            }

        }
    }

}

CVPostulantModify.prototype.addNewWorkExperience = function(){

    var dialogContent="";
    dialogContent += ' <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">'
    dialogContent += ' </button>'

    dialogContent += ' <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'
    dialogContent += '   <div class="modal-dialog modal-dialog-centered" role="document">'
    dialogContent += '     <div class="modal-content">'
    dialogContent += '       <div class="modal-header">'
    dialogContent += '         <h4 class="modal-title" id="exampleModalLongTitle">AGREGAR INFORMACÓN LABORAL</h4>'
    dialogContent += '         <button type="button" class="close" data-dismiss="modal" aria-label="Close">'
    dialogContent += '           <span aria-hidden="true">&times;</span>'
    dialogContent += '         </button>'
    dialogContent += '       </div>'
    dialogContent += '       <div class="modal-body">'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Puesto:</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvJobTittle" value="">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Empresa:</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvCompanyName" value="">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Actividades:</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvActivities" value="">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Fecha de inicio:</label>'
    dialogContent += '              <input type="date" class="form-control" id="cvInitDate" value="">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Fecha de termino:</label>'
    dialogContent += '              <input type="date" class="form-control" id="cvEndDate" value="">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">¿Sigues trabajando?:</label>'
    dialogContent += '              <input type="checkbox" class="ez-checkbox " id="cvIsActive" >'
    dialogContent += '          </div>'

    dialogContent += '       </div>'
    dialogContent += '       <div class="modal-footer">'
    dialogContent += '         <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>'
    dialogContent += '         <button type="button" class="btn btn-primary" id="addNewWorkExperience">Agregar</button>'
    dialogContent += '       </div>'
    dialogContent += '     </div>'
    dialogContent += '   </div>'
    dialogContent += ' </div>'

    document.getElementById('cvConfirmation').innerHTML=dialogContent;
    $('#myModal').modal('show');

    $("#addNewWorkExperience").click(function(){
        cvPostulantModify.addWorkExp();
    });

}

CVPostulantModify.prototype.editWorkExperience = function(idWorkExperience){

    var dialogContent="";
    dialogContent += ' <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">'
    dialogContent += ' </button>'

    dialogContent += ' <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'
    dialogContent += '   <div class="modal-dialog modal-dialog-centered" role="document">'
    dialogContent += '     <div class="modal-content">'
    dialogContent += '       <div class="modal-header">'
    dialogContent += '         <h4 class="modal-title" id="exampleModalLongTitle">AGREGAR INFORMACÓN LABORAL</h4>'
    dialogContent += '         <button type="button" class="close" data-dismiss="modal" aria-label="Close">'
    dialogContent += '           <span aria-hidden="true">&times;</span>'
    dialogContent += '         </button>'
    dialogContent += '       </div>'
    dialogContent += '       <div class="modal-body">'

    dialogContent += '          <div class="form-group" style="display:none;">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">ID:</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvworkExpId" value="'+$("#cvworkExpId"+idWorkExperience).val()+'">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group" style="display:none;">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">CVID:</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvCVId" value="'+$("#cvCVId"+idWorkExperience).val()+'">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Puesto:</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvJobTittle" value="'+$("#cvJobTittle"+idWorkExperience).val()+'">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Empresa:</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvCompanyName" value="'+$("#cvCompanyName"+idWorkExperience).val()+'">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Actividades:</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvActivities" value="'+$("#cvActivities"+idWorkExperience).val()+'">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Fecha de inicio:</label>'
    dialogContent += '              <input type="date" class="form-control" id="cvInitDate" value="'+$("#cvInitDate"+idWorkExperience).val()+'">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Fecha de termino:</label>'
    dialogContent += '              <input type="date" class="form-control" id="cvEndDate" value="'+$("#cvEndDate"+idWorkExperience).val()+'">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">¿Sigues trabajando?:</label>'
    dialogContent += '              <input type="checkbox" class="ez-checkbox " id="cvIsActive">'
    dialogContent += '          </div>'

    dialogContent += '       </div>'
    dialogContent += '       <div class="modal-footer">'
    dialogContent += '         <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>'
    dialogContent += '         <button type="button" class="btn btn-primary" id="editWorkButton">Editar</button>'
    dialogContent += '       </div>'
    dialogContent += '     </div>'
    dialogContent += '   </div>'
    dialogContent += ' </div>'

    document.getElementById('cvConfirmation').innerHTML=dialogContent;
    $('#myModal').modal('show');

    if(document.getElementById("cvIsActive"+idWorkExperience).checked == true)
                    document.getElementById("cvIsActive").checked = true;

    $("#editWorkButton").click(function(){
        cvPostulantModify.editWorkExp();
    });

}

CVPostulantModify.prototype.showAbilities = function(){
    userCV = JSON.parse(localStorage.userCV || "{}");
    var htmlContent = '';

    htmlContent += '    <div class="info-container" id="abilitiesContainer" style="margin-top: 30px !important;">'
    htmlContent += '        <form class="personal-info">'


    for(currentData in userCV){

        if(userCV[currentData].abilities !== ''){
            for(currentAbility in userCV[currentData].abilities){
               

                htmlContent += '            <div class="col-sm-6 col-xs-6" style="display:none;"> '
                htmlContent += '              <label for="nombre" class="form-info labelFormat">ID: </label>'
                htmlContent += '              <input type="text" class="nombre inputFormat" id="cvAbilitiesId'+userCV[currentData].abilities[currentAbility].cvAbilitiesId+'" value="'+userCV[currentData].abilities[currentAbility].cvAbilitiesId+'"> '
                htmlContent += '              <i class="fa fa-trash changeColor" readonly aria-hidden="true"></i>'
                htmlContent += '              <i class="fa fa-pencil changeColor" aria-hidden="true"></i>'
                htmlContent += '            </div>'

                htmlContent += '            <div class="col-sm-6 col-xs-6" style="display:none;"> '
                htmlContent += '              <label for="nombre" class="form-info labelFormat">CVID: </label>'
                htmlContent += '              <input type="text" class="nombre inputFormat" readonly id="cvCVId'+userCV[currentData].abilities[currentAbility].cvAbilitiesId+'" value="'+userCV[currentData].abilities[currentAbility].cvCVId+'"> '
                htmlContent += '              <i class="fa fa-trash changeColor" aria-hidden="true"></i>'
                htmlContent += '              <i class="fa fa-pencil changeColor" aria-hidden="true"></i>'
                htmlContent += '            </div>'

                htmlContent += '            <div class="col-sm-6 col-xs-6"> '
                htmlContent += '              <label for="nombre" class="form-info labelFormat">Habilidad: </label>'
                htmlContent += '              <input type="text" class="nombre inputFormat" readonly id="cvAbility'+userCV[currentData].abilities[currentAbility].cvAbilitiesId+'" value="'+userCV[currentData].abilities[currentAbility].cvAbility+'"> '
                htmlContent += '              <i class="fa fa-trash changeColor" aria-hidden="true" onclick="cvPostulantModify.deleteAbility('+userCV[currentData].abilities[currentAbility].cvAbilitiesId+');"></i>'
                htmlContent += '              <i class="fa fa-pencil changeColor" onclick="cvPostulantModify.editAbilities('+userCV[currentData].abilities[currentAbility].cvAbilitiesId+');" aria-hidden="true"></i>'
                htmlContent += '            </div>'
                
            }
            
        }
    }

    htmlContent += '        </form>'
    htmlContent += '    </div>'

    htmlContent += '<div class="col-md-12 col-sm-6 mb">'
    htmlContent += '    <div class="save-info">'
    htmlContent += '        <a id="addAbility" class="btn btn-save btnFormat" onclick="cvPostulantModify.addNewAbility();">Agregar</a>'
    //htmlContent += '        <a id="" class="btn btn-save btnFormat">Guardar</a>'
    htmlContent += '    </div>'
    htmlContent += '</div>'
     
    document.getElementById("dataContainer").innerHTML = htmlContent;

}

CVPostulantModify.prototype.addNewAbility = function(){

    var dialogContent="";
    dialogContent += ' <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">'
    dialogContent += ' </button>'

    dialogContent += ' <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'
    dialogContent += '   <div class="modal-dialog modal-dialog-centered" role="document">'
    dialogContent += '     <div class="modal-content">'
    dialogContent += '       <div class="modal-header">'
    dialogContent += '         <h4 class="modal-title" id="exampleModalLongTitle">AGREGAR HABILIDAD O APTITUD</h4>'
    dialogContent += '         <button type="button" class="close" data-dismiss="modal" aria-label="Close">'
    dialogContent += '           <span aria-hidden="true">&times;</span>'
    dialogContent += '         </button>'
    dialogContent += '       </div>'
    dialogContent += '       <div class="modal-body">'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Habilidad o aptitud:</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvAbility" value="">'
    dialogContent += '          </div>'

    dialogContent += '       </div>'
    dialogContent += '       <div class="modal-footer">'
    dialogContent += '         <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>'
    dialogContent += '         <button type="button" class="btn btn-primary" id="addNewAbility">Agregar</button>'
    dialogContent += '       </div>'
    dialogContent += '     </div>'
    dialogContent += '   </div>'
    dialogContent += ' </div>'

    document.getElementById('cvConfirmation').innerHTML=dialogContent;
    $('#myModal').modal('show');

    $("#addNewAbility").click(function(){
        cvPostulantModify.addNewRecordAbility();
    });

}

CVPostulantModify.prototype.editAbilities = function(IdAbility){

    var dialogContent="";
    dialogContent += ' <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">'
    dialogContent += ' </button>'

    dialogContent += ' <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'
    dialogContent += '   <div class="modal-dialog modal-dialog-centered" role="document">'
    dialogContent += '     <div class="modal-content">'
    dialogContent += '       <div class="modal-header">'
    dialogContent += '         <h4 class="modal-title" id="exampleModalLongTitle">EDITAR HABILIDAD O APTITUD</h4>'
    dialogContent += '         <button type="button" class="close" data-dismiss="modal" aria-label="Close">'
    dialogContent += '           <span aria-hidden="true">&times;</span>'
    dialogContent += '         </button>'
    dialogContent += '       </div>'
    dialogContent += '       <div class="modal-body">'

    dialogContent += '          <div class="form-group" style="display:none;">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">ID</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvAbilitiesId" value="'+$("#cvAbilitiesId"+IdAbility).val()+'">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Habilidad o aptitud:</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvAbility" value="'+$("#cvAbility"+IdAbility).val()+'">'
    dialogContent += '          </div>'

    dialogContent += '       </div>'
    dialogContent += '       <div class="modal-footer">'
    dialogContent += '         <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>'
    dialogContent += '         <button type="button" class="btn btn-primary" id="editAbilityButton">Editar</button>'
    dialogContent += '       </div>'
    dialogContent += '     </div>'
    dialogContent += '   </div>'
    dialogContent += ' </div>'

    document.getElementById('cvConfirmation').innerHTML=dialogContent;
    $('#myModal').modal('show');

    $("#editAbilityButton").click(function(){
        cvPostulantModify.editAbility();
    });

}

CVPostulantModify.prototype.showTools = function(){
    userCV = JSON.parse(localStorage.userCV || "{}");
    var htmlContent = '';

    htmlContent += '    <div class="info-container" id="toolsContainer" style="margin-top: 30px !important;">'
    htmlContent += '        <form class="personal-info">'

    for(currentData in userCV){

        if(userCV[currentData].tools !== ''){
            for(currentTool in userCV[currentData].tools){
               

                htmlContent += '            <div class="col-sm-6 col-xs-6" style="display:none;"> '
                htmlContent += '              <label for="nombre" class="form-info labelFormat">ID: </label>'
                htmlContent += '              <input type="text" class="nombre inputFormat" readonly id="cvToolsId'+userCV[currentData].tools[currentTool].cvToolsId+'" value="'+userCV[currentData].tools[currentTool].cvToolsId+'"> '
                htmlContent += '              <i class="fa fa-trash changeColor" aria-hidden="true"></i>'
                htmlContent += '            </div>'

                htmlContent += '            <div class="col-sm-6 col-xs-6" style="display:none;"> '
                htmlContent += '              <label for="nombre" class="form-info labelFormat">CVID: </label>'
                htmlContent += '              <input type="text" class="nombre inputFormat" readonly id="cvCVId'+userCV[currentData].tools[currentTool].cvToolsId+'" value="'+userCV[currentData].tools[currentTool].cvCVId+'"> '
                htmlContent += '              <i class="fa fa-trash changeColor" aria-hidden="true"></i>'
                htmlContent += '            </div>'

                htmlContent += '            <div class="col-sm-6 col-xs-6"> '
                htmlContent += '              <label for="nombre" class="form-info labelFormat">Herramienta: </label>'
                htmlContent += '              <input type="text" class="nombre inputFormat" readonly id="cvtool'+userCV[currentData].tools[currentTool].cvToolsId+'" value="'+userCV[currentData].tools[currentTool].cvtool+'"> '
                htmlContent += '              <i class="fa fa-trash changeColor" onclick="cvPostulantModify.deleteTool('+userCV[currentData].tools[currentTool].cvToolsId+');" aria-hidden="true"></i>'
                htmlContent += '              <i class="fa fa-pencil changeColor" onclick="cvPostulantModify.editTools('+userCV[currentData].tools[currentTool].cvToolsId+');" aria-hidden="true"></i>'
                htmlContent += '            </div>'
                
            }
            
        }
    }

    htmlContent += '        </form>'
    htmlContent += '    </div>'

    htmlContent += '<div class="col-md-12 col-sm-6 mb">'
    htmlContent += '    <div class="save-info">'
    htmlContent += '        <a id="addTool" class="btn btn-save btnFormat" onclick="cvPostulantModify.addNewTool();">Agregar</a>'
    //htmlContent += '        <a id="" class="btn btn-save btnFormat">Guardar</a>'
    htmlContent += '    </div>'
    htmlContent += '</div>'
     
    document.getElementById("dataContainer").innerHTML = htmlContent;


}

CVPostulantModify.prototype.addNewTool = function(){

    var dialogContent="";
    dialogContent += ' <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">'
    dialogContent += ' </button>'

    dialogContent += ' <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'
    dialogContent += '   <div class="modal-dialog modal-dialog-centered" role="document">'
    dialogContent += '     <div class="modal-content">'
    dialogContent += '       <div class="modal-header">'
    dialogContent += '         <h4 class="modal-title" id="exampleModalLongTitle">AGREGAR HERRAMIENTA</h4>'
    dialogContent += '         <button type="button" class="close" data-dismiss="modal" aria-label="Close">'
    dialogContent += '           <span aria-hidden="true">&times;</span>'
    dialogContent += '         </button>'
    dialogContent += '       </div>'
    dialogContent += '       <div class="modal-body">'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Herramienta:</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvtool" value="">'
    dialogContent += '          </div>'

    dialogContent += '       </div>'
    dialogContent += '       <div class="modal-footer">'
    dialogContent += '         <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>'
    dialogContent += '         <button type="button" class="btn btn-primary" id="addToolButton">Agregar</button>'
    dialogContent += '       </div>'
    dialogContent += '     </div>'
    dialogContent += '   </div>'
    dialogContent += ' </div>'

    document.getElementById('cvConfirmation').innerHTML=dialogContent;
    $('#myModal').modal('show');

    $("#addToolButton").click(function(){
        cvPostulantModify.addNewRecordTool();
    });

}

CVPostulantModify.prototype.editTools = function(IdTool){

    var dialogContent="";
    dialogContent += ' <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">'
    dialogContent += ' </button>'

    dialogContent += ' <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'
    dialogContent += '   <div class="modal-dialog modal-dialog-centered" role="document">'
    dialogContent += '     <div class="modal-content">'
    dialogContent += '       <div class="modal-header">'
    dialogContent += '         <h4 class="modal-title" id="exampleModalLongTitle">EDITAR HERRAMIENTA</h4>'
    dialogContent += '         <button type="button" class="close" data-dismiss="modal" aria-label="Close">'
    dialogContent += '           <span aria-hidden="true">&times;</span>'
    dialogContent += '         </button>'
    dialogContent += '       </div>'
    dialogContent += '       <div class="modal-body">'

    dialogContent += '          <div class="form-group" style="display:none;">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">ID:</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvToolsId" value="'+$("#cvToolsId"+IdTool).val()+'">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Habilidad o aptitud:</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvtool" value="'+$("#cvtool"+IdTool).val()+'">'
    dialogContent += '          </div>'

    dialogContent += '       </div>'
    dialogContent += '       <div class="modal-footer">'
    dialogContent += '         <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>'
    dialogContent += '         <button type="button" class="btn btn-primary" id="editTollButton">Editar</button>'
    dialogContent += '       </div>'
    dialogContent += '     </div>'
    dialogContent += '   </div>'
    dialogContent += ' </div>'

    document.getElementById('cvConfirmation').innerHTML=dialogContent;
    $('#myModal').modal('show');

    $("#editTollButton").click(function(){
        cvPostulantModify.editRecordTool();
    });

}

CVPostulantModify.prototype.showLanguages = function(){
    userCV = JSON.parse(localStorage.userCV || "{}");
    var htmlContent = '';

    htmlContent += '    <div class="info-container" id="languagesContainer" style="margin-top: 30px !important;">'
    htmlContent += '        <form class="personal-info">'

    for(currentData in userCV){

        if(userCV[currentData].languages !== ''){
            for(currentLanguages in userCV[currentData].languages){
                

                htmlContent += '            <div class="col-sm-6 col-xs-6" style="display:none;"> '
                htmlContent += '              <label for="nombre" class="form-info labelFormat">ID: </label>'
                htmlContent += '              <input type="text" class="nombre inputFormat" id="cvLanguagesId'+userCV[currentData].languages[currentLanguages].cvLanguagesId+'" value="'+userCV[currentData].languages[currentLanguages].cvLanguagesId+'"> '
                htmlContent += '              <i class="fa fa-trash changeColor" aria-hidden="true"></i>'
                htmlContent += '            </div>'

                htmlContent += '            <div class="col-sm-6 col-xs-6" style="display:none;"> '
                htmlContent += '              <label for="nombre" class="form-info labelFormat">CVID: </label>'
                htmlContent += '              <input type="text" class="nombre inputFormat" id="cvCVId'+userCV[currentData].languages[currentLanguages].cvLanguagesId+'" value="'+userCV[currentData].languages[currentLanguages].cvCVId+'"> '
                htmlContent += '              <i class="fa fa-trash changeColor" aria-hidden="true"></i>'
                htmlContent += '            </div>'

                htmlContent += '            <div class="col-sm-12 col-xs-6"> '
                htmlContent += '                <div class="col-sm-6 col-xs-6"> '
                htmlContent += '                    <label for="nombre" class="form-info labelFormat">Idioma: </label>'
                htmlContent += '                    <input type="text" class="nombre inputFormat" readonly id="cvLanguage'+userCV[currentData].languages[currentLanguages].cvLanguagesId+'" value="'+userCV[currentData].languages[currentLanguages].cvLanguage+'"> '
                htmlContent += '                </div>'

                htmlContent += '                <div class="col-sm-6 col-xs-6"> '
                htmlContent += '                    <label for="nombre" class="form-info labelFormat">Nivel: </label>'
                htmlContent += '                    <input type="text" class="nombre inputFormat" readonly id="cvLevel'+userCV[currentData].languages[currentLanguages].cvLanguagesId+'" value="'+userCV[currentData].languages[currentLanguages].cvLevel+'"> '
                htmlContent += '                </div>'
                htmlContent += '                <i class="fa fa-trash fa-2x changeColor" onclick="cvPostulantModify.deleteLanguages('+userCV[currentData].languages[currentLanguages].cvLanguagesId+')" style="position:absolute;" aria-hidden="true"></i>'
                htmlContent += '                <i class="fa fa-pencil fa-2x changeColor" onclick="cvPostulantModify.editLanguages('+userCV[currentData].languages[currentLanguages].cvLanguagesId+')" style="position:absolute; margin-left: 25px;" aria-hidden="true"></i>'
                htmlContent += '            </div>'
                
            }
            
        }
    }

    htmlContent += '        </form>'
    htmlContent += '    </div>'

    htmlContent += '<div class="col-md-12 col-sm-6 mb">'
    htmlContent += '    <div class="save-info">'
    htmlContent += '        <a id="addLanguage" class="btn btn-save btnFormat" onclick="cvPostulantModify.addNewLanguage();">Agregar</a>'
    //htmlContent += '        <a id="" class="btn btn-save btnFormat">Guardar</a>'
    htmlContent += '    </div>'
    htmlContent += '</div>'
     
    document.getElementById("dataContainer").innerHTML = htmlContent;

}

CVPostulantModify.prototype.addNewLanguage = function(){

    var dialogContent="";
    dialogContent += ' <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">'
    dialogContent += ' </button>'

    dialogContent += ' <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'
    dialogContent += '   <div class="modal-dialog modal-dialog-centered" role="document">'
    dialogContent += '     <div class="modal-content">'
    dialogContent += '       <div class="modal-header">'
    dialogContent += '         <h4 class="modal-title" id="exampleModalLongTitle">AGREGAR IDIOMA</h4>'
    dialogContent += '         <button type="button" class="close" data-dismiss="modal" aria-label="Close">'
    dialogContent += '           <span aria-hidden="true">&times;</span>'
    dialogContent += '         </button>'
    dialogContent += '       </div>'
    dialogContent += '       <div class="modal-body">'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Idioma:</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvLanguage" value="">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Nivel:</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvLevel" value="">'
    dialogContent += '          </div>'

    dialogContent += '       </div>'
    dialogContent += '       <div class="modal-footer">'
    dialogContent += '         <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>'
    dialogContent += '         <button type="button" class="btn btn-primary" id="addLanguageButton">Agregar</button>'
    dialogContent += '       </div>'
    dialogContent += '     </div>'
    dialogContent += '   </div>'
    dialogContent += ' </div>'

    document.getElementById('cvConfirmation').innerHTML=dialogContent;
    $('#myModal').modal('show');

    $("#addLanguageButton").click(function(){
        cvPostulantModify.addRecordLanguage();
    });

}

CVPostulantModify.prototype.editLanguages = function(IdLanguage){

    var dialogContent="";
    dialogContent += ' <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">'
    dialogContent += ' </button>'

    dialogContent += ' <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'
    dialogContent += '   <div class="modal-dialog modal-dialog-centered" role="document">'
    dialogContent += '     <div class="modal-content">'
    dialogContent += '       <div class="modal-header">'
    dialogContent += '         <h4 class="modal-title" id="exampleModalLongTitle">EDITAR IDIOMA</h4>'
    dialogContent += '         <button type="button" class="close" data-dismiss="modal" aria-label="Close">'
    dialogContent += '           <span aria-hidden="true">&times;</span>'
    dialogContent += '         </button>'
    dialogContent += '       </div>'
    dialogContent += '       <div class="modal-body">'

    dialogContent += '          <div class="form-group" style="display:none;">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">ID:</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvLanguagesId" value="'+$("#cvLanguagesId"+IdLanguage).val()+'">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Idioma</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvLanguage" value="'+$("#cvLanguage"+IdLanguage).val()+'">'
    dialogContent += '          </div>'

    dialogContent += '          <div class="form-group">'
    dialogContent += '              <label for="recipient-name" class="col-form-label">Nivel</label>'
    dialogContent += '              <input type="text" class="form-control" id="cvLevel" value="'+$("#cvLevel"+IdLanguage).val()+'">'
    dialogContent += '          </div>'

    dialogContent += '       </div>'
    dialogContent += '       <div class="modal-footer">'
    dialogContent += '         <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>'
    dialogContent += '         <button type="button" class="btn btn-primary" id="editLanguageButton">Editar</button>'
    dialogContent += '       </div>'
    dialogContent += '     </div>'
    dialogContent += '   </div>'
    dialogContent += ' </div>'

    document.getElementById('cvConfirmation').innerHTML=dialogContent;
    $('#myModal').modal('show');

    $("#editLanguageButton").click(function(){
        cvPostulantModify.editRecordLanguage();
    });

}

CVPostulantModify.prototype.showOther = function(){
    userCV = JSON.parse(localStorage.userCV || "{}");
    var htmlContent = '';

    htmlContent += '    <div class="info-container" style="margin-top: 30px !important;">'
    htmlContent += '        <form class="personal-info">'



    htmlContent += '            <div class="col-sm-6 col-xs-6" style="display:none;"> '
    htmlContent += '              <label for="nombre" class="form-info labelFormat">ID: </label>'
    htmlContent += '              <input type="text" class="nombre inputFormat" id="cvCVId" value="'+userCV[0].cvCVId+'"> '
    htmlContent += '            </div>'

    htmlContent += '            <div class="col-sm-6 col-xs-6" style="display:none;"> '
    htmlContent += '              <label for="nombre" class="form-info">CVID: </label>'
    htmlContent += '              <input type="text" class="nombre inputFormat" id="cvUserPostulantId" value="'+userCV[0].cvUserPostulantId+'"> '
    htmlContent += '            </div>'

    htmlContent += '            <div class="col-sm-12 col-xs-6"> '
    htmlContent += '              <label for="nombre" class="form-info">Objetivo Profesional: </label>'
    htmlContent += '              <textarea class="form-control" id="cvProfessionalObj" placeholder="objetivo profesional" rows="3">'+userCV[0].cvProfessionalObj+'</textarea>'
    htmlContent += '            </div>'

    htmlContent += '            <div class="col-sm-12 col-xs-6"> '
    htmlContent += '              <label for="nombre" class="form-info">Otra información: </label>'
    htmlContent += '              <textarea class="form-control" id="cvOtherInfo" placeholder="otra información" rows="3">'+userCV[0].cvOtherInfo+'</textarea>'
    htmlContent += '            </div>'
                

    htmlContent += '        </form>'
    htmlContent += '    </div>'

    htmlContent += '<div class="col-md-12 col-sm-6 mb">'
    htmlContent += '    <div class="save-info">'
    htmlContent += '        <a id="" class="btn btn-save btnFormat">Guardar</a>'
    htmlContent += '    </div>'
    htmlContent += '</div>'
     
    document.getElementById("dataContainer").innerHTML = htmlContent;

}


CVPostulantModify.prototype.addAcademicExperience = function(){

    var params = "";
    
    var cvLevel          = cvUtils.getPropertyFromHtmlObject("cvLevel","value");
    var cvInstitute      = cvUtils.getPropertyFromHtmlObject("cvInstitute","value");
    var cvDegree         = cvUtils.getPropertyFromHtmlObject("cvDegree","value");
    var cvInitDate       = cvUtils.getPropertyFromHtmlObject("cvInitDate","value");
    var cvEndDate        = cvUtils.getPropertyFromHtmlObject("cvEndDate","value");
    var cvIsActive       = document.getElementById("cvIsActive").checked;
    
    params += "cvID=" + localStorage.cvID;
    params += "&cvUserId=" + localStorage.userID;
    params += "&cvLevel=" + cvLevel;
    params += "&cvInstitute=" + cvInstitute;
    params += "&cvDegree=" + cvDegree;
    params += "&cvInitDate=" + cvInitDate;
    params += "&cvEndDate=" + cvEndDate;
    params += "&cvIsActive=" + cvIsActive;

    cvRequest.makeRequest("ttApp","addAcademicExperience",params);

}

CVPostulantModify.prototype.editAcademicExp = function(){

    var params = "";
    
    var cvAcademicExpId  = cvUtils.getPropertyFromHtmlObject("cvAcademicExpId","value");
    var cvCVId           = cvUtils.getPropertyFromHtmlObject("cvCVId","value");
    var cvLevel          = cvUtils.getPropertyFromHtmlObject("cvLevel","value");
    var cvInstitute      = cvUtils.getPropertyFromHtmlObject("cvInstitute","value");
    var cvDegree         = cvUtils.getPropertyFromHtmlObject("cvDegree","value");
    var cvInitDate       = cvUtils.getPropertyFromHtmlObject("cvInitDate","value");
    var cvEndDate        = cvUtils.getPropertyFromHtmlObject("cvEndDate","value");
    var cvIsActive       = document.getElementById("cvIsActive").checked;
    
    params += "cvID=" + localStorage.cvID;
    params += "&cvAcademicExpId=" + cvAcademicExpId;
    params += "&cvUserId=" + localStorage.userID;
    params += "&cvLevel=" + cvLevel;
    params += "&cvInstitute=" + cvInstitute;
    params += "&cvDegree=" + cvDegree;
    params += "&cvInitDate=" + cvInitDate;
    params += "&cvEndDate=" + cvEndDate;
    params += "&cvIsActive=" + cvIsActive;

    cvRequest.makeRequest("ttApp","editAcademicExperience",params);

}

CVPostulantModify.prototype.deleteAcademicExperience = function(cvAcademicExpId){

    var params = "";
    
    var dialogContent="";
    dialogContent += ' <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">'
    dialogContent += ' </button>'

    dialogContent += ' <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'
    dialogContent += '   <div class="modal-dialog modal-dialog-centered" role="document">'
    dialogContent += '     <div class="modal-content">'
    dialogContent += '       <div class="modal-header">'
    dialogContent += '         <h4 class="modal-title" id="exampleModalLongTitle">Eliminar registro</h4>'
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
    dialogContent += '         <button type="button" class="btn btn-primary deleteBtn" id="deleteAcademic">Borrar</button>'
    dialogContent += '       </div>'
    dialogContent += '     </div>'
    dialogContent += '   </div>'
    dialogContent += ' </div>'

    document.getElementById('cvConfirmation').innerHTML=dialogContent;
    $('#myModal').modal('show');

    $("#deleteAcademic").click(function(){
        var params = "";
        params += "cvID=" + localStorage.cvID;
        params += "&cvUserId=" + localStorage.userID;
        params += "&cvAcademicExpId=" + cvAcademicExpId;
        cvRequest.makeRequest("ttApp","deleteAcademicExperience",params);
    });

}

CVPostulantModify.prototype.addWorkExp = function(){

    var params = "";
    
    var cvJobTittle      = cvUtils.getPropertyFromHtmlObject("cvJobTittle","value");
    var cvCompanyName    = cvUtils.getPropertyFromHtmlObject("cvCompanyName","value");
    var cvActivities     = cvUtils.getPropertyFromHtmlObject("cvActivities","value");
    var cvInitDate       = cvUtils.getPropertyFromHtmlObject("cvInitDate","value");
    var cvEndDate        = cvUtils.getPropertyFromHtmlObject("cvEndDate","value");
    var cvIsActive       = document.getElementById("cvIsActive").checked;
    
    params += "cvID=" + localStorage.cvID;
    params += "&cvUserId=" + localStorage.userID;
    params += "&cvJobTittle=" + cvJobTittle;
    params += "&cvCompanyName=" + cvCompanyName;
    params += "&cvActivities=" + cvActivities;
    params += "&cvInitDate=" + cvInitDate;
    params += "&cvEndDate=" + cvEndDate;
    params += "&cvIsActive=" + cvIsActive;

    cvRequest.makeRequest("ttApp","addWorkExperience",params);

}

CVPostulantModify.prototype.editWorkExp = function(){

    var params = "";
    
    var cvworkExpId      = cvUtils.getPropertyFromHtmlObject("cvworkExpId","value");
    var cvCVId           = cvUtils.getPropertyFromHtmlObject("cvCVId","value");
    var cvJobTittle      = cvUtils.getPropertyFromHtmlObject("cvJobTittle","value");
    var cvCompanyName    = cvUtils.getPropertyFromHtmlObject("cvCompanyName","value");
    var cvActivities     = cvUtils.getPropertyFromHtmlObject("cvActivities","value");
    var cvInitDate       = cvUtils.getPropertyFromHtmlObject("cvInitDate","value");
    var cvEndDate        = cvUtils.getPropertyFromHtmlObject("cvEndDate","value");
    var cvIsActive       = document.getElementById("cvIsActive").checked;
    
    params += "cvID=" + localStorage.cvID;
    params += "&cvworkExpId=" + cvworkExpId;
    params += "&cvUserId=" + localStorage.userID;
    params += "&cvJobTittle=" + cvJobTittle;
    params += "&cvCompanyName=" + cvCompanyName;
    params += "&cvActivities=" + cvActivities;
    params += "&cvInitDate=" + cvInitDate;
    params += "&cvEndDate=" + cvEndDate;
    params += "&cvIsActive=" + cvIsActive;

    cvRequest.makeRequest("ttApp","editWorkExperience",params);

}

CVPostulantModify.prototype.deleteWorkExperience = function(cvworkExpId){

    var params = "";
    
    var dialogContent="";
    dialogContent += ' <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">'
    dialogContent += ' </button>'

    dialogContent += ' <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'
    dialogContent += '   <div class="modal-dialog modal-dialog-centered" role="document">'
    dialogContent += '     <div class="modal-content">'
    dialogContent += '       <div class="modal-header">'
    dialogContent += '         <h4 class="modal-title" id="exampleModalLongTitle">Eliminar registro</h4>'
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
    dialogContent += '         <button type="button" class="btn btn-primary deleteBtn" id="deleteWork">Borrar</button>'
    dialogContent += '       </div>'
    dialogContent += '     </div>'
    dialogContent += '   </div>'
    dialogContent += ' </div>'

    document.getElementById('cvConfirmation').innerHTML=dialogContent;
    $('#myModal').modal('show');

    $("#deleteWork").click(function(){
        var params = "";
        params += "cvID=" + localStorage.cvID;
        params += "&cvUserId=" + localStorage.userID;
        params += "&cvworkExpId=" + cvworkExpId;
        cvRequest.makeRequest("ttApp","deleteWorkExperience",params);
    });

}

CVPostulantModify.prototype.addNewRecordAbility = function(){

    var params = "";
    
    var cvAbility = cvUtils.getPropertyFromHtmlObject("cvAbility","value");

    params += "cvID=" + localStorage.cvID;
    params += "&cvUserId=" + localStorage.userID;
    params += "&cvAbility=" + cvAbility;

    cvRequest.makeRequest("ttApp","addNewAbility",params);

}

CVPostulantModify.prototype.editAbility = function(){

    var params = "";
    
    var cvAbilitiesId  = cvUtils.getPropertyFromHtmlObject("cvAbilitiesId","value");
    var cvAbility      = cvUtils.getPropertyFromHtmlObject("cvAbility","value");
    
    params += "cvID=" + localStorage.cvID;
    params += "&cvAbilitiesId=" + cvAbilitiesId;
    params += "&cvUserId=" + localStorage.userID;
    params += "&cvAbility=" + cvAbility;

    cvRequest.makeRequest("ttApp","editAbility",params);

}

CVPostulantModify.prototype.deleteAbility = function(cvAbilitiesId){

    var params = "";
    
    var dialogContent="";
    dialogContent += ' <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">'
    dialogContent += ' </button>'

    dialogContent += ' <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'
    dialogContent += '   <div class="modal-dialog modal-dialog-centered" role="document">'
    dialogContent += '     <div class="modal-content">'
    dialogContent += '       <div class="modal-header">'
    dialogContent += '         <h4 class="modal-title" id="exampleModalLongTitle">Eliminar registro</h4>'
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
    dialogContent += '         <button type="button" class="btn btn-primary deleteBtn" id="deleteAbility">Borrar</button>'
    dialogContent += '       </div>'
    dialogContent += '     </div>'
    dialogContent += '   </div>'
    dialogContent += ' </div>'

    document.getElementById('cvConfirmation').innerHTML=dialogContent;
    $('#myModal').modal('show');

    $("#deleteAbility").click(function(){
        var params = "";
        params += "cvID=" + localStorage.cvID;
        params += "&cvUserId=" + localStorage.userID;
        params += "&cvAbilitiesId=" + cvAbilitiesId;
        cvRequest.makeRequest("ttApp","deleteAbility",params);
    });

}

CVPostulantModify.prototype.addNewRecordTool = function(){

    var params = "";
    
    var cvtool = cvUtils.getPropertyFromHtmlObject("cvtool","value");

    params += "cvID=" + localStorage.cvID;
    params += "&cvUserId=" + localStorage.userID;
    params += "&cvtool=" + cvtool;

    cvRequest.makeRequest("ttApp","addNewTool",params);

}

CVPostulantModify.prototype.editRecordTool = function(){

    var params = "";
    
    var cvToolsId   = cvUtils.getPropertyFromHtmlObject("cvToolsId","value");
    var cvtool      = cvUtils.getPropertyFromHtmlObject("cvtool","value");
    
    params += "cvID=" + localStorage.cvID;
    params += "&cvToolsId=" + cvToolsId;
    params += "&cvUserId=" + localStorage.userID;
    params += "&cvtool=" + cvtool;

    cvRequest.makeRequest("ttApp","editTool",params);

}

CVPostulantModify.prototype.deleteTool = function(cvToolsId){

    var params = "";
    
    var dialogContent="";
    dialogContent += ' <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">'
    dialogContent += ' </button>'

    dialogContent += ' <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'
    dialogContent += '   <div class="modal-dialog modal-dialog-centered" role="document">'
    dialogContent += '     <div class="modal-content">'
    dialogContent += '       <div class="modal-header">'
    dialogContent += '         <h4 class="modal-title" id="exampleModalLongTitle">Eliminar registro</h4>'
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
    dialogContent += '         <button type="button" class="btn btn-primary deleteBtn" id="deleteTool">Borrar</button>'
    dialogContent += '       </div>'
    dialogContent += '     </div>'
    dialogContent += '   </div>'
    dialogContent += ' </div>'

    document.getElementById('cvConfirmation').innerHTML=dialogContent;
    $('#myModal').modal('show');

    $("#deleteTool").click(function(){
        var params = "";
        params += "cvID=" + localStorage.cvID;
        params += "&cvUserId=" + localStorage.userID;
        params += "&cvToolsId=" + cvToolsId;
        cvRequest.makeRequest("ttApp","deleteTool",params);
    });

}

CVPostulantModify.prototype.addRecordLanguage = function(){

    var params = "";
    
    var cvLanguage = cvUtils.getPropertyFromHtmlObject("cvLanguage","value");
    var cvLevel    = cvUtils.getPropertyFromHtmlObject("cvLevel","value");

    params += "cvID=" + localStorage.cvID;
    params += "&cvUserId=" + localStorage.userID;
    params += "&cvLanguage=" + cvLanguage;
    params += "&cvLevel=" + cvLevel;

    cvRequest.makeRequest("ttApp","addLanguage",params);

}

CVPostulantModify.prototype.editRecordLanguage = function(){

    var params = "";
    
    var cvLanguagesId   = cvUtils.getPropertyFromHtmlObject("cvLanguagesId","value");
    var cvLanguage      = cvUtils.getPropertyFromHtmlObject("cvLanguage","value");
    var cvLevel         = cvUtils.getPropertyFromHtmlObject("cvLevel","value");
    
    params += "cvID=" + localStorage.cvID;
    params += "&cvLanguagesId=" + cvLanguagesId;
    params += "&cvUserId=" + localStorage.userID;
    params += "&cvLanguage=" + cvLanguage;
    params += "&cvLevel=" + cvLevel;

    cvRequest.makeRequest("ttApp","editLanguage",params);

}

CVPostulantModify.prototype.deleteLanguages = function(cvLanguagesId){

    var params = "";
    
    var dialogContent="";
    dialogContent += ' <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">'
    dialogContent += ' </button>'

    dialogContent += ' <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'
    dialogContent += '   <div class="modal-dialog modal-dialog-centered" role="document">'
    dialogContent += '     <div class="modal-content">'
    dialogContent += '       <div class="modal-header">'
    dialogContent += '         <h4 class="modal-title" id="exampleModalLongTitle">Eliminar registro</h4>'
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
    dialogContent += '         <button type="button" class="btn btn-primary deleteBtn" id="deleteTool">Borrar</button>'
    dialogContent += '       </div>'
    dialogContent += '     </div>'
    dialogContent += '   </div>'
    dialogContent += ' </div>'

    document.getElementById('cvConfirmation').innerHTML=dialogContent;
    $('#myModal').modal('show');

    $("#deleteTool").click(function(){
        var params = "";
        params += "cvID=" + localStorage.cvID;
        params += "&cvUserId=" + localStorage.userID;
        params += "&cvLanguagesId=" + cvLanguagesId;
        cvRequest.makeRequest("ttApp","deleteLanguage",params);
    });

}

var cvPostulantModify = new CVPostulantModify();