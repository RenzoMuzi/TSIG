////////////////////AGREGAR RESULTADO//////////////////////

function addResults() {
    var urlCall = servName + "partidosNoTerminados";
    var xhttp;
    document.getElementById("colIzq").innerHTML = `<label>Resultados</label>`;
    document.getElementById("colDer").innerHTML = `<label>Finalizado</label>`;
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", urlCall, true);
    xhttp.onload = function () {
        var allMatches = JSON.parse(this.response);
        cantidadPartidos = allMatches.length;
        console.log(allMatches);
        
        console.log(allMatches.length);
       
        var frag1 = document.createDocumentFragment();
        var frag2 = document.createDocumentFragment();
        for (var i = 0; i < cantidadPartidos; i++) {
            //////parte izquierda del formulario
                /////div externo inputs parte izquierda
            let divInputGroup = document.createElement("div");
            divInputGroup.setAttribute("class" , "input-group mb-3");
            var matchIDiv = "mdiv" + allMatches[i].id;
            divInputGroup.id = matchIDiv;

                /////div label izquierdo
            let divLabelPrepend = document.createElement("div");
            divLabelPrepend.setAttribute("class" , "input-group-prepend");
            let labelGroupSelect = document.createElement("label");
            labelGroupSelect.setAttribute("class" , "input-group-text labelTeamSize");
            let localGoals = "localGoals" + allMatches[i].id;
            labelGroupSelect.setAttribute("for" , localGoals);
            labelGroupSelect.innerHTML = allMatches[i].local.pais;
            divLabelPrepend.appendChild(labelGroupSelect);
            divInputGroup.appendChild(divLabelPrepend);
                /////select izquierdo local
            let selectGoalsL = document.createElement("select");
            selectGoalsL.setAttribute("class" , "custom-select");
            selectGoalsL.id = localGoals;
            for (let gol = -1; gol <= 20; gol++) {
                let optionLocalGoals = document.createElement("option");
                if (gol == -1) {
                    optionLocalGoals.setAttribute("selected" , "");
                    optionLocalGoals.innerHTML = "-";
                } else {
                    optionLocalGoals.setAttribute("value" , gol);
                    optionLocalGoals.innerHTML = gol;
                }
                selectGoalsL.appendChild(optionLocalGoals);
            }
            divInputGroup.appendChild(selectGoalsL);

                /////select derecho visitante
            let selectGoalsV = document.createElement("select");
            selectGoalsV.setAttribute("class" , "custom-select");
            let visitorGoals = "visitorGoals" + allMatches[i].id;
            selectGoalsV.id = visitorGoals;
            for (let gol = -1; gol <= 20; gol++) {
                let optionVisitorGoals = document.createElement("option");
                if (gol == -1) {
                    optionVisitorGoals.setAttribute("selected" , "");
                    optionVisitorGoals.innerHTML = "-";
                } else {
                    optionVisitorGoals.setAttribute("value" , gol);
                    optionVisitorGoals.innerHTML = gol;
                }
                selectGoalsV.appendChild(optionVisitorGoals);
            }
            divInputGroup.appendChild(selectGoalsV);
                //////div label derecho
            let divLabelAppend = document.createElement("div");
            divLabelAppend.setAttribute("class" , "input-group-append");
            let labelGroupSelect2 = document.createElement("label");
            labelGroupSelect2.setAttribute("class" , "input-group-text labelTeamSize");
            labelGroupSelect2.setAttribute("for" , visitorGoals);
            labelGroupSelect2.innerHTML = allMatches[i].visitante.pais;
            divLabelAppend.appendChild(labelGroupSelect2);
            divInputGroup.appendChild(divLabelAppend);

            frag1.appendChild(divInputGroup);
            document.getElementById("colIzq").appendChild(frag1);
            

            //////////parte derecha del formulario
            let divInputGroupDer = document.createElement("div");
            divInputGroupDer.setAttribute("class" , "input-group mb-3");
            var divDerBtnCheck = "divDer" + allMatches[i].id;
            divInputGroupDer.id = divDerBtnCheck;
            let divInputGroupText = document.createElement("div");
            divInputGroupText.setAttribute("class" , "input-group-text");
            let InputCheckbox = document.createElement("input");
            InputCheckbox.setAttribute("type" , "checkbox");
            var matchIdCheck = "check" + allMatches[i].id;
            InputCheckbox.id = matchIdCheck;
            InputCheckbox.setAttribute("aria-label" , "check for Ended matches");
            divInputGroupText.appendChild(InputCheckbox);
            divInputGroupDer.appendChild(divInputGroupText);

            let divInputGroupAppend = document.createElement("div");
            divInputGroupAppend.setAttribute("class" , "input-group-append");
            let buttonAgregarResultado = document.createElement("button");
            var matchIdBtn = "mBtn" + allMatches[i].id;
            buttonAgregarResultado.id = matchIdBtn;
            buttonAgregarResultado.setAttribute("class" , "btn btn-primary");
            buttonAgregarResultado.setAttribute("type" , "button");
            buttonAgregarResultado.innerHTML = "Agregar";
            divInputGroupAppend.appendChild(buttonAgregarResultado);
            divInputGroupDer.appendChild(divInputGroupAppend);

            frag2.appendChild(divInputGroupDer);
            document.getElementById("colDer").appendChild(frag2);
            
            saveResult(visitorGoals , localGoals , allMatches[i].id , matchIDiv , matchIdCheck, matchIdBtn, divDerBtnCheck);
        }
  
    };
    xhttp.send();    
}


function saveResult(visitorGoals , localGoals , partidoIdReal , matchIDiv , matchIdCheck, matchIdBtn, divDerBtnCheck){
    document.getElementById(matchIdBtn).addEventListener("click" , function () {
        var vGoals = document.getElementById(visitorGoals).value;
        var lGoals = document.getElementById(localGoals).value;
        var matchEnded = document.getElementById(matchIdCheck).checked;
        var alertType = "";
        if ((vGoals == "-") || (lGoals == "-")) {
            
            alertType = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>Error</strong> El resultado no se guardo correctamente.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                             </div>`;
            document.getElementById("alertDivResult").innerHTML = alertType;
        } else {
            /////////////////////aca agregar la variable del check box matchEnded
            var urlCall = servName + "registrarResultado?idPartido=" + partidoIdReal + "&resultl=" + lGoals + "&resultv=" + vGoals + "&terminado=" + matchEnded;
            var xhttp;
            xhttp = new XMLHttpRequest();
            xhttp.open("GET", urlCall, true);
            xhttp.onload = function () {
                var restResponse = this.response;
                
                switch (restResponse) {
                    case "true":
                        alertType = `<div class='alert alert-success alert-dismissible fade show' role='alert'>
                                        <strong>Éxito</strong> El resultado se guardo correctamente.
                                        <button type='button' class='close' data-dismiss='alert' aria-label='Close'>
                                            <span aria-hidden='true'>&times;</span>
                                        </button>
                                    </div>`;
                        if (matchEnded) {
                        	 var divRemove = document.getElementById(matchIDiv);
                             divRemove.parentNode.removeChild(divRemove);
             
                             var btnRemove = document.getElementById(divDerBtnCheck);
                             btnRemove.parentNode.removeChild(btnRemove);
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
                    $("#alertDivResult").fadeIn(1500);
                },0500);
                document.getElementById("alertDivResult").innerHTML = alertType;
                setTimeout(function() {
                    $("#alertDivResult").fadeOut(1500);
                },3000);
                

            };
            xhttp.send();
        }
    });
    
}