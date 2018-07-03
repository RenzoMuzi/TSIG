	var interactionFiltro = null;
	var coord = null;
	var vector = null;
	var geolocation = null;
	
    	document.getElementById("checkTipo").addEventListener("change",function(){
    		if(!document.getElementById("checkTipo").checked){
        		document.getElementById("DIVcheckTipo").style.pointerEvents="none";
        		document.getElementById("DIVcheckTipo").style.color="Grey";
        	}else{
        		document.getElementById("DIVcheckTipo").style.pointerEvents="";
        		document.getElementById("DIVcheckTipo").style.color="black";

        	}
    		
    	});
    	
    	document.getElementById("checkDistPunto").addEventListener("change",function(){
    		if(!document.getElementById("checkDistPunto").checked){
    			
        		document.getElementById("DIVcheckDistPunto").style.pointerEvents="none";
        		document.getElementById("DIVcheckDistPunto").style.color="Grey";
        		coord = null;
        		vector.getSource().clear();
        		map.removeInteraction(interactionFiltro);
        	}else{
        		quitarInteracciones()
        		if(geolocation!=null){
        			vector.getSource().clear();
        			geolocation.setTracking(false);
            		map.removeLayer(vector);
            		vector = null;
        		}

        		coord = null;
        		document.getElementById("DIVcheckDistPunto").style.pointerEvents="";
        		document.getElementById("DIVcheckDistPunto").style.color="black";
        		document.getElementById("DIVcheckDistMia").style.pointerEvents="none";
        		document.getElementById("DIVcheckDistMia").style.color="Grey";
        		document.getElementById("checkDistMia").checked = false;

        		var source = new ol.source.Vector({wrapX: false});

    			vector = new ol.layer.Vector({
    				source: source
    			});
        		
        		interactionFiltro = new ol.interaction.Draw({
        	        type: 'Point',
        	        source: source
        	    });
        	    map.addInteraction(interactionFiltro);
        	    interactionFiltro.on('drawend', function (e) {
        	    	vector.getSource().clear();
        	    	coord = e.feature.getGeometry().getCoordinates();
        	    });
        	    
        	    map.addLayer(vector);
        	}
    		
    	});
    	
    	document.getElementById("checkDistMia").addEventListener("change",function(){
    		if(!document.getElementById("checkDistMia").checked){
        		document.getElementById("DIVcheckDistMia").style.pointerEvents="none";
        		document.getElementById("DIVcheckDistMia").style.color="Grey";
        		geolocation.setTracking(false);
        		vector.getSource().clear();
        		map.removeLayer(vector);
        		vector = null;
        		coord = null;
        	}else{
        		coord = null;
        		quitarInteracciones()
        		document.getElementById("DIVcheckDistMia").style.pointerEvents="";
        		document.getElementById("DIVcheckDistMia").style.color="black";
        		document.getElementById("checkDistPunto").checked = false;
        		document.getElementById("DIVcheckDistPunto").style.pointerEvents="none";
        		document.getElementById("DIVcheckDistPunto").style.color="Grey";
        		
        		if(interactionFiltro!=null){
        			map.removeInteraction(interactionFiltro);
        		}
        		if(vector!=null){
        			vector.getSource().clear();
        			map.removeLayer(vector);
        			vector = null;
        		}
        		
        		geolocation = new ol.Geolocation({
        			projection: map.getView().getProjection()
		        });
        		
        		geolocation.setTracking(true);
        		
				var accuracyFeature = new ol.Feature();
					geolocation.on('change:accuracyGeometry', function() {
					accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
					coord = geolocation.getPosition();
				});
				
				var positionFeature = new ol.Feature();
				positionFeature.setStyle(new ol.style.Style({
					image: new ol.style.Circle({
						radius: 6,
						fill: new ol.style.Fill({
							color: '#3399CC'
						}),
							stroke: new ol.style.Stroke({
							color: '#fff',
							width: 2
						})
					})
				}));
				
				geolocation.on('change:position', function() {
					var coordinates = geolocation.getPosition();
					positionFeature.setGeometry(coordinates ?
					new ol.geom.Point(coordinates) : null);
				});
				
				vector = new ol.layer.Vector({
					map: map,
					source: new ol.source.Vector({
						features: [positionFeature]
					})
				});
			}
    		
		});
    	
    	document.getElementById("checkPuntaje").addEventListener("change",function(){
    		if(!document.getElementById("checkPuntaje").checked){
        		document.getElementById("DIVcheckPuntaje").style.pointerEvents="none";
        		document.getElementById("DIVcheckPuntaje").style.color="Grey";
        		

        	}else{
        		document.getElementById("DIVcheckPuntaje").style.pointerEvents="";
        		document.getElementById("DIVcheckPuntaje").style.color = "black";

        	}
    		
    	});	
/////////////////////////////////////////********************************************************////////////////////////////////////////////////
/////////////////////////////////////////****************BOTON APLICAR FILTROS*******************////////////////////////////////////////////////
document.getElementById('btnFiltrar').addEventListener('click', function(){

			
	    	var checktipo = false,
	    	checkdistpunto = false,
	    	checkdistmia = false,
	    	checkpuntaje = false;
			var valuetipo = '',
			valuedistpunto = 0,
			featurepunto,
			valuedistmia = 0,
			featgeo,
			valuepuntaje = 0, 
			valuecomparador = '';
			
	    	if(document.getElementById("checkTipo").checked){
	    		valuetipo = document.getElementById("filterTipoPunto").value;
	    		checktipo = true;
	    	}
		
			if(document.getElementById("checkDistPunto").checked){
				valuedistpunto = document.getElementById("rangoDistanciaPunto").value;
				checkdistpunto = true;
	    	}
			
			if(document.getElementById("checkDistMia").checked){
				valuedistmia = document.getElementById("rangoDistanciaDeMi").value;
				checkdistmia = true;
				
			}
	
			if(document.getElementById("checkPuntaje").checked){
				valuecomparador = document.querySelector('input[name="options"]:checked').value;
				valuepuntaje = $("#rateYo").rateYo("rating");
				checkpuntaje = true;
			}
			
			var filtro = null;
			var f = ol.format.filter;
			
			var fcomp = null;
			
			if(checkdistpunto||checkdistmia){
				if(coord!=null){
					var rad = 0;
					if(checkdistpunto){
						rad = parseInt(valuedistpunto);
					}else{
						rad = parseInt(valuedistmia);
					}
	
					var circle = new ol.geom.Circle(coord, rad);
					
					var geom = new ol.geom.Polygon.fromCircle(circle, 40);
					
					switch(valuecomparador){
						case 'mayor': fcomp = ol.format.filter.greaterThan('puntaje', valuepuntaje); break;
						case 'menor': fcomp = ol.format.filter.lessThan('puntaje', valuepuntaje); break;
						case 'igual': fcomp = ol.format.filter.equalTo('puntaje', valuepuntaje); break;
						default: fcomp = ol.format.filter.lessThan('puntaje', 6); break;
					}
					
					filtro = f.and(
						f.intersects('geometry',geom),
						f.like('tipo','*'+valuetipo+'*'),
						fcomp
					);
				
				}else{
					alert("ERROR: No se ingreso ninguna geometria");
				}
				
			}else{
				switch(valuecomparador){
					case 'mayor': fcomp = ol.format.filter.greaterThan('puntaje', valuepuntaje); break;
					case 'menor': fcomp = ol.format.filter.lessThan('puntaje', valuepuntaje); break;
					case 'igual': fcomp = ol.format.filter.equalTo('puntaje', valuepuntaje); break;
					default: fcomp = ol.format.filter.lessThan('puntaje', 6); break;
				}
				
				filtro = f.and(
					f.like('tipo','*'+valuetipo+'*'),
					fcomp
				)
			}
			
		map.removeLayer(capas[1]);
		
		var vectorSource = new ol.source.Vector();
		
		var xs = new XMLSerializer();
		
		var featureRequest = new ol.format.WFS().writeGetFeature({
			srsName: 'EPSG:32721',
			featureNS: 'TSIG',
			featurePrefix: 'TSIG',
			featureTypes: ['PuntosDeInteres'],
			outputFormat: 'application/json',
			filter: filtro       
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

	
//	interactionFiltro = null;
	coord = null;
//	vector = null;
	geolocation = null;
});
/////////////////////////////////////////********************************************************////////////////////////////////////////////////	

jQuery(document).ready(function(){

	
/**********************************************************************************************************************************************/
    ////////////colocar estrellas
    $(function () {
 
        $("#rateYo").rateYo({
          normalFill: "#A0A0A0",
        	  fullStar: true
        });
       
    });

    /////////////para obtener valor de estrellas ver la pagina que puse comentada en el home

    

    //////////////para obtener el valor del rango de distancia de un punto
    var slider = document.getElementById("rangoDistanciaPunto");
    var output = document.getElementById("valorDistancia");
    output.innerHTML = slider.value;
    slider.oninput = function() {
      output.innerHTML = this.value;
      $("#divRangoDeMi").hide();
    }
   //////////////para obtener el valor del rango de distancia de un punto a mi
    var sliderMi = document.getElementById("rangoDistanciaDeMi");
    var outputMi = document.getElementById("valorDistanciaDeMi");
    outputMi.innerHTML = sliderMi.value;

    sliderMi.oninput = function() {
      outputMi.innerHTML = this.value;
      $("#divRangoDePunto").hide();
    }
    
    ///////////////resetear filtros
    $("#resetFilters").click(function(){
		$("#rateYo").rateYo("rating",0);
		document.getElementById("filterTipoPunto").value = "Hotel";
		document.getElementById("rangoDistanciaPunto").value = "550";
		document.getElementById("rangoDistanciaDeMi").value = "550";
		output.innerHTML = "550";
		outputMi.innerHTML = "550";
		$("#divRangoDePunto").show();
		$("#divRangoDeMi").show();
		document.getElementById("checkTipo").checked = false;
		document.getElementById("checkDistPunto").checked = false;
		document.getElementById("checkDistMia").checked = false;
		document.getElementById("checkPuntaje").checked = false;
		document.getElementById("DIVcheckTipo").style.pointerEvents="none";
		document.getElementById("DIVcheckTipo").style.color="Grey";
		document.getElementById("DIVcheckDistPunto").style.pointerEvents="none";
		document.getElementById("DIVcheckDistPunto").style.color="Grey";
		document.getElementById("DIVcheckDistMia").style.pointerEvents="none";
		document.getElementById("DIVcheckDistMia").style.color="Grey";
		document.getElementById("DIVcheckPuntaje").style.pointerEvents="none";
		document.getElementById("DIVcheckPuntaje").style.color="Grey";
	});
      
   
    
});

