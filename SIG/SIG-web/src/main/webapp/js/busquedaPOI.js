var interactionAux = null;
var rad =0;

document.getElementById("btnSearch").addEventListener("click",function(){
	var textoBuscar;
	    textoBuscar = document.getElementById("busqueda").value;
            cargarFeatureNombre(textoBuscar);
    
});

function cargarFeatureTipo(textoBuscar){
    
    var busqueda = "'"+textoBuscar+"'";

    map.removeLayer(capas[1]);
    capas[1] = new ol.layer.Vector({
		source: new ol.source.Vector({
		format: new ol.format.GeoJSON(),
		srsname: 'EPSG:32721',
		url: function(extent) {
			return 'http://'+IPGeoServer+'/geoserver/TSIG/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TSIG:PuntosDeInteres&outputFormat=application%2Fjson&CQL_FILTER=tipo='+busqueda;
			}
		})
		
    });
    map.addLayer(capas[1]);


}

function cargarFeatureNombre(textoBuscar){

    var busqueda = "*"+textoBuscar+"*";


    map.removeLayer(capas[1]);

    var vectorSource = new ol.source.Vector();
	
	var xs = new XMLSerializer();
    
    var fil = ol.format.filter;
    
	var featureRequest = new ol.format.WFS().writeGetFeature({
        srsName: 'EPSG:32721',
        featureNS: 'TSIG',
        featurePrefix: 'TSIG',
        featureTypes: ['PuntosDeInteres'],
        outputFormat: 'application/json',
        filter: fil.like('nombre',busqueda)   
        
      });
    
      fetch('http://'+IPGeoServer+'/geoserver/wfs', {
 	       method: 'POST',
 	       body: xs.serializeToString(featureRequest)
      }).then(function(response) {
     	 return response.json();
      }).then(function(json) {
 	       var features = new ol.format.GeoJSON().readFeatures(json);
 	      
 	       vectorSource.addFeatures(features);
      });

    

    capas[1].setSource(vectorSource);

    map.addLayer(capas[1]);

}

function cargarFeatureCalificacion(stringMm,numero){
    var simbolo;
    if(stringMm == "Mayor"){
        simbolo = ">";
    }else if(stringMm == "Igual"){
        simbolo = "=";
    }else   {
        simbolo = "<";
    }

    map.removeLayer(capas[1]);
    capas[1] = new ol.layer.Vector({
		source: new ol.source.Vector({
		format: new ol.format.GeoJSON(),
		// filter: ol.format.filter.equalTo('nombre', textoBuscar),
		srsname: 'EPSG:32721',
		url: function(extent) {
			return 'http://'+IPGeoServer+'/geoserver/TSIG/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TSIG:PuntosDeInteres&outputFormat=application%2Fjson&CQL_FILTER=puntaje'+simbolo+numero; 
			}
		})
		
    });
    map.addLayer(capas[1]);
   
    

}

function cargarFeatureDistancia(textoBuscar){

    
    rad = parseInt(textoBuscar);
    //alert(rad);
    
        
}
	function verificarPdI2(geom){
	
        var vectorSource = new ol.source.Vector();
        
        var layercoso = new ol.layer.Vector();
        
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
               var features = new ol.format.GeoJSON().readFeatures(json);
              
               if(features.length==0){
                   alert("No se encuentran puntos de interes");
               }
              
               vectorSource.addFeatures(features);
               capas[1].setSource(vectorSource);
	            map.addLayer(capas[1]);
         });
     
    }

