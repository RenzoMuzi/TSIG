
var feat = null;
var transactWFSPuntoInteres = null;
var interactionPromo = null;

function featisNull(){
	return feat;
}

var iconStyle = new ol.style.Style({
    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png'
    }))
});


function iniciarmapa(){
//	  
//	var layer2 = new ol.layer.Vector({
//		source: new ol.source.Vector({
//		format: new ol.format.GeoJSON(),
//		//renderMode: 'image',
//		srsname: 'EPSG:32721',
//		url: function(extent) {
//			return'http://'+IPGeoServer+'/geoserver/TSIG/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TSIG:01esp_libres&outputFormat=application%2Fjson';
//			}
//		})
//		
//	});
//	
	var layer = new ol.layer.Vector({
		source: new ol.source.Vector({
		format: new ol.format.GeoJSON(),
		srsname: 'EPSG:32721',
		
		url: function(extent) {
			return 'http://'+IPGeoServer+'/geoserver/TSIG/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TSIG:PuntosDeInteres&outputFormat=application%2Fjson';
			}
		})
		
	});
	
//	var layer4 = new ol.layer.Vector({
//		source: new ol.source.Vector({
//		format: new ol.format.GeoJSON(),
//		srsname: 'EPSG:32721',
//		//renderMode: 'image',
//		url: function(extent) {
//			return 'http://'+IPGeoServer+'/geoserver/TSIG/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TSIG:01manzanas&outputFormat=application%2Fjson';
//			}
//		})
//		
//	});
	
	
	var layerBase = new ol.layer.Tile({
    	source: new ol.source.OSM(),
    	 srsname: 'EPSG:32721'
	
    });
    
	
//	var layer3 = new ol.layer.Vector({
//		source: new ol.source.Vector({
//		format: new ol.format.GeoJSON(),
//		srsname: 'EPSG:32721',
//		//renderMode: 'image',
//		url: function(extent) {
//			return 'http://'+IPGeoServer+'/geoserver/TSIG/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TSIG:v_mdg_vias&outputFormat=application%2Fjson';
//			}
//		})
//		
//	});
	
	
	
	return [layerBase,layer];
}

	

	var formatWFSPuntoInteres = new ol.format.WFS();
	
	var formatGMLPuntoInteres = new ol.format.GML({
	      featureNS: 'TSIG',
	      featureType: 'TSIG:PuntosDeInteres'
	    });

	var xs = new XMLSerializer();
	
	var sourceWFSPuntoInteres = new ol.source.Vector({
	    loader: function (extent) {
	        $.ajax('http://'+IPGeoServer+'/geoserver/TSIG/wfs', {
	            type: 'GET',
	            data: {
	                service: 'WFS',
	                version: '1.1.0',
	                request: 'GetFeature',
	                typename: 'PuntosDeInteres',
	                srsname: 'EPSG:32721',
	                bbox: extent.join(',') + ',EPSG:32721'
	            }
	        }).done(function (response) {
	            sourceWFSPuntoInteres.addFeatures(formatWFSPuntoInteres.readFeatures(response));
	        });
	    },

	    projection: 'EPSG:32721'
	});
	
	var layerWFSPuntoInteres = new ol.layer.Vector({
	    source: sourceWFSPuntoInteres
	});
	
	
	
	
	
	
	var interaction;

	
	//-----------------------------------------//
	var capas = iniciarmapa();
	
	var map = new ol.Map({
	    target: 'map',
	    controls: [],
	    interactions: [
	        new ol.interaction.MouseWheelZoom(),
	        new ol.interaction.DragPan()
	    ],
	    layers:[],
	    view: new ol.View({
	        center: ol.proj.fromLonLat([-56.16386890411377, -34.90877459464654]),
	        zoom: 14
	    })
	
	});
	map.addLayer(capas[0]);
	map.addLayer(capas[1]);
	
//	map.on('click', function(event){
//		var coord3857 = event.coordinate;
//		var coord4326 = ol.proj.transform(coord3857, 'EPSG:3857', 'EPSG:4326');
//		console.log(coord3857,coord4326);
//	});
	//----------------------------------------------//
	
	
	transactWFSPuntoInteres = function (f) {

	    var node;
	    node = formatWFSPuntoInteres.writeTransaction([f], null, null, formatGMLPuntoInteres);
	    
	    var payload = xs.serializeToString(node);
	    $.ajax('http://'+IPGeoServer+'/geoserver/wfs', {
	    	service: 'WFS',
	    	type: 'POST',
	        dataType: 'xml',
	        processData: false,
	        contentType: 'text/xml',
	        data: payload
	    }) 
	};
	
	//----------------------------------------------//
	//-----------capas agregar promocion------------//
	
var formatWFSPromocion = new ol.format.WFS();
	
	var formatGMLPromocion = new ol.format.GML({
	      featureNS: 'TSIG',
	      featureType: 'TSIG:AreaDePromocion'
	    });

	//var xs = new XMLSerializer();
	
	var sourceWFSPromocion = new ol.source.Vector({
	    loader: function (extent) {
	        $.ajax('http://'+IPGeoServer+'/geoserver/TSIG/wfs', {
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
	            sourceWFSPromocion.addFeatures(formatWFSPromocion.readFeatures(response));
	        });
	    },

	    projection: 'EPSG:32721'
	});
	
	var layerWFSPromocion = new ol.layer.Vector({
	    source: sourceWFSPromocion
	});
	
	var transactWFSPromocion = function (f) {

	    var node;
	    node = formatWFSPromocion.writeTransaction([f], null, null, formatGMLPromocion);
	    
	    var payload = xs.serializeToString(node);
	    $.ajax('http://'+IPGeoServer+'/geoserver/wfs', {
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
	
	function quitarInteracciones(){
		try{
			map.removeInteraction(select);			
		}catch(err){}

		try{
			map.removeInteraction(interaction);
		}catch(err){}
		try{
			map.removeInteraction(interactionPromo);
		}catch(err){}
		try{
			map.removeInteraction(interactionAux);
		}catch(err){}
		try{
			map.removeInteraction(selectDesc);
		}catch(err){}
		
	}
	

	
	function logOut(){
		sessionStorage.setItem("nick", " ");
		sessionStorage.setItem("nombre", " ");
		sessionStorage.setItem("hotel", " ");
		sessionStorage.setItem("seleccion", " ");
		sessionStorage.setItem("logged","none");
		location.href = "index.jsp";
	}