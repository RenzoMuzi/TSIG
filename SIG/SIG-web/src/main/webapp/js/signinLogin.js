function loadTeamsForUser(placeToAdd){
	var optionSeleccionPlaceholder = document.createElement("option");
    optionSeleccionPlaceholder.setAttribute("selected" , "");
    optionSeleccionPlaceholder.value = "";
    optionSeleccionPlaceholder.innerHTML = "Elije tu Seleccion";

    placeToAdd.appendChild(optionSeleccionPlaceholder);
 
    var urlCall = servName + "allSelecciones";
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", urlCall, true);
    xhttp.onload = function () {
        var selecciones = JSON.parse(this.response);
        selecciones.forEach(nEquipo => {
            let optionElement1 = document.createElement("option");
            optionElement1.value = nEquipo.id;
            optionElement1.innerHTML = nEquipo.pais;
            placeToAdd.appendChild(optionElement1);
        });
    }
    xhttp.send();
}

function loadHotelsForUser(placeToAdd){
	var optionSeleccionPlaceholder = document.createElement("option");
    optionSeleccionPlaceholder.setAttribute("selected" , "");
    optionSeleccionPlaceholder.value = "";
    optionSeleccionPlaceholder.innerHTML = "Elije tu Hotel";

    placeToAdd.appendChild(optionSeleccionPlaceholder);
 
    var urlCall = servName + "allHotels";
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", urlCall, true);
    xhttp.onload = function () {
        var hoteles = JSON.parse(this.response);
        console.log(hoteles);
        hoteles.forEach(nHotel => {
            let optionElement1 = document.createElement("option");
            optionElement1.value = nHotel.id;
            optionElement1.innerHTML = nHotel.nombre;
            placeToAdd.appendChild(optionElement1);
        });
    }
    xhttp.send();
}


function displayRegisterForm(){
    document.getElementById("titleLogin").innerHTML = "Registrarse";
    
    document.getElementById("inputConfirmPassword").setAttribute("class" , "form-control show-on-register");
    
    var alreadyExist = document.getElementById("inputName");
    if (alreadyExist === null){
//        document.getElementById("register").setAttribute("type" , "submit");
//        document.getElementById("login").setAttribute("type" , "button");
        
        
        var fragmentToAdd = document.createDocumentFragment();

        var labelName = document.createElement("LABEL");
        labelName.setAttribute("for" , "inputName");
        labelName.setAttribute("class" , "sr-only");
        labelName.innerHtml = 'Nombre';

        var inpName = document.createElement("INPUT");
        inpName.setAttribute("id" , "inputName");
        inpName.setAttribute("type" , "text")
        inpName.setAttribute("class" , "form-control");
        inpName.setAttribute("placeholder" , "Nombre");
        inpName.setAttribute("required" , "");
        inpName.setAttribute("autofocus" , "");


        var labelLastName = document.createElement("LABEL");
        labelLastName.setAttribute("for" , "Email");
        labelLastName.setAttribute("class" , "sr-only");
        labelLastName.innerHtml = 'Email';

        var inpLastName = document.createElement("INPUT");
        inpLastName.setAttribute("id" , "Email");
        inpLastName.setAttribute("type" , "text")
        inpLastName.setAttribute("class" , "form-control");
        inpLastName.setAttribute("placeholder" , "Email");
        inpLastName.setAttribute("required" , "");
        
        var labelTeamFollow = document.createElement("LABEL");
        labelTeamFollow.setAttribute("for" , "equipoUsuario");
        labelTeamFollow.setAttribute("class" , "sr-only");
        labelTeamFollow.innerHtml = 'Seleccion';
        
        var selectEquipoUsuario = document.createElement("select");
        selectEquipoUsuario.setAttribute("name" , "equipoUsuario");
        selectEquipoUsuario.setAttribute("class" , "custom-select no-border-radius");
        selectEquipoUsuario.setAttribute("aria-describedby" , "equipoUsuario");
        selectEquipoUsuario.id = "equipoUsuario";

        loadTeamsForUser(selectEquipoUsuario);
        
        var labelTeamFollow = document.createElement("LABEL");
        labelTeamFollow.setAttribute("for" , "HotelUsuario");
        labelTeamFollow.setAttribute("class" , "sr-only");
        labelTeamFollow.innerHtml = 'Hotel';
 
        var selectHotelUsuario = document.createElement("select");
        selectHotelUsuario.setAttribute("name" , "hotelUsuario");
        selectHotelUsuario.setAttribute("class" , "custom-select no-border-radius");
        selectHotelUsuario.setAttribute("aria-describedby" , "hotelUsuario");
        selectHotelUsuario.id = "hotelUsuario";
        
        loadHotelsForUser(selectHotelUsuario);
        
        fragmentToAdd.appendChild(labelName);
        fragmentToAdd.appendChild(inpName);
        fragmentToAdd.appendChild(labelLastName);
        fragmentToAdd.appendChild(inpLastName);
        fragmentToAdd.appendChild(selectEquipoUsuario);
        fragmentToAdd.appendChild(selectHotelUsuario);


        var placeToAdd = document.getElementsByTagName("form");
        placeToAdd[0].insertBefore(fragmentToAdd , placeToAdd[0].childNodes[2]);
        
       document.getElementById("register").setAttribute("onclick","registrarUser()");
       document.getElementById("login").setAttribute("onclick","displayLoginForm()");

    }else{
    	
        document.getElementById("register").setAttribute("onclick","displayRegisterForm()");

    }
    
}

function displayLoginForm(){

    document.getElementById("titleLogin").innerHTML = "Ingresar";
    document.getElementById("login").setAttribute("type" , "button");
    document.getElementById("register").setAttribute("type" , "button");
    
    document.getElementById("inputConfirmPassword").setAttribute("class" , "form-control hide-on-login");


    var alreadyExist = document.getElementById("inputName");
    if (alreadyExist !== null){
        var parentElement = document.getElementsByTagName("form");
        parentElement[0].removeChild(parentElement[0].childNodes[2]);
        parentElement[0].removeChild(parentElement[0].childNodes[2]);
        parentElement[0].removeChild(parentElement[0].childNodes[2]);
        parentElement[0].removeChild(parentElement[0].childNodes[2]);
        parentElement[0].removeChild(parentElement[0].childNodes[2]);
        parentElement[0].removeChild(parentElement[0].childNodes[2]);
    }
    
    document.getElementById("register").setAttribute("onclick","displayRegisterForm()");
    document.getElementById("login").setAttribute("onclick","logIn()");

    
    
}

function logIn(){
	
	
	var user = document.getElementById("inputnickname").value;
	var pass = document.getElementById("inputPassword").value;
	
	if(window.XMLHttpRequest) {
	    peticion_http = new XMLHttpRequest();
	}
	else if(window.ActiveXObject) {
		peticion_http = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	peticion_http.onreadystatechange = muestraContenido;
	
	peticion_http.open('GET', servName+'login?nick='+user+'&psw='+pass, true);
	peticion_http.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	peticion_http.send();
	
	
	function muestraContenido() {
		if(peticion_http.readyState == 4) {
			if(peticion_http.status == 200) {
				
//				0 -> no anduvo
//				1 -> admin
//				2 -> usuario
				if(peticion_http.responseText == "false"){
					alertType = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Uppss!!</strong> Usuario y/o contrasenia invalidos.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`;
					setTimeout(function() {
	                    $("#alertContainerLogin").fadeIn(1500);
	                },0500);
					document.getElementById("alertContainerLogin").innerHTML = alertType;
					setTimeout(function() {
	                    $("#alertContainerLogin").fadeOut(1500);
	                },3000);
					sessionStorage.setItem("logged","none");
				}else{
					var usuario = JSON.parse(peticion_http.responseText);
					if (usuario.tipo == "admin"){
						window.location.replace("AdminHome.jsp");
						sessionStorage.setItem("logged","admin");
					}else if (usuario.tipo == "user"){
						sessionStorage.setItem("nick", usuario.nick);
						sessionStorage.setItem("nombre", usuario.nombre);
						sessionStorage.setItem("hotel", usuario.hotel);
						sessionStorage.setItem("seleccion", usuario.seleccion);
						sessionStorage.setItem("logged","user");
						window.location.replace("UserHome.jsp");
					}
				}
			}
		}
	}
}


function registrarUser(){
	var user = document.getElementById("inputnickname").value;
    var pass = document.getElementById("inputPassword").value;
    var confirmPass = document.getElementById("inputConfirmPassword").value;
	var name = document.getElementById("inputName").value;
	var mail = document.getElementById("Email").value;
    var hotel = document.getElementById("hotelUsuario").value;
    var seleccion = document.getElementById("equipoUsuario").value;
    var alertType = "";

    if ((user == "") || (pass == "") || (confirmPass == "")|| (name == "") || (mail == "") || (hotel == "") || (seleccion == "")){
        alertType = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Uppss!!</strong> Falta ingresar datos.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`;
        setTimeout(function() {
            $("#alertContainerLogin").fadeIn(1500);
        },0500);
         document.getElementById("alertContainerLogin").innerHTML = alertType;
         setTimeout(function() {
             $("#alertContainerLogin").fadeOut(1500);
         },3000);
         
    } else if (pass != confirmPass) {
        alertType = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Uppss!!</strong> Las Contrasenias deben coincidir.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`;
        setTimeout(function() {
            $("#alertContainerLogin").fadeIn(1500);
        },0500);
        document.getElementById("alertContainerLogin").innerHTML = alertType;
        setTimeout(function() {
            $("#alertContainerLogin").fadeOut(1500);
        },3000);
    } else {
        if(window.XMLHttpRequest) {
            peticion_http = new XMLHttpRequest();
        }
        else if(window.ActiveXObject) {
            peticion_http = new ActiveXObject("Microsoft.XMLHTTP");
        }
        
        peticion_http.onreadystatechange = muestraContenido;
        //debe ser post por la seguridad.
        peticion_http.open('POST', controlador_uno+'register?nombre='+name+'&nick='+user+'&psw='+pass+'&email='+mail + "&hotel=" + hotel + "&seleccion=" + seleccion, true);
        
        peticion_http.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        peticion_http.send();
        
        function muestraContenido() {
            if(peticion_http.readyState == 4) {
                if(peticion_http.status == 200) {
    //				0 -> no anduvo
    //				1 -> admin
    //				2 -> usuario
                    if(peticion_http.responseText == 'true'){
                        logIn();
                    }else {
                        alertType = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>Uppss!!</strong> No se pudo registrar.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>`;
                        setTimeout(function() {
    	                    $("#alertContainerLogin").fadeIn(1500);
    	                },0500);
                        document.getElementById("alertContainerLogin").innerHTML = alertType;
                        setTimeout(function() {
    	                    $("#alertContainerLogin").fadeOut(1500);
    	                },3000);
                    } 
                }
            }
        }
    }
}