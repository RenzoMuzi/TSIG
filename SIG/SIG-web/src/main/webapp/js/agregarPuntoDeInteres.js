

/////////////////////   agregar interaccion con el mapa   ////////////////////////////////////////
map.addLayer(layerWFSPuntoInteres);
var interaction = new ol.interaction.Draw({
	    type: 'Point',
	    source: layerWFSPuntoInteres.getSource()
	});

interaction.on('drawend', function (e) {
	sourceWFSPuntoInteres.clear();
    feat = e.feature;
    feat.setStyle(iconStyle);
});

document.getElementById('list-agregarPuntoInteres-list').addEventListener('click',function(){
	sourceWFSPromocion.clear();
	sourceWFSPuntoInteres.clear();
	map.removeInteraction(interactionPromo);
	map.addInteraction(interaction);

});   


//function onSave( nombre, cantEstrellas, puntaje, tipo, idbasecomun ){
//	if (transactWFSPuntoInteres!=null && feat != null){
//		feat.set("nombre", nombre);
//		feat.set("cantEstrellas", cantEstrellas);
//		feat.set("puntaje", puntaje);
//		feat.set("tipo", tipo);
//		feat.set("idExterno", idbasecomun);
//		
//		transactWFSPuntoInteres(feat);
//		
//		feat = null;
//	}
//}

function cargarPayload(nombre, cantEstrellas, puntaje, tipo){
	feat.set("nombre", nombre);
	feat.set("cantEstrellas", cantEstrellas);
	feat.set("puntaje", puntaje);
	feat.set("tipo", tipo);
	feat.set("idExterno", "-1-");
	
	var node;
    node = formatWFSPuntoInteres.writeTransaction([feat], null, null, formatGMLPuntoInteres);
    
    var payload = xs.serializeToString(node);
    
    return payload;
}

///////////////////// cargar formularios condicinados a tipo de punto de interes /////////////

function loadOtherAttributes() {
    var typePoint = document.getElementById("tipoPuntoDeInteres").value;
    var placeToAddAttributes = document.getElementById("conditionalInputs");
    placeToAddAttributes.innerHTML = "";
    switch (typePoint) {
        case "Hotel":
            /////// input telefono
            let divInputGroupTel = document.createElement("div");
            divInputGroupTel.setAttribute("class" , "form-group");

            let labelNumber = document.createElement("label");
            labelNumber.setAttribute("for" , "telInput");
            labelNumber.innerHTML = "Numero de telefono:";  
            divInputGroupTel.appendChild(labelNumber);

            let inputTel = document.createElement("input");
            inputTel.id = "telInput";
            inputTel.setAttribute("class" , "form-control")
            inputTel.setAttribute("type" , "tel");
            inputTel.setAttribute("placeholder" , "Ej: (099) 29 123");
            divInputGroupTel.appendChild(inputTel);

            placeToAddAttributes.appendChild(divInputGroupTel);

            ////// input de estrellas
            let divInputGroupStar = document.createElement("div");
            divInputGroupStar.setAttribute("class" , "form-group");

           
            let labelStar = document.createElement("label");
            labelStar.setAttribute("for" , "starInput");
            labelStar.innerHTML = "Estrellas:";
            divInputGroupStar.appendChild(labelStar);

            let inputNumber = document.createElement("input");
            inputNumber.id = "starInput";
            inputNumber.setAttribute("type" , "number");
            inputNumber.setAttribute("class" , "form-control");
            inputNumber.setAttribute("name" , "estrellas");
            inputNumber.setAttribute("min" , "1");
            inputNumber.setAttribute("max" , "5");
            inputNumber.setAttribute("placeholder" , "-");
            divInputGroupStar.appendChild(inputNumber);

            placeToAddAttributes.appendChild(divInputGroupStar);

            /////// input capacidad
            let divInputGroupCapacity = document.createElement("div");
            divInputGroupCapacity.setAttribute("class" , "form-group");

            let labelCapacity = document.createElement("label");
            labelCapacity.setAttribute("for" , "capacityInput");
            labelCapacity.innerHTML = "Capacidad:";
            divInputGroupCapacity.appendChild(labelCapacity);

            let inputNumberCapacity = document.createElement("input");
            inputNumberCapacity.id = "capacityInput";
            inputNumberCapacity.setAttribute("type" , "number");
            inputNumberCapacity.setAttribute("class" , "form-control");
            inputNumberCapacity.setAttribute("name" , "capacidad");
            inputNumberCapacity.setAttribute("min" , "50");
            inputNumberCapacity.setAttribute("max" , "5000");
            inputNumberCapacity.setAttribute("step" , "50");
            inputNumberCapacity.setAttribute("placeholder" , "-");
            divInputGroupCapacity.appendChild(inputNumberCapacity);

            placeToAddAttributes.appendChild(divInputGroupCapacity);

            break;

        case "Estadio":
             /////// input capacidad
             let divInputGroupCapacityStadium = document.createElement("div");
             divInputGroupCapacityStadium.setAttribute("class" , "form-group");
 
             let labelCapacityStadium = document.createElement("label");
             labelCapacityStadium.setAttribute("for" , "capacityInputStadium");
             labelCapacityStadium.innerHTML = "Capacidad:";
             divInputGroupCapacityStadium.appendChild(labelCapacityStadium);
 
             let inputNumberCapacityStadium = document.createElement("input");
             inputNumberCapacityStadium.id = "capacityInputStadium";
             inputNumberCapacityStadium.setAttribute("type" , "number");
             inputNumberCapacityStadium.setAttribute("class" , "form-control");
             inputNumberCapacityStadium.setAttribute("name" , "capacidadEstadio");
             inputNumberCapacityStadium.setAttribute("min" , "50");
             inputNumberCapacityStadium.setAttribute("max" , "5000");
             inputNumberCapacityStadium.setAttribute("step" , "50");
             inputNumberCapacityStadium.setAttribute("placeholder" , "-");
             divInputGroupCapacityStadium.appendChild(inputNumberCapacityStadium);
 
             placeToAddAttributes.appendChild(divInputGroupCapacityStadium);
        
            break;

        case "Bar":
            /////// input telefono
            let divInputGroupTelBar = document.createElement("div");
            divInputGroupTelBar.setAttribute("class" , "form-group");

            let labelNumberBar = document.createElement("label");
            labelNumberBar.setAttribute("for" , "telInputBar");
            labelNumberBar.innerHTML = "Numero de telefono:";  
            divInputGroupTelBar.appendChild(labelNumberBar);

            let inputTelBar = document.createElement("input");
            inputTelBar.id = "telInputBar";
            inputTelBar.setAttribute("class" , "form-control")
            inputTelBar.setAttribute("type" , "tel");
            inputTelBar.setAttribute("placeholder" , "Ej: (099) 29 123");
            divInputGroupTelBar.appendChild(inputTelBar);

            placeToAddAttributes.appendChild(divInputGroupTelBar);

            /////// input horario
            ///////abre
            let divInputGroupOpen = document.createElement("div");
            divInputGroupOpen.setAttribute("class" , "form-group");
 
            let labelOpen = document.createElement("label");
            labelOpen.setAttribute("for" , "openInput");
            labelOpen.innerHTML = "Abierto de:";
            divInputGroupOpen.appendChild(labelOpen);
 
            let inputOpen = document.createElement("input");
            inputOpen.id = "openInput";
            inputOpen.setAttribute("type" , "time");
            inputOpen.setAttribute("class" , "form-control");
     
            divInputGroupOpen.appendChild(inputOpen);
 
            placeToAddAttributes.appendChild(divInputGroupOpen);

            ///////cierra
            let divInputGroupClose = document.createElement("div");
            divInputGroupClose.setAttribute("class" , "form-group");
 
            let labelClose = document.createElement("label");
            labelClose.setAttribute("for" , "closeInput");
            labelClose.innerHTML = "Cerrado a partir de:";
            divInputGroupClose.appendChild(labelClose);
 
            let inputClose = document.createElement("input");
            inputClose.id = "closeInput";
            inputClose.setAttribute("type" , "time");
            inputClose.setAttribute("class" , "form-control");
     
            divInputGroupClose.appendChild(inputClose);
 
            placeToAddAttributes.appendChild(divInputGroupClose);
            break;
        case "LugarTuristico":
            break;

        default:
            break;
    }
}


////////////////////// persistir el punto de interes ////////////////////////////////

function addPointOfInterest(){
	let estrellasPunto = 0;
    let nombrePunto = document.getElementById("nombrePuntoDeInteres").value;
    let tipoPunto = document.getElementById("tipoPuntoDeInteres").value;
//    let direccionPunto = document.getElementById("direccionPuntoDeInteres").value;
    let descripcionPunto = document.getElementById("descripcionPuntoDeInteres").value;
    var urlCall = servName + "registrarPuntoInteres?nombre=" + nombrePunto + "&tipo=" + tipoPunto + "&descripcion=" + descripcionPunto; //saque direccion
    var validationClientSidePointOfInterest = false;
    var alertType = "";
    if ((nombrePunto == "") || (tipoPunto == "") || (descripcionPunto == "") /*|| (featisNull()==null)*/) {
            alertType = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>Error</strong> Falta ingresar datos.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span> 
                                        </button>
                             </div>`;
            setTimeout(function() {
                $("#alertContainerPunto").fadeIn(1500);
            },0500);
            document.getElementById("alertContainerPunto").innerHTML = alertType;
            setTimeout(function() {
                $("#alertContainerPunto").fadeOut(1500);
            },3000);
    } else {
        switch (tipoPunto) {
            case "Hotel":
                    let telefonoHotelPunto = document.getElementById("telInput").value;
                    estrellasPunto = document.getElementById("starInput").value;
                    let capacidadHotelPunto = document.getElementById("capacityInput").value;
                    urlCall += "&telefono=" + telefonoHotelPunto + "&estrellas=" + estrellasPunto + "&capacidad=" + capacidadHotelPunto;
                    
                    if ((telefonoHotelPunto == "") || (estrellasPunto == "") || (capacidadHotelPunto == "")) {
                        alertType = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>Error</strong> Falta ingresar datos.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                             </div>`;
                        setTimeout(function() {
                            $("#alertContainerPunto").fadeIn(1500);
                        },0500);
                        document.getElementById("alertContainerPunto").innerHTML = alertType;
                        setTimeout(function() {
                            $("#alertContainerPunto").fadeOut(1500);
                        },3000);
                    } else {
                        validationClientSidePointOfInterest = true;
                    }
            break;
    
            case "Estadio":
                    let capacidatEstadioPunto = document.getElementById("capacityInputStadium").value;
                    urlCall += "&capacidad=" + capacidatEstadioPunto;
                        
                    if (capacidatEstadioPunto == "") {
                        alertType = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>Error</strong> Falta ingresar datos.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                             </div>`;
                        setTimeout(function() {
                            $("#alertContainerPunto").fadeIn(1500);
                        },0500);
                        document.getElementById("alertContainerPunto").innerHTML = alertType;
                        setTimeout(function() {
                            $("#alertContainerPunto").fadeOut(1500);
                        },3000);
                    } else {
                        validationClientSidePointOfInterest = true;
                    }
            break;
    
            case "Bar":
                    let telefonoBarPunto = document.getElementById("telInputBar").value;
                    let abreBarPunto = document.getElementById("openInput").value;
                    let cierraBarPunto = document.getElementById("closeInput").value; 
                    urlCall += "&telefono=" + telefonoBarPunto + "&horaAbre=" + abreBarPunto + "&horaCierra=" + cierraBarPunto;

                    if ((telefonoBarPunto == "") || (abreBarPunto == "") || (cierraBarPunto == "")) {
                        alertType = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>Error</strong> Falta ingresar datos.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                             </div>`;
                        setTimeout(function() {
                            $("#alertContainerPunto").fadeIn(1500);
                        },0500);
                        document.getElementById("alertContainerPunto").innerHTML = alertType;
                        setTimeout(function() {
                            $("#alertContainerPunto").fadeOut(1500);
                        },3000);
                    } else {
                        validationClientSidePointOfInterest = true;
                    }
            break;
    
            default:
                   validationClientSidePointOfInterest = true;
            break;
        }
    }
    
    var payload = cargarPayload(nombrePunto, estrellasPunto, 1, tipoPunto);
    urlCall += "&payload="+payload;
    
    if (validationClientSidePointOfInterest) {
        var xhttp;
        xhttp = new XMLHttpRequest();
        xhttp.open("GET", urlCall, true);
        xhttp.onload = function () {
            var restResponse = this.response;
            var bolleanResponse = restResponse.split("-")[0];
            switch (bolleanResponse) {
                case "true":
                	var nombre, cantEstrellas, puntaje, tipo, idbasecomun;
                	nombre = document.getElementById("nombrePuntoDeInteres").value;
                	if (document.getElementById("starInput")!=null){
                		cantEstrellas = document.getElementById("starInput").value;
                	}else{
                		cantEstrellas = 0;
                	}
                	puntaje = 1; //TODO: chequear
                	tipo = document.getElementById("tipoPuntoDeInteres").value;
                	idbasecomun = restResponse.split("-")[1]; //TODO : cambiar por el id del punto en la base de datos
                	console.log(" " + bolleanResponse + " " + idbasecomun);
//                	onSave(nombre, cantEstrellas, puntaje, tipo, idbasecomun);
                	feat = null;
                	
                    alertType = `<div class='alert alert-success alert-dismissible fade show' role='alert'>
                                    <strong>Éxito</strong> El resultado se guardo correctamente.
                                    <button type='button' class='close' data-dismiss='alert' aria-label='Close'>
                                        <span aria-hidden='true'>&times;</span>
                                    </button>
                                </div>`;
                    
                    ///////////////////////////RESET VALORES LUEGO DE VALIDACION CON SERVIDOR /////////////////////////            

                    let nomPunto = document.getElementById("nombrePuntoDeInteres");
                    if (nomPunto != null) {
                        nomPunto.value = "";
                    }

                    let tipPunto = document.getElementById("tipoPuntoDeInteres");
                    if (tipPunto != null) {
                        tipPunto.value = "";
                    }
                   
                    let desPunto = document.getElementById("descripcionPuntoDeInteres");
                    if (desPunto != null) {
                        desPunto.value = "";
                    }

                    let telHotel = document.getElementById("telInput");
                    if (telHotel != null) {
                        telHotel.value = "";
                    }
                    let estHotel = document.getElementById("starInput");
                    if (estHotel != null) {
                        estHotel.value = "";
                    }
                    let capHotel = document.getElementById("capacityInput");
                    if (capHotel != null) {
                        capHotel.value = "";
                    }
                    let capEstadio = document.getElementById("capacityInputStadium");
                    if (capEstadio != null) {
                        capEstadio.value = "";
                    }
                    let telBar = document.getElementById("telInputBar");
                    if (telBar != null) {
                        telBar.value = "";
                    }
                    let abrBar = document.getElementById("openInput");
                    if (abrBar != null) {
                        abrBar.value = "";
                    }
                    let cieBar = document.getElementById("closeInput");
                    if (cieBar != null) {
                        cieBar.value = "";
                    }
                    break;

                default:
                    alertType = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                    <strong>Error</strong> El resultado no se guardo correctamente.
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>`;
                    break;
            }
            setTimeout(function() {
                $("#alertContainerPunto").fadeIn(1500);
            },0500);
            document.getElementById("alertContainerPunto").innerHTML = alertType;
            setTimeout(function() {
                $("#alertContainerPunto").fadeOut(1500);
            },3000);
            recargarPOI();
        }  
        xhttp.send();  
    }
    
}  