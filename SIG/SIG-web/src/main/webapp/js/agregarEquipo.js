///////// AGREGAR EQUIPO /////////
function addTeam(){
    var nombreEquipo = document.getElementById("txtEquipo").value;
    var grupo = document.getElementById("grupoPertenece").value;
    
    /////// SI NOMBRE DE EQUIPO ES DISTINTO DE VACIO
    if (nombreEquipo != "") {
        var urlCall = servName + "registrarEquipo?nombre=" + nombreEquipo + "&grupo=" + grupo;
        var xhttp;
        xhttp = new XMLHttpRequest();
        xhttp.open("GET", urlCall, true);
        xhttp.onload = function () {
            var restResponse = this.response;
            var alertType = "";
            switch (restResponse) {
                case "true":
                    alertType = `<div class='alert alert-success alert-dismissible fade show' role='alert'>
                                    <strong>Éxito</strong> El equipo se ingreso correctamente.
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
            }setTimeout(function() {
                $("#alertContainerTeam").fadeIn(1500);
            },3000);
            document.getElementById("alertContainerTeam").innerHTML = alertType;
            setTimeout(function() {
                $("#alertContainerTeam").fadeOut(1500);
            },3000);
            document.getElementById("txtEquipo").value = "";
        };
        xhttp.send();
    }
}
    
    


