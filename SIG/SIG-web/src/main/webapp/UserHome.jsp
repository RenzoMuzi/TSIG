<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">

<link rel="stylesheet"
	href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
	integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
	crossorigin="anonymous">
<link rel="stylesheet"
	href="https://openlayers.org/en/v4.6.5/css/ol.css" type="text/css">
<link rel="stylesheet" href="css/home.css">
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
	integrity="sha256-3edrmyuQ0w65f8gfBsqowzjJe2iM6n0nKciPUp8y+7E="
	crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/rateYo/2.3.2/jquery.rateyo.min.css">
    <script type="text/javascript">
		if (sessionStorage.getItem("logged") != "user"){
			location.href = "index.jsp";
		}
    </script>
<title>User Home</title>
</head>
<body>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<button class="navbar-toggler" type="button" data-toggle="collapse"
			data-target="#navbarTogglerDemo01"
			aria-controls="navbarTogglerDemo01" aria-expanded="false"
			aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		 <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a class="navbar-brand" href="#">TSIG 2018</a>
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item">
                    <a class="ex2 nav-link" id="proximosPartidosButton" href="#">Proximos Partidos <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item"> 
                    <a class="ex2 nav-link" id="ultimosPartidosButton" href="#">Resultados</a>
                </li>
                <li class="nav-item">
                    <a class="ex2 nav-link" id="posicionesButton" href="#">Posiciones</a>
                </li>
            </ul>
            
<!--             <form class="form-inline my-2 my-lg-0"> -->
                <a class="nav-link" id="filtrosBusquedaButton" href="#">Filtros</a>
                <div id="barraBusqueda"><input id="busqueda" class="form-control mr-sm-2" type="search" placeholder="Ej: Estadio Centenario , Bar de pepe" aria-label="Search"></div>
                <button id="btnSearch" class="btn btn-outline-success my-2 my-sm-0" >Search</button>
                <button type="button" onclick="logOut()" id="btnSalir" style="margin-left: 3%" class="btn btn-outline-danger my-2 my-sm-0" >Cerrar Sesion</button>
                
<!--             </form> -->
        </div>
	</nav>
	<div class="wrapper">
        <div id="map" class="divToClick">
           <div id="hotelMio" class="over-map over-map-bot-rigth-hotel shadow ">
            	<h7>Usuario: <span id="userlogged"> </span></h7> </br>
            	<h7>Hotel: <span id="Hoteluserlogged"> </span></h7>
	 		</div>
       </div>

        <div id="proximosPartidosDiv" style="display:none"  class="over-map over-map-top-left shadow p-3 mb-5 bg-white rounded">
            <div id="proximosPartidosCabezal" class="text-center">
                <p class="h3">Proximos partidos</p>
                <div class="row">
                    <div class="col-4 text-left"><p>Equipo local</p></div>
                    <div class="col-4 text-center"><p>Vs.</p></div>
                    <div class="col-4 text-right"><p>Equipo visitante</p></div>                
                </div>
            </div>
            <div id="proximosPartidos">
                   
            </div>
        </div>

        <!-- <div id="advancedFilter" class="over-map over-map-top-center shadow p-3 mb-5 bg-white rounded">
                <div id="advancedFilterCabezal" class="text-center">
                    <p class="h3">Busqueda Avanzada</p>
                    
                </div>
                <div id="proximosPartidos">
                       
                </div>
            </div> -->


        <div id="ultimosPartidosDiv" style="display:none" class="over-map over-map-bot-right shadow p-3 mb-5 bg-white rounded">
            <div id="ultimosResultadosCabezal" class="text-center">
                <p class="h3">Ultimos Resultados</p>
                <div class="row">
                    <div class="col-4 text-left"><p>Equipo local</p></div>
                    <div class="col-4 text-center"><p>Vs.</p></div>
                    <div class="col-4 text-right"><p>Equipo visitante</p></div>                
                </div>
            </div>
            <div id="ultimosResultados">
                
            </div>
        </div>

        <div id="posicionesDiv"  style="display:none" class="over-map over-map-top-right shadow p-3 mb-5 bg-white rounded">
            <div id="posicionesCabezal" class="text-center">
                <p class="h3">Posiciones</p>
            </div>
            <div id="posicionesEquipos">
                <ul id="posicionesEquiposList" class="list-group list-group-flush">
                  
                </ul>
            </div>
        </div>
        
        
     

<!--<ul class="navbar-nav " style="padding-right: 20px;float:rigth;">
                <a href="#"> Filtro Avanzado </a>    
                    
                <select  id="selectTypeSearch" style="float: right" > Forma de Busqueda:
                            <option id="nombrePOI"> Nombre POI</option>
                            <option id="tipoPOI"> Tipo de POI</option>
                            <option id="calificacionMayor"> Calificacion Mayor a:</option>
                            <option id="calificacionIgual"> Calificacion Igual a:</option> 
                            <option id="calificacionMenor"> Calificacion Menor a:</option>
                            <option id="distancia"> Distancia a un punto</option>
                            <option id="distanciaDeMI"> Distancia de mi</option>
                </select>
            </ul>-->




        <div id="filtrosDiv" style="display:none" class="over-map over-map-top-right shadow p-3 mb-5 bg-white rounded">
            
            <label class="container">
				  <input id="checkTipo" type="checkbox">
				  <span class="checkmark"></span>Desbloquear</label>
            <div class="form-group margin-bottom-element separation-bottom"  id="DIVcheckTipo" style="pointer-events:none; color:grey">
                <label for="filterTipoPunto">Tipo punto de interes:</label>
                <select  class="custom-select" id="filterTipoPunto" onchange="" aria-describedby="filterTipoPunto">
                    <option value="Hotel">Hotel</option>
                    <option value="Estadio">Estadio</option>
                    <option value="Bar">Bar</option>
                    <option value="LugarTuristico">Lugar Turistico</option>
                </select>
            </div>
            
            <label class="container">
				  <input id="checkPuntaje" type="checkbox" >
				  <span class="checkmark"></span>Desbloquear</label>
            <div class="form-group margin-bottom-element separation-bottom" id="DIVcheckPuntaje" style="pointer-events:none; color:grey">
           		
                <label for="seleccionPuntaje">Por puntaje:</label>
                <div id="selComparator" class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="btn btn-success btn-sm active">
                      <input type="radio" name="options" value="mayor"  > >
                    </label>
                    <label class="btn btn-success btn-sm">
                      <input type="radio" name="options" value="igual"  checked> =
                    </label>
                    <label class="btn btn-success btn-sm">
                      <input type="radio" name="options" value="menor" > <
                    </label>

                </div>
                <div id="rateYo"></div>
                <!-- para obtener el valor de la estrella mirar esta pagina: http://rateyo.fundoocode.ninja/-->
            </div>
            
            <label class="container">
					  <input id="checkDistPunto" type="checkbox">
					  <span class="checkmark"></span>Desbloquear</label>
            <div class="form-group margin-bottom-element separation-bottom" id="DIVcheckDistPunto" style="pointer-events:none; color:grey">
            	
                <label for="rangoDistanciaPunto">Distancia a un punto determinado:</label>
                <input type="range"  min="100" max="1000" value="550" class="form-control-range" id="rangoDistanciaPunto">
                <p>distancia: <span id="valorDistancia"></span>mts.</p>
                
            </div>
            
            <label class="container">
				  <input id="checkDistMia" type="checkbox">
				  <span class="checkmark"></span>Desbloquear</label>
            <div class="form-group margin-bottom-element" id="DIVcheckDistMia" style="pointer-events:none; color:grey">
            	
                    <label for="rangoDistanciaDeMi">Distancia de mi:</label>
                    <input type="range"  min="100" max="1000" value="550" class="form-control-range" id="rangoDistanciaDeMi">
                    <p>distancia: <span id="valorDistanciaDeMi"></span>mts.</p>
            </div>      
            <button id="btnFiltrar" class="btn btn-success btn-sm">Fijar filtros y Buscar</button>
            <button id="resetFilters" class="btn btn-secondary btn-sm">Resetear filtros</button>
            
        </div>


        <div class="over-map over-map-bot-left shadow p-3 mb-5 bg-white rounded" id="divPointOverMap" style="display: none;">
                <div id="puntoDeInteresCabezal" class="text-center">
                    <p id="tituloPOI" class="h3"></p>
                </div>
                <div id="descripcionPuntoContenido">
                    <p id="descrPOI">descripcion a cambiar aacacaccc</p>
                </div>
                 <div id="puntaje">
                    <p id="puntajePOI">descripcion a cambiar aacacaccc</p>
                </div>
                <div class="form-group">
                    <div class="form-group">
                        <label for="puntajePunto">Mi puntaje:</label>
                        <input type="number" class="form-control" id="puntajePunto" aria-describedby="puntajePunto" placeholder="-" min="1" max="5">
                    </div>
                    <div class="form-group">
                        <label for="comentarioPunto">Comentario:</label>
                        <textarea class="form-control" rows="3" id="comentarioPunto" placeholder="Deje un comentario..."></textarea>
                    </div>
                    <Button id="buttonComments" style="float:right"  class="btn btn-secondary btn-sm" >Comentarios</Button>
                    <input id="btnAdd" class="btn btn-success btn-sm" type="button" value="Enviar"/> 
                    <Button id="btncerrar" style="float:right"  class="btn btn-danger btn-sm" >X</Button>
                </div>
            
        </div> 
         <div class="over-map over-map-bot-left shadow p-3 mb-5 bg-white rounded" id="divCommentOverMap" style="display: none;">
                <div id="comentarioCabezal" class="text-center">
                    <p id="tituloPOI" class="h3">Comentarios:</p>
                </div>
                <div id="comentarioBody">
                	
                </div>
                
                
            
        </div>   
            
    </div>
    <script src="https://openlayers.org/en/v4.6.5/build/ol.js"type="text/javascript"></script>

	<script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL"></script>
	<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
		integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
		crossorigin="anonymous"></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"
		integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ"
		crossorigin="anonymous"></script>
	<script
		src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"
		integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm"
        crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/rateYo/2.3.2/jquery.rateyo.min.js"></script>   
    <script src="js/VariablesGlobales.js"></script>
    <script src="js/OpenLayers.js"></script>
    <script src="js/home.js"></script>
    <script src="js/busquedaPOI.js"></script>
	<script src="js/admin.js"></script>
	<script src="js/homeFloatingDivs.js"></script>
    <script src="js/openlayerUserHome.js"></script>
    <script src="js/manejadorFiltros.js"></script>
	
</body>
</html>