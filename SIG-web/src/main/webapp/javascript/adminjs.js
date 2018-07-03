function logIn(){
	var user = document.getElementById("user");
	var pass = document.getElementById("psw");
	
	if(window.XMLHttpRequest) {
	    peticion_http = new XMLHttpRequest();
	}
	else if(window.ActiveXObject) {
		peticion_http = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	peticion_http.onreadystatechange = muestraContenido;
	
	peticion_http.open('GET', 'http://localhost:8081/SIG-web/resources/serv/login?nick='+user+'&psw='+pass, true);
	peticion_http.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	peticion_http.send();

	function muestraContenido() {
		if(peticion_http.readyState == 4) {
			if(peticion_http.status == 200) {
				if(peticion_http.responseText == 'false'){
					alert("USUARIO O CONTRASENA INCORRECTA");
				}else{
					
				}
			}
		}
	}
}