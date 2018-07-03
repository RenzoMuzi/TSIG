function recargarPOI(){
	
	map.removeLayer(capas[1]);
    
	capas[1] = new ol.layer.Vector({
		source: new ol.source.Vector({
		format: new ol.format.GeoJSON(),
		srsname: 'EPSG:32721',
		url: function(extent) {
			return 'http://'+IPGeoServer+'/geoserver/TSIG/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TSIG:PuntosDeInteres&outputFormat=application%2Fjson';
			}
		})
		
    });
    
	map.addLayer(capas[1]);

}