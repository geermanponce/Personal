function CVInitGUI()
{
}

CVInitGUI.prototype.setFunctions = function(){/*{{{*/

   var htmlMain='';

   htmlMain+='<li class="voissClick"><a onclick="voissWindow.showWindow(\'Inicio\')"><i class="fa fa-chevron-circle-right"></i>Inicio</a></li>';

   if(document.getElementById("voissSectionMain"))
      document.getElementById("voissSectionMain").innerHTML=htmlMain;

}

var cvInitGUI= new CVInitGUI();
