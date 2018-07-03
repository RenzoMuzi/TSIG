<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
    <link rel="stylesheet" href="https://openlayers.org/en/v4.6.5/css/ol.css" type="text/css">
    <link rel="stylesheet" href="css/home.css">
    <title>Home</title>
</head>
<body>
    <div class="wrapper">
        <div id="map"></div>

        <div class="over-map over-map-top-left">
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

        <div class="over-map over-map-bot-right">
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

        <div class="over-map over-map-top-right">
            <div id="posicionesCabezal" class="text-center">
                <p class="h3">Posiciones</p>
            </div>
            <div id="posicionesEquipos">
                   
            </div>
        </div>
        
            
    </div>
    <script src="js/home.js"></script>
    <script src="admin.js"></script>
    <script src="https://openlayers.org/en/v4.6.5/build/ol.js" type="text/javascript"></script>
    <script src="js/OpenLayers.js"></script>
    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL"></script>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" crossorigin="anonymous"></script>    
</body>
</html>