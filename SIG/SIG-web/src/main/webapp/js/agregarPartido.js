///////// AGREGAR PARTIDOS /////////
function loadTeams() {
	
	
    document.getElementById("equipos1").innerHTML = `<option selected="">Elije equipo...</option>`;
    document.getElementById("equipos2").innerHTML = `<option selected="">Elije equipo...</option>`;
    var grupo = document.getElementById("idGrupo").value;
    var urlCall = controlador_uno + "selecciones?grupo="+grupo;
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", urlCall, true);
    xhttp.onload = function () {
        var selecciones = JSON.parse(this.response);
        console.log(selecciones);
        var frag1 = document.createDocumentFragment();
        var frag2 = document.createDocumentFragment();
        selecciones.forEach(nEquipo => {
            let optionElement1 = document.createElement("option");
            let optionElement2 = document.createElement("option");
            optionElement1.value = nEquipo.id;
            optionElement2.value = nEquipo.id;
            optionElement1.innerHTML = nEquipo.pais;
            optionElement2.innerHTML = nEquipo.pais;

            frag1.appendChild(optionElement1);
            frag2.appendChild(optionElement2);

        });
        var placeToAdd1 = document.getElementById("equipos1");
        placeToAdd1.appendChild(frag1);
        var placeToAdd2 = document.getElementById("equipos2");
        placeToAdd2.appendChild(frag2);

    }
    xhttp.send();
}

function validationAddMatch(valueEquipo1 , valueEquipo2 , valueDate) {
    var validationWeb = false;
    var alertType = "";
    if ((valueEquipo1 != "Elije equipo...") && ((valueEquipo1 == valueEquipo2))) {
        alertType = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Uppss!!</strong> Debes ingresar equipos diferentes.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`;
    } else if ((valueEquipo1 == "Elije equipo...") || (valueEquipo2 == "Elije equipo...") || (valueDate == "undefined")) {
        alertType = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Uppss!!</strong> Falta ingresar equipo.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`;
        
    } else {
        validationWeb = true;
    }
    setTimeout(function() {
        $("#alertContainerMatch").fadeIn(1500);
    },0500);
    document.getElementById("alertContainerMatch").innerHTML = alertType;
    setTimeout(function() {
        $("#alertContainerMatch").fadeOut(1500);
    },3000);
    return validationWeb;
}

function addMatch(){
   var valEquipo1 = document.getElementById("equipos1").value;
   var valEquipo2 = document.getElementById("equipos2").value;
   var valDate = document.getElementById("dateMatch").value;
   if (validationAddMatch(valEquipo1 , valEquipo2 , valDate)) {
        var urlCall = servName + "registrarPartido?fecha=" + valDate + "&finalizado=false&localid=" + valEquipo1 + "&visitanteid=" + valEquipo2;
        var xhttp;
        
        xhttp = new XMLHttpRequest();
        xhttp.open("GET", urlCall, true);
        xhttp.onload = function () {
            var restResponse = this.response;
            var alertType = "";
            switch (restResponse) {
                case "true":
                    alertType = `<div class='alert alert-success alert-dismissible fade show' role='alert'>
                                    <strong>Éxito</strong> El partido se ingreso correctamente.
                                    <button type='button' class='close' data-dismiss='alert' aria-label='Close'>
                                        <span aria-hidden='true'>&times;</span>
                                    </button>
                                </div>`;
                    break;
                default:
                    alertType = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                    <strong>Error</strong> El equipo que intenta ingresar ya existe.
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>`;
                    break;
            }
            setTimeout(function() {
                $("#alertContainerMatch").fadeIn(1500);
            },0500);
            return validationWeb;
            document.getElementById("alertContainerMatch").innerHTML = alertType;
            setTimeout(function() {
                $("#alertContainerMatch").fadeOut(1500);
            },3000);
            return validationWeb;
            document.getElementById("txtEquipo").value = "";
        };
        xhttp.send();
   }  
}