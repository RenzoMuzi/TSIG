document.addEventListener("DOMContentLoaded", function(event) {
    var equipoSeguido = sessionStorage.getItem('seleccion');
    proximosPartidos(equipoSeguido);
    ultimosResultados(equipoSeguido);
    posicionesSelecciones();
});

var btn2 = document.getElementById("btncerrar");
btn2.addEventListener('click',function(){
	document.getElementById("divPointOverMap").style.display ="none";
	document.getElementById("divCommentOverMap").style.display = "none";
});

 document.getElementById("userlogged").innerHTML=sessionStorage.getItem("nick");
 document.getElementById("Hoteluserlogged").innerHTML=sessionStorage.getItem("hotel");


var btn = document.getElementById("btnAdd");
btn.addEventListener('click',function(){
	var puntaje = 0;
	var comentario = null;
	var nick= null;
	var idExterno = null;
	
	var puntaje = document.getElementById("puntajePunto").value;
	var comentario = document.getElementById("comentarioPunto").value;
	var nick=sessionStorage.getItem('nick');
	var idExterno = FeatureSelected.get("idExterno");
	
	if (document.getElementById("puntajePunto").value != "-"){
		FeatureSelected.set("puntaje","-1-");		
	}
	
	var formatWFS = new ol.format.WFS();
	
	var formatGML = new ol.format.GML({
		featureNS: 'TSIG',
		featureType: 'PuntosDeInteres'
	});

	var xs = new XMLSerializer();
	
	var node;
    node = formatWFS.writeTransaction(null, [FeatureSelected], null, formatGML);
    
    var payload = xs.serializeToString(node);
	
	var urlCall = servName + "registrarComentario?comentario="+comentario+"&nickUser="+nick+"&idPuntoInteres="+idExterno+"&calificacion="+puntaje+"&payload="+payload;
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", urlCall, true);
    xhttp.onload = function () {
    	
    	//alert("RETORNO");
    	document.getElementById("divPointOverMap").style.display ="none";
    	recargarPOI();
    
    }
	xhttp.send();

});

function proximosPartidos(equipoSeguido) {
    var urlCall = servName + "partidosNoTerminados";
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", urlCall, true);
    xhttp.onload = function () {
        var allMatches = JSON.parse(this.response);
        cantidadPartidos = allMatches.length;
        console.log(allMatches);
    
        var placeToAdd = document.getElementById("proximosPartidos");
        for (var i = 0; i < cantidadPartidos; i++) {
            if ((allMatches[i].local.pais == equipoSeguido) || (allMatches[i].visitante.pais == equipoSeguido)) {
                let proximoParitdoWrapper = document.createElement("div");
                proximoParitdoWrapper.setAttribute("class" , "margin-bottom-element");

                let divRow1 = document.createElement("div");
                divRow1.setAttribute("class" , "row no-margin-bottom");

                let divLeft = document.createElement("div");
                divLeft.setAttribute("class" , "col-4 text-left");

                let pEquipoLocal = document.createElement("p");
                if (allMatches[i].local.pais == equipoSeguido) {
                    pEquipoLocal.setAttribute("class" , "font-weight-bold")
                }
                pEquipoLocal.innerHTML = allMatches[i].local.pais;

                divLeft.appendChild(pEquipoLocal);
                divRow1.appendChild(divLeft);

                let divCenter = document.createElement("div");
                divCenter.setAttribute("class" , "col-4 text-center");
                divCenter.innerHTML = `<p> Vs. </p>`;

                divRow1.appendChild(divCenter);

                let divRight = document.createElement("div");
                divRight.setAttribute("class" , "col-4 text-right");
                let pEquipoVisitante = document.createElement("p");
                if (allMatches[i].visitante.pais == equipoSeguido) {
                    pEquipoVisitante.setAttribute("class", "font-weight-bold")
                }
                pEquipoVisitante.innerHTML = allMatches[i].visitante.pais;

                divRight.appendChild(pEquipoVisitante); 

                divRow1.appendChild(divRight);
                proximoParitdoWrapper.appendChild(divRow1);
                
                
                let divRow2 = document.createElement("div");
                divRow2.setAttribute("class" , "row");

                let divSmall = document.createElement("div");
                divSmall.setAttribute("class" , "col text-center small");
                divSmall.innerHTML = allMatches[i].fecha;

                divRow2.appendChild(divSmall);
                proximoParitdoWrapper.appendChild(divRow2);

                placeToAdd.appendChild(proximoParitdoWrapper);
            }
        }
    }
    xhttp.send();        
}

function ultimosResultados(equipoSeguido){
    var urlCall = servName + "partidosTerminados";
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", urlCall, true);
    xhttp.onload = function () {
        var allMatches = JSON.parse(this.response);
        cantidadPartidos = allMatches.length;
        console.log(allMatches);
        var placeToAdd = document.getElementById("ultimosResultados");
        for (var i = 0; i < cantidadPartidos; i++) {
            if ((allMatches[i].local.pais == equipoSeguido) || (allMatches[i].visitante.pais == equipoSeguido)) {
                let ultimoPartidoWrapper = document.createElement("div");
                ultimoPartidoWrapper.setAttribute("class" , "margin-bottom-element");

                let divRow1 = document.createElement("div");
                divRow1.setAttribute("class" , "row no-margin-bottom");

                let divLeft = document.createElement("div");
                divLeft.setAttribute("class" , "col-4 text-left");

                let pEquipoLocal = document.createElement("p");
                if (allMatches[i].local.pais == equipoSeguido) {
                    pEquipoLocal.setAttribute("class" , "font-weight-bold")
                }
                pEquipoLocal.innerHTML = allMatches[i].local.pais;
                divLeft.appendChild(pEquipoLocal);
                divRow1.appendChild(divLeft);

                let spanGolesLocal = document.createElement("span");
                spanGolesLocal.setAttribute("class" , "badge badge-primary badge-pill nice-separation");
                spanGolesLocal.innerHTML = allMatches[i].resultL;

                let spanGolesVisitante = document.createElement("span");
                spanGolesVisitante.setAttribute("class" , "badge badge-primary badge-pill nice-separation");
                spanGolesVisitante.innerHTML = allMatches[i].resultV;

                let divCenter = document.createElement("div");
                divCenter.setAttribute("class" , "col-4 text-center padding-left-right-fixed");
                let pVS = document.createElement("p");
                let stringVS = document.createTextNode(" Vs. ");
                pVS.appendChild(spanGolesLocal);
                pVS.appendChild(stringVS);
                pVS.appendChild(spanGolesVisitante);

                divCenter.appendChild(pVS);
                
                divRow1.appendChild(divCenter);

                let divRight = document.createElement("div");
                divRight.setAttribute("class" , "col-4 text-right");
                let pEquipoVisitante = document.createElement("p");
                if (allMatches[i].visitante.pais == equipoSeguido) {
                    pEquipoVisitante.setAttribute("class", "font-weight-bold")
                }
                pEquipoVisitante.innerHTML = allMatches[i].visitante.pais;          
                divRight.appendChild(pEquipoVisitante); 
                divRow1.appendChild(divRight);

                ultimoPartidoWrapper.appendChild(divRow1);
                
                let divRow2 = document.createElement("div");
                divRow2.setAttribute("class" , "row");

                let divSmall = document.createElement("div");
                divSmall.setAttribute("class" , "col text-center small");
                divSmall.innerHTML = allMatches[i].fecha;

                divRow2.appendChild(divSmall);
                ultimoPartidoWrapper.appendChild(divRow2);

                placeToAdd.appendChild(ultimoPartidoWrapper);
            }
        }
    }
    xhttp.send();        
};


function posicionesSelecciones(){
	var nick=sessionStorage.getItem('nick');
    var urlCall = servName + "allSeleccionesGroup?nick=" + nick;
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", urlCall, true);
    xhttp.onload = function () {
        var selecciones = JSON.parse(this.response);
        var seleccionesOrdenadas = selecciones.sort(function(a, b){
            var aux = 0;
            if (a.puntos == b.puntos) {
                if (a.pais > b.pais){
                    aux = 1;
                } else {
                    aux = -1;
                }
            } else if(a.puntos > b.puntos) {
                aux = -1;
            } else{
                aux = 1;   
            }
            return aux});
        console.log(seleccionesOrdenadas);
        var count = 0;    
        var placeToAdd = document.getElementById("posicionesEquiposList");
        seleccionesOrdenadas.forEach(nEquipo => {
            count++;
            let liPosicionEquipo = document.createElement("li");
            liPosicionEquipo.setAttribute("class" , "list-group-item");
            liPosicionEquipo.innerHTML = count + "- " + nEquipo.pais;

            let badgePoints = document.createElement("span");
            badgePoints.setAttribute("class" , "badge badge-success");
            badgePoints.innerHTML = nEquipo.puntos;
            badgePoints.style.cssFloat = "right";

            liPosicionEquipo.appendChild(badgePoints);

            placeToAdd.appendChild(liPosicionEquipo);
        });
    }
    xhttp.send();
}

