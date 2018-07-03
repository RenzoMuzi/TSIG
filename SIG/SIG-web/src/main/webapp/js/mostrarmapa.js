//function iniciarmapa(){
const IPmatias = '172.16.126.47'
	var feat;
	var layer2 = new ol.layer.Vector({
		source: new ol.source.Vector({
		format: new ol.format.GeoJSON(),
		srsname: 'EPSG:32721',
		url: function(extent) {
			return'http://'+IPmatias+':8080/geoserver/TSIG/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TSIG:v_mdg_espacios_libres&outputFormat=application%2Fjson';
			}
		})
		
	});
	
	var layer1 = new ol.layer.Vector({
		source: new ol.source.Vector({
		format: new ol.format.GeoJSON(),
		srsname: 'EPSG:32721',
		url: function(extent) {
			return 'http://'+IPmatias+':8080/geoserver/TSIG/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TSIG:AreaDePromocion&outputFormat=application%2Fjson';
			}
		})
		
	});
	
//	return [layer,layer2];
//}

//function crearMapa(){
	
	var formatWFS = new ol.format.WFS();
	
	var formatGML = new ol.format.GML({
	      featureNS: 'TSIG',
	      featureType: 'TSIG:AreaDePromocion'
	    });

	var xs = new XMLSerializer();
	
	var sourceWFS = new ol.source.Vector({
	    loader: function (extent) {
	        $.ajax('http://'+IPmatias+':8080/geoserver/TSIG/wfs', {
	            type: 'GET',
	            data: {
	                service: 'WFS',
	                version: '1.1.0',
	                request: 'GetFeature',
	                typename: 'AreaDePromocion',
	                srsname: 'EPSG:32721',
	                bbox: extent.join(',') + ',EPSG:32721'
	            }
	        }).done(function (response) {
	            sourceWFS.addFeatures(formatWFS.readFeatures(response));
	        });
	    },

	    projection: 'EPSG:32721'
	});
	
	var layerWFS = new ol.layer.Vector({
	    source: sourceWFS
	});
	
	var interaction;
	
	//-----------------------------------------//
	//var capas = iniciarmapa();
	
	var map = new ol.Map({
	    target: 'map',
	    controls: [],
	    interactions: [
	        new ol.interaction.MouseWheelZoom(),
	        new ol.interaction.DragPan()
	    ],
	    layers: [layer1,layer2,layerWFS],
	    view: new ol.View({
	        center: ol.proj.fromLonLat([5.1643123647663725, 48.21485938377418]),
	        zoom: 12
	    })
	});
	//----------------------------------------------//
	
	var dirty = {};
	var transactWFS = function (f) {

	    var node;
	    node = formatWFS.writeTransaction([f], null, null, formatGML);
	    
	    var payload = xs.serializeToString(node);
	    $.ajax('http://'+IPmatias+':8080/geoserver/wfs', {
	    	service: 'WFS',
	    	type: 'POST',
	        dataType: 'xml',
	        processData: false,
	        contentType: 'text/xml',
	        data: payload
	    }).done(function() {
	        //sourceWFS.clear();
	    });
	};
	map.on('click', function(event) {
		  var coord3857 = event.coordinate;
		  var coord4326 = ol.proj.transform(coord3857, 'EPSG:3857', 'EPSG:4326');
		  sessionStorage.setItem("coordinates", coord4326.toString());
		  console.log(coord3857, coord4326);
		});
	//----------------------------------------------//
    
	interaction = new ol.interaction.Draw({
        type: 'Polygon',
        source: layerWFS.getSource()
    });
    map.addInteraction(interaction);
    interaction.on('drawend', function (e) {
    	
//    	if(ol.Sphere.getArea(e.feature.getGeometry(),'EPSG:32721')>200000){
//    		alert("Area muy grande");
//    		sourceWFS.clear();
//    	}else{
    		sourceWFS.clear();
        	feat = e.feature;
//    	}
    	
    	
    });
	
function onSave(){
    transactWFS(feat);
}