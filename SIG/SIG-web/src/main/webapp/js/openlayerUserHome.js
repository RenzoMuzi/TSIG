

var isThereAFeature = false;
var FeatureSelected = null;


var selectDesc = new ol.interaction.Select({
		//DESCOMENTANDO LA LINEA DE ABAJO EL EVENTO SE EJECUTA CUANDO PASAS EL RATON POR ARRIBA DE LA FEATURE
        //condition: ol.events.condition.pointerMove
	});
	
map.addInteraction(selectDesc);

selectDesc.on('select', function(e) {
	document.getElementById("divPointOverMap").style.display ="block";
	
	e.selected.forEach(function(e){
		document.getElementById("comentarioBody").innerHTML = " ";
	    isThereAFeature = true;
	    FeatureSelected = e;
		document.getElementById("tituloPOI").innerHTML = e.get('nombre');
		document.getElementById("descrPOI").innerHTML = e.get('tipo');
		document.getElementById("puntajePOI").innerHTML = e.get('puntaje');
		var algo = '';
		document.getElementById("buttonComments").addEventListener("click", function(){
			document.getElementById("comentarioBody").innerHTML = " ";
			
			algo = document.getElementById("divCommentOverMap").style.display;
			//console.log(algo);
			if(algo == 'none'){
				document.getElementById("divCommentOverMap").style.display = "block";
				
			}
			if(algo == 'block'){
				document.getElementById("divCommentOverMap").style.display = "none";
				
			}
		  
			var puntoId = e.get('idExterno');
			//console.log("ID PUNTO INTERES: "+puntoId);
			var urlCall = servName + "getComments?idPuntoInteres=" + puntoId;
		    var xhttp;
		    xhttp = new XMLHttpRequest();
		    xhttp.open("GET", urlCall, true);
		    xhttp.onload = function () {
		    	document.getElementById("comentarioBody").innerHTML = " ";
		        var allComments = JSON.parse(this.response);
		        cantidadComentarios = allComments.length;
		        //console.log(cantidadComentarios);
		        
		        var placeToAdd = document.getElementById("comentarioBody");
		        for (var i = 0; i < cantidadComentarios; i++) {
		        	let comentarioWrapper = document.createElement("div");
		        	comentarioWrapper.setAttribute("class" , "margin-bottom-element");
		        	
		        	let pComentarioNick = document.createElement("p");
		        	pComentarioNick.innerHTML = allComments[i].nickUser;
		        	
		        	let pComentario = document.createElement("p");
		        	pComentario.innerHTML = allComments[i].text;
		        	
		        	comentarioWrapper.appendChild(pComentarioNick);
		        	comentarioWrapper.appendChild(pComentario);
		        	placeToAdd.appendChild(comentarioWrapper);
		        }
		    }
		    xhttp.send(); 
	
		});
	
	});
});

