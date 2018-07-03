var idBaseComun = null;
var FeaturePromo = null;
var puedePersistir = false;
map.addLayer(layerWFSPromocion);

var select = new ol.interaction.Select({
	//DESCOMENTANDO LA LINEA DE ABAJO EL EVENTO SE EJECUTA CUANDO PASAS EL RATON POR ARRIBA DE LA FEATURE
    //condition: ol.events.condition.pointerMove
});

var interactionPromo = new ol.interaction.Draw({
	    type: 'Polygon',
	    source: layerWFSPromocion.getSource()
	});

//interactionPromo.on('drawend', function (e) {
//	sourceWFSPromocion.clear();
//    feat = e.feature;
//});

document.getElementById('list-agregarPromocion-list').addEventListener('click',function(){
	map.removeInteraction(interaction);
	map.addInteraction(select);
	
	select.on('select', function(e) {
    	e.selected.forEach(function(e){
    		
            document.getElementById('lblpuntopromotor').innerHTML = e.get('nombre');//TODO: REVISA ESTO WACHO
            idBaseComun = e.get('idExterno');
//            map.removeInteraction(select);/////////////////////////////////////////////////////////////////////////////////////////////////////////
//        	map.addInteraction(interactionPromo);
        });
	});
	
	feat = null;
	FeaturePromo = null;
	//sourceWFSPromocion.clear();
	//sourceWFSPuntoInteres.clear();
	
	

});

function cambiarinteraccion(){
	if (idBaseComun==null){
		alert("Debe seleccionar un Punto de Interes Primero");
	}else{
		map.removeInteraction(select);
		map.addInteraction(interactionPromo);
	}
}


interactionPromo.on('drawend', function (e) {

	
	if(ol.Sphere.getArea(e.feature.getGeometry(),'EPSG:32721')>200000){
		sourceWFSPromocion.clear();
		alert('Error, area muy grande');
		FeaturePromo = null;
//		sourceWFSPromocion.clear();
	}else{
		sourceWFSPromocion.clear();
		FeaturePromo = e.feature;
		verificarPdI(FeaturePromo);
	}
	
	
});

function verificarPdI(feat){
	
	var geom = feat.getGeometry();
	
	var vectorSource = new ol.source.Vector();
	
	var xs = new XMLSerializer();
	
	var featureRequest = new ol.format.WFS().writeGetFeature({
        srsName: 'EPSG:32721',
        featureNS: 'TSIG',
        featurePrefix: 'TSIG',
        featureTypes: ['PuntosDeInteres'],
        outputFormat: 'application/json',
        filter: ol.format.filter.intersects('geometry',geom)
      });
    
      fetch('http://'+IPGeoServer+'/geoserver/wfs', {
 	       method: 'POST',
 	       body: xs.serializeToString(featureRequest)
      }).then(function(response) {
     	 return response.json();
      }).then(function(json) {
    	  console.log("llega al then, no ha comprobado");
 	       var features = new ol.format.GeoJSON().readFeatures(json);
 	       var bool = false;
 	       var x=0;
 	       
			for (var i in features) {
				console.log("control de cada feature id " + i);
				var feature = features[i];
				//REVISA TODOS LOS PUNTOS QUE ESTAN DENTRO Y SE FIJA SI ESTA EL QUE QUEREMOS
				if(feature.get("idExterno")==idBaseComun){
					puedePersistir = true;
					bool = true;
					console.log("puede persistir seteado a true" + i);
				}else{
					console.log("puede persistir en false");
				}
				x++;
				
			}
			if (bool == false){
				alert("El area debe contener al Punto de Interes");
				puedePersistir = false;
			}
// 	       vectorSource.addFeatures(features);
// 	       map.getView().fit(vectorSource.getExtent());
      });
      
}

function addPromo() {
	
	
	
    var nombrePromo = document.getElementById("nombrePromocion");
  
    var descripcionPromocion = document.getElementById("descripcionPromocion");
    var alertType = "";
    if ((nombrePromo.value == "") || (descripcionPromocion == "") || FeaturePromo == null || puedePersistir == false){
        alertType = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                    <strong>Error</strong> No dejes campos vacio.
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>`;
        setTimeout(function() {
            $("#alertDivPromo").fadeIn(1500);
        },0500);
        document.getElementById("alertDivPromo").innerHTML = alertType;
        setTimeout(function() {
            $("#alertDivPromo").fadeOut(1500);
        },3000);

    }else{
    	//--------------PAYLOAD--------------//
    	
    	FeaturePromo.set('nombre',nombrePromo.value);
        FeaturePromo.set('PuntoInteres',idBaseComun);

        var node;
	    node = formatWFSPromocion.writeTransaction([FeaturePromo], null, null, formatGMLPromocion);
	    
	    var payload = xs.serializeToString(node);
    	
    	//-----------------------------------//
	    
        var urlCall = servName + "registrarPromocion?nombre=" + nombrePromo.value + "&descripcion=" + descripcionPromocion.value + "&idPuntoInteres0="+idBaseComun+"&payload="+payload;
        var xhttp;
        xhttp = new XMLHttpRequest();
        xhttp.open("GET", urlCall, true);
        xhttp.onload = function () {
        	var respuesta = this.response;
            var restResponse = respuesta.split('-')[0];
            var alertType = "";
            switch (restResponse) {
                case "true":
                    alertType = `<div class='alert alert-success alert-dismissible fade show' role='alert'>
                                    <strong>Éxito</strong> El punto se ingreso correctamente.
                                    <button type='button' class='close' data-dismiss='alert' aria-label='Close'>
                                        <span aria-hidden='true'>&times;</span>
                                    </button>
                                </div>`;
                    document.getElementById("txtEquipo").innerHTML = "";
                    FeaturePromo.set('nombre',nombrePromo.value);
                    FeaturePromo.set('PuntoInteres',idBaseComun);
//                    transactWFSPromocion(FeaturePromo);
//                    sourceWFSPromocion.clear();
                    FeaturePromo = null;
                    break;

                default:
                    alertType = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                    <strong>Error</strong> El punto que intenta ingresar ya existe.
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>`;
                    break;
            }
            setTimeout(function() {
                $("#alertDivPromo").fadeIn(1500);
            },0500);
            document.getElementById("alertDivPromo").innerHTML = alertType;
            setTimeout(function() {
                $("#alertDivPromo").fadeOut(1500);
            },3000);
            nombrePromo.value = "";
            descripcionPromocion.value = "";
            puntoPromocion.value = "";

        };
        xhttp.send();
        puedePersistir = false;
    }
}


