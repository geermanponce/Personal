function CVUserMain()/*{{{*/
{

}
/*}}}*/

CVUserMain.prototype.showWindow = function(){
	jobPostulant = JSON.parse(localStorage.JobPostulant || "{}");
	jobOffers = JSON.parse(localStorage.jobOffers || "{}");
	var htmlContent = '';

	htmlContent += '<div class="container custom-bar-chart">'

	htmlContent += '  <!-- Panels -->'
	htmlContent += '  <div class="swipe">'
	htmlContent += '    <div class="panelImage" data-img="http://payload100.cargocollective.com/1/9/296422/4317770/1%20-%20Landscape%201_o.jpg"></div>'
	htmlContent += '	<div class="panelImage" data-img="http://payload100.cargocollective.com/1/9/296422/4317770/1%20-%20Landscape%208_o.jpg"></div>'
    htmlContent += '	<div class="panelImage" data-img="http://payload100.cargocollective.com/1/9/296422/4317770/1%20-%20Landscape%209_o.jpg"></div>'
    htmlContent += '	<div class="panelImage" data-img="http://payload100.cargocollective.com/1/9/296422/4317770/2-%20Arquitectura%205_o.jpg"></div>'
    htmlContent += '	<div class="panelImage" data-img="http://payload100.cargocollective.com/1/9/296422/4317770/3%20-%20Interiores%201_o.jpg"></div>'
	htmlContent += '  </div>'

	for(currentData in jobOffers){
		htmlContent += '  <div class="info">'
		htmlContent += '    <div class="inner panelInfo">'
		htmlContent += '      <h3 class="vacanteMain">'+jobOffers[currentData].cvTittle+'</h3>'
		if(jobOffers[currentData].cvSalary !== '0')
			htmlContent += '      <p class="salarioMain">'+jobOffers[currentData].cvSalary+'</p>'
		else
			htmlContent += '      <p class="salarioMain"></p>'
		htmlContent += '    </div>'
		htmlContent += '    <div class="buttons">'
		htmlContent += '      <button class="btn-prev" disabled>&larr;</button>'
		htmlContent += '      <button class="btn-next">&rarr;</button>'
		htmlContent += '    </div>'
		htmlContent += '  </div>'
	}


	htmlContent += '</div>'

	htmlContent += '<div class="col-md-12 col-sm-4 mb">'
	htmlContent += '    <div class="grey-panel pn donut-chart">'
	htmlContent += '      <div class="grey-header">'
	htmlContent += '        <h5>Últimas postulaciones</h5>'
	htmlContent += '      </div>'
    if(jobPostulant == 'NO_INFO'){
    	htmlContent += '      <div class="grey-header">'
		htmlContent += '        <h3>No te has postulado a ninguna vacante.</h3>'
		htmlContent += '      </div>'
    }
    else{

		htmlContent+='           <table class="table col-sm-12 col-xs-6" id="voissMainTable">';
	    htmlContent+='            <tbody id="voissTableDeliveryCatalog">';
	    htmlContent+='             <tr class="TableHeader" style="font-size: 15px !important;">';
	    htmlContent+='               <th class="alignCenter">Empresa<br>Puesto</th>';
	    htmlContent+='               <th class="alignCenter">Sueldo</th>';
	    htmlContent+='               <th class="alignCenter">Ciudad</th>';
	    htmlContent+='               <th class="alignCenter">Estatus</th>';

	    htmlContent+='             </tr>';


	    for(currentData in jobPostulant){
		    htmlContent+='             <tr class="">'
		    htmlContent+='               <th class="alignCenter">'+jobPostulant[currentData].cvCompanyId+'<br>'+jobPostulant[currentData].cvTittle+'</th>';
		    if(jobPostulant[currentData].cvSalary !== '0')
		    	htmlContent+='               <th class="alignCenter">'+jobPostulant[currentData].cvSalary+'</th>';
		   	else
		   		htmlContent+='               <th class="alignCenter">No especificado</th>';
		    htmlContent+='               <th class="alignCenter">'+jobPostulant[currentData].cvCity+'</th>';
		    htmlContent+='               <th class="alignCenter">Postulado</th>';

		    htmlContent+='             </tr>';
		}
	    htmlContent+='           </tbody></table>';
		
		htmlContent += '      <div class="grey-header">'
		htmlContent += '        <h5><u>ver todas</u></h5>'
		htmlContent += '      </div>'
	   

    }
    htmlContent += '    </div>'
    htmlContent += '</div>'

	document.getElementById("divMainContent").innerHTML = htmlContent;
	$(document).ready(function(){

	  //Swipe speed:
	  var tolerance = 100; //px.
	  var speed = 650; //ms.

	  //Elements:
	  var interactiveElements = $('input, button, a');
	  var itemsLength = $('.panelImage').length;
	  //var itemsInfo = $('.panelInfo').length;
	  var active = 1;

	  //Background images:
	  for (i=1; i<=itemsLength; i++){
	    var $layer = $(".panelImage:nth-child("+i+")");
	    var bgImg = $layer.attr("data-img");
	    $layer.css({
	      "background": "url("+bgImg+") no-repeat center / cover"
	    });
	  };

	  //Transitions:
	  setTimeout(function() {
	    $(".panelImage").css({
	      "transition": "cubic-bezier(.4,.95,.5,1.5) "+speed+"ms"
	    });
	  }, 200);

	  //Presets:
	  $(".panelImage:not(:first)").addClass("right");

	  //Swipe:
	  function swipeScreen() {
	    $('.swipe').on('mousedown touchstart', function(e) {

	      var touch = e.originalEvent.touches;
	      var start = touch ? touch[0].pageX : e.pageX;
	      var difference;

	      $(this).on('mousemove touchmove', function(e) {
	        var contact = e.originalEvent.touches,
	        end = contact ? contact[0].pageX : e.pageX;
	        difference = end-start;
	      });

	      //On touch end:
	      $(window).one('mouseup touchend', function(e) {
	        e.preventDefault();

	        //Swipe right:
	        if (active < itemsLength && difference < -tolerance) {
	          $(".panelImage:nth-child("+active+")").addClass("left");
	          $(".panelImage:nth-child("+(active+1)+")").removeClass("right");
	          active += 1;
	          btnDisable();
	        };

	        // Swipe left:
	        if (active > 1 && difference > tolerance) {
	          $(".panelImage:nth-child("+(active-1)+")").removeClass("left");
	          $(".panelImage:nth-child("+active+")").addClass("right");
	          active -= 1;
	          btnDisable();
	        };

	        $('.swipe').off('mousemove touchmove');
	      });

	    });
	  };
	  swipeScreen();

	  //Prevent swipe on interactive elements:
	  interactiveElements.on('touchstart touchend touchup', function(e) {
	    e.stopPropagation();
	  });

	  //Buttons:
	  $(".btn-prev").click(function(){
	    // Swipe left:
	    if (active > 1) {
	      $(".panelImage:nth-child("+(active-1)+")").removeClass("left");
	      $(".panelImage:nth-child("+active+")").addClass("right");
	      active -= 1;
	      btnDisable();
	    };
	  });

	  $(".btn-next").click(function(){
	    //Swipe right:
	    if (active < itemsLength) {
	      $(".panelImage:nth-child("+active+")").addClass("left");
	      $(".panelImage:nth-child("+(active+1)+")").removeClass("right");
	      active += 1;
	      btnDisable();
	    };
	  });

	  function btnDisable() {
	    if (active >= itemsLength) {
	      $(".btn-next").prop("disabled", true);
	      $(".btn-prev").prop("disabled", false);
	    }
	    else if (active <= 1) {
	      $(".btn-prev").prop("disabled", true);
	      $(".btn-next").prop("disabled", false);
	    }
	    else {
	      $(".btn-prev, .btn-next").prop("disabled", false);
	    };
	  };

	});
}

var cvUserMain= new CVUserMain();