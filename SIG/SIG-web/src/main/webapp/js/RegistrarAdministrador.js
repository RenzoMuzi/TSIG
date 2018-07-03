

function registrarAdmin(){
	
	var user = document.getElementById("inputnickname").value;
	var pass = document.getElementById("inputPassword").value;
	
	if(window.XMLHttpRequest) {
	    peticion_http = new XMLHttpRequest();
	}
	else if(window.ActiveXObject) {
		peticion_http = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	peticion_http.onreadystatechange = muestraContenido;
	//debe ser post por la seguridad.
	peticion_http.open('POST', 'http://localhost:8081/SIG-web/resources/serv/registerAdmin?nick='+user+'&psw='+pass, true);
	
	peticion_http.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	peticion_http.send();
	
	function muestraContenido() {
		if(peticion_http.readyState == 4) {
			if(peticion_http.status == 200) {
//				0 -> no anduvo
//				1 -> admin
//				2 -> usuario
				if(peticion_http.responseText == 'true'){
					alert("TRUE");
					window.location.href="/SIG-web/AdminHome.jsp";
				}else if(peticion_http.responseText == 'false' ){
					alert("FALSE");
				}else{
					alert("ERROR");

				}
			}
		}
	}
}
