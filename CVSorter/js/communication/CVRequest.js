
function CVRequest()/*{{{*/
{

}
/*}}}*/

CVRequest.prototype.makeRequest= function(moduleName, methodName,params)/*{{{*/
{
    $.ajax({
        url:'http://' + cvString.serviceHost + ':' + 
                        cvString.servicePort + '/' + 
                        moduleName + '/'+ methodName +'/?' + 
                        params + '&format=jsonp&callback=' + 
                        "cvResponse."+methodName.toLowerCase() + 'Response',
        type:"POST",
        dataType: 'jsonp',
        jsonp: "cvResponse."+methodName.toLowerCase()+'Response',
        async:'true',
        timeout: 30000,
        success:function (data) {
          },
        error: function (jqXHR,  exception) {
           if (jqXHR.status == 404) 
               msg = 'Recurso no encontrado (400) ';
           else if (jqXHR.status == 500) 
               msg = 'Error de servidor interno (500)';
           else if (exception === "timeout")
               msg = 'El servidor no esta disponible';
           else if (jqXHR.status === 0) 
               msg = 'No conectado a internet, revise red';
           else if (exception === 'parsererror') 
           {
               msg = 'Fallo petición JSON';
               return;
           }
           else if (exception === 'timeout') 
               msg = 'Tiempo de espera agotado';
           else if (exception === 'abort') 
               msg = 'Petición Ajax cancelada';
           else 
               msg = 'Error desconocido:\n' + jqXHR.responseText;
            //console.log(msg);
            //CVDialog.showOkDialog(CV_DIALOG_ERROR,'Generic Error',msg);
        },

        });
}
/*}}}*/


var cvRequest= new CVRequest();
