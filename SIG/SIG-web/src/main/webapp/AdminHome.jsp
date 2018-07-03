<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" crossorigin="anonymous"></script>    
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    
    <script src="https://openlayers.org/en/v4.6.5/build/ol.js" type="text/javascript"></script>
    
    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
    <link rel="stylesheet" href="css/adminHome.css">
    <script src="https://openlayers.org/en/v4.6.5/build/ol.js" type="text/javascript"></script>
    
    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL"></script>
    <link rel="stylesheet" href="https://openlayers.org/en/v4.6.5/css/ol.css" type="text/css">
    <script src="js/VariablesGlobales.js"></script>
    <script type="text/javascript">
		if (sessionStorage.getItem("logged") != "admin"){
			location.href = "index.jsp";
		}
    </script>
    <title>Admin Home</title>
</head>
<body background = "imgs/Rusia-2018.jpg"  style="background-size: cover">
    <div class="container">
        <header>
        <div class="row">
	            <div class=" h1 col-md-10 text-center text-monospace">TSIG RUSIA 2018</div>
	            <button type="button" id="btnSalir" style="float:right;height: 40px;font-size: 12px;" class="btn btn-outline-danger my-2 my-sm-0 col-md-1" onclick="logOut()">Cerrar Sesion</button>
            </div>
        </header>
            <div class="row">
                    <div id="btnsMenu" class="col-4">
                        <div class="list-group" id="list-tab" role="tablist">
                            <a class="list-group-item list-group-item-action active" id="list-agregarEquipo-list" data-toggle="list" href="#list-agregarEquipo" role="tab" aria-controls="agregarEquipo" onclick="quitarInteracciones()">Agregar Equipo</a>
                            <a class="list-group-item list-group-item-action " id="list-agregarPartido-list" data-toggle="list" href="#list-agregarPartido" role="tab" aria-controls="agregarPartido" onclick="quitarInteracciones();loadTeams()">Agregar Partido</a>
                            <a class="list-group-item list-group-item-action" id="list-agregarResultado-list" data-toggle="list" href="#list-agregarResultado" role="tab" aria-controls="agregarResultado" onclick="quitarInteracciones();addResults()">Agregar Resultado</a>
                            <a class="list-group-item list-group-item-action" id="list-agregarPromocion-list" data-toggle="list" href="#list-agregarPromocion" role="tab" aria-controls="agregarPromocion" >Agregar Promocion</a>
                            <a class="list-group-item list-group-item-action" id="list-agregarPuntoInteres-list" data-toggle="list" href="#list-agregarPuntoInteres" role="tab" aria-controls="agregarPuntoInteres">Agregar Punto Interes</a>
                            <a class="list-group-item list-group-item-action" id="list-agregarAdministrador-list" data-toggle="list" href="#list-agregarAdministrador" role="tab" aria-controls="agregarAdministrador" onclick="quitarInteracciones()">Agregar Administrador</a>

                        </div>
                    </div>
                    <div id="contentBtns" class="col-8">
                        <div class="tab-content" id="nav-tabContent">

                            <!-- Contenido agregar equipo -->
                            <div class="tab-pane fade show active" id="list-agregarEquipo" role="tabpanel" aria-labelledby="list-agregarEquipo-list">
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="Equipos">Nombre Equipo</label>
                                            <input class="form-control" id="txtEquipo" aria-describedby="Equipo" placeholder="Ej: Uruguay">
                                        </div>
                                        <div class="form-group">
                                            <label for="grupoPertenece">Seleccione Grupo</label>
                                            <select class="custom-select" id="grupoPertenece" aria-describedby="grupoPertenece">
                                                <option selected value="GrupoA">Grupo A</option>
                                                <option value="GrupoB">Grupo B</option>
                                                <option value="GrupoC">Grupo C</option>
                                                <option value="GrupoD">Grupo D</option>
                                                <option value="GrupoE">Grupo E</option>
                                                <option value="GrupoF">Grupo F</option>
                                                <option value="GrupoF">Grupo G</option>
                                                <option value="GrupoF">Grupo H</option>
                                            </select>
                                        </div>
                                        <div class="topSeparation" id="alertContainerTeam"></div>
                                    </div>
                                    <div class="col-6"><label for=""></label>
                                        <button type="button" onclick="addTeam()" class="btn btn-primary topSeparationBig">Agregar</button>
                                    </div>
                                </div>
                                
                            </div>

                            <!-- Contenido agregar partido -->
                            <div class="tab-pane fade" id="list-agregarPartido" role="tabpanel" aria-labelledby="list-agregarPartido-list">
                                <div class="row">
                                    <div class="col-6">
                                    	<div class="form-group">
                                            <label for="grupoPertenece">Seleccione Grupo</label>
                                            <select class="custom-select" id="idGrupo" onchange="loadTeams()" aria-describedby="idgrupo">
                                                <option selected value="GrupoA">Grupo A</option>
                                                <option value="GrupoB">Grupo B</option>
                                                <option value="GrupoC">Grupo C</option>
                                                <option value="GrupoD">Grupo D</option>
                                                <option value="GrupoE">Grupo E</option>
                                                <option value="GrupoF">Grupo F</option>
                                            </select>
                                        </div>
                                        <label for="agreagarPartidos">Ingrese un partido para fijar</label>
                                        <div class="input-group mb-3">
                                            <select class="custom-select" id="equipos1" aria-describedby="Equipo">
                                            <option selected="">Elije equipo...</option>
                                            </select>
                                            
                                            <select class="custom-select" id="equipos2" aria-describedby="Equipo">
                                                <option selected="">Elije equipo...</option>
                                            </select>
                                        </div>
                                        <input type="date" id="dateMatch" class="form-control" aria-describedby="Equipo">
                                        
                                        <div class="topSeparation" id="alertContainerMatch"></div>
                                    </div>
                                    <div class="col-6">
                                        <button type="button" onclick="addMatch()" class="btn btn-primary topSeparationBig">Agregar</button>
                                    </div>
                                </div>
                                
                            </div>

                            <!-- Contenido agregar resultado -->
                            <div class="tab-pane fade" id="list-agregarResultado" role="tabpanel" aria-labelledby="list-agregarResultado-list">
                                <div class="row">
                                    <div class="col-6" id="colIzq">
                                    </div>
                                    <div class="col-3" id="colDer">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="topSeparation" id="alertDivResult">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Contenido agregar promocion -->
                            <div class="tab-pane fade" id="list-agregarPromocion" role="tabpanel" aria-labelledby="list-agregarPromocion-list">
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <div class="form-group">
                                                <label for="nombrePromocion">Nombre promocion:</label>
                                                <input type="text" class="form-control" id="nombrePromocion" aria-describedby="nombrePromocion" placeholder="2x1 tragos">
                                            </div>
                                            <div class="form-group">
                                                <label for="puntoPromotor">Punto promotor:</label>
                                                <label id='lblpuntopromotor'></label>
                                                <input type='button' class='btn btn-primary' id='btnsetarea' onclick="cambiarinteraccion()" value='Fijar Zona'/>
<!--                                                 <select name="puntoPromotor" id="puntoPromotor" class="custom-select" aria-describedby="puntoPromotor"> -->
<!--                                                     <option selected value="">Elije Categoria</option> -->
<!--                                                 </select> -->
                                                
                                            </div>
                                            <div class="form-group">
                                                <label for="descripcionPromocion">Descripcion:</label>
                                                <textarea class="form-control" rows="3" id="descripcionPromocion" placeholder="Describa la promocion..."></textarea>
                                            </div>
                                        </div>
                                        <div class="topSeparation" id="alertDivPromo"></div>
                                    </div>
                                    <div class="col-6">
                                        <button type="button" onclick="addPromo()" class="btn btn-primary topSeparationBig">Agregar</button></div>
                                    </div>
                                </div>
                            
                            
                            
                            <!-- Contenido agregar punto de interes-->
                            <div class="tab-pane fade" id="list-agregarPuntoInteres" role="tabpanel" aria-labelledby="list-agregarPuntoInteres-list">
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <div class="form-group">
                                                    <label for="nombrePuntoDeInteres">Nombre Punto de Interes:</label>
                                                    <input class="form-control" id="nombrePuntoDeInteres" aria-describedby="nombrePuntoDeInteres" placeholder="Ej: Estadio Pochinski">
                                            </div>
                                            <!--aca tengo que ver si lo cambio por un select-->
                                            <div class="form-group">
                                                <label for="tipoPuntoDeInteres">Categoria Punto de Interes</label>
                                                <select class="custom-select" id="tipoPuntoDeInteres" onchange="loadOtherAttributes()" aria-describedby="tipoPuntoDeInteres">
                                                    <option selected value="">Elije Categoria</option>
                                                    <option value="Hotel">Hotel</option>
                                                    <option value="Estadio">Estadio</option>
                                                    <option value="Bar">Bar</option>
                                                    <option value="LugarTuristico">Lugar Turistico</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div id="conditionalInputs" >

                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="descripcionPuntoDeInteres">Descripcion:</label>
                                            <textarea class="form-control" rows="3" id="descripcionPuntoDeInteres" placeholder="Escriba una breve rese�a del lugar..."></textarea>
                                        </div>
                                        <div class="topSeparation" id="alertContainerPunto"></div>
                                    </div>
                                    <div class="col-6 d-flex align-items-center justify-content-center">
                                        <button class="btn btn-primary" onclick="addPointOfInterest()">Agregar</button>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Contenido agregar agregar administracion -->
                            <div class="tab-pane fade" id="list-agregarAdministrador" role="tabpanel" aria-labelledby="list-agregarAdministrador-list">
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="nickAdmin">Nick del nuevo administrador:</label>
                                            <input class="form-control" id="nickAdmin" aria-describedby="nickAdmin" placeholder="Ingrese Nick">
                                        </div>
                                        <div class="form-group">
                                            <label for="passwordAdmin">Contrase�a:</label>
                                            <input type="password" class="form-control" id="passwordAdmin" placeholder="Contrase�a">
                                        </div>
                                        <div class="form-group">
                                            <label for="confirmPassword">Contrase�a:</label>
                                            <input type="password" class="form-control" id="confirmPassword" placeholder="Repita contrase�a">
                                        </div>
                                        <div class="topSeparation" id="alertContainerAddAdmin"></div>
                                    </div>
                                    <div class="col-6">
                                        <button type="button" onclick="addAdmin()" class="btn btn-primary topSeparationBig">Agregar</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
            </div>
            
            <!-- Contenido mapa -->
            
            <div class="row" >
            <div  class="col-12" id="map"></div>

            </div>

</div>
    <script src="js/admin.js"></script>
    <script src="js/OpenLayers.js"></script>
    <script src="js/agregarAdmin.js"></script>
    <script src="js/agregarEquipo.js"></script>
    <script src="js/agregarPartido.js"></script>
    <script src="js/agregarResultado.js"></script>
    <script src="js/agregarPromocion.js"></script>
    <script src="js/agregarPuntoDeInteres.js"></script>
    
	
</body>
</html>
