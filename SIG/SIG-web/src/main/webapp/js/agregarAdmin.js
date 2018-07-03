///////// AGREGAR ADMIN /////////
function addAdmin(){
    var nickAdmin = document.getElementById("nickAdmin").value;
    var pswAdmin = document.getElementById("passwordAdmin").value;
    var pswAdminConfirm = document.getElementById("confirmPassword").value;
    console.log(nickAdmin);
    /////// SI NOMBRE DE EQUIPO ES DISTINTO DE VACIO
    var alertType = "";
    if ((nickAdmin != "") && (pswAdmin != "") && (pswAdmin == pswAdminConfirm)){
        var urlCall = servName + "registrarAdmin?nick=" + nickAdmin + "&psw=" + pswAdmin;
        var xhttp;
        xhttp = new XMLHttpRequest();
        xhttp.open("POST", urlCall, true);
        xhttp.onload = function () {
            var restResponse = this.response;  
            
            switch (restResponse) {
                case "true":
                    alertType2 = `<div id="tmp" class='alert alert-success alert-dismissible fade show' role='alert'>
                                    <strong>Exito</strong> El Admin se registro correctamente.
                                    <button type='button' class='close' data-dismiss='alert' aria-label='Close'>
                                        <span aria-hidden='true'>&times;</span>
                                    </button>
                                </div>`;
                    
                    

                default:
                    alertType2 = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                    <strong>Error</strong> No se pudo realizar el registro.
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>`;
               
            }
            setTimeout(function() {
                $("#alertContainerAddAdmin").fadeIn(1500);
            },0500);
            document.getElementById("alertContainerAddAdmin").innerHTML = alertType2;
            setTimeout(function() {
                $("#alertContainerAddAdmin").fadeOut(1500);
            },3000);
            
            document.getElementById("nickAdmin").value = "";
            document.getElementById("passwordAdmin").value = "";
            document.getElementById("confirmPassword").value = "";

        };
        xhttp.send();
    } else if((nickAdmin == "") || (pswAdmin == "") || (pswAdminConfirm == "")){
    
        alertType2 = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                    <strong>Error</strong> Faltan ingresar Datos.
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>`;
        
    } else if(pswAdmin != pswAdminConfirm){
        alertType2 = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                    <strong>Error</strong> Las contrasenias deben coincidir.
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>`;
    }
    document.getElementById("alertContainerAddAdmin").innerHTML = alertType2;
}
    