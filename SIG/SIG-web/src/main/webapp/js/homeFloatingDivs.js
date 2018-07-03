//jQuery(document).ready(function(){
//    $('.divToClick').click(function(e){
//    	if (isThereAFeature == true){
//    		$('#divPointOverMap').hide();
//		 	$('#divPointOverMap').css({'top':e.pageY-50,'left':e.pageX, 'position':'absolute', 'border':'1px solid white', 'padding':'5px'});
//		 	$('#divPointOverMap').show();
//    	}
//	});
//    
// });

//jQuery(document).ready(function(){
//    $('.divToClick').click(function(e){
//     $('#divPointOverMap').hide();
//     $('#divPointOverMap').css({'top':e.pageY-50,'left':e.pageX, 'position':'absolute', 'border':'1px solid white', 'padding':'5px'});
//     $('#divPointOverMap').show();
//    });
// });

 jQuery(document).ready(function(){
    $("#proximosPartidosButton").click(function(){
        $("#proximosPartidosDiv").toggle();
    });
});

jQuery(document).ready(function(){
    $("#ultimosPartidosButton").click(function(){
        $("#ultimosPartidosDiv").toggle();
    });
});

jQuery(document).ready(function(){
    $("#posicionesButton").click(function(){
        $("#posicionesDiv").toggle();
    });
});

jQuery(document).ready(function(){
    $("#filtrosBusquedaButton").click(function(){
        $("#filtrosDiv").toggle();
        $('#posicionesDiv').hide();
        $('#ultimosPartidosDiv').hide();	
    });
});



jQuery(document).ready(function() {
    // Change this selector to find whatever your 'boxes' are
    var boxes = $(".over-map");

    // Set up click handlers for each box
    boxes.click(function() {
        var el = $(this), // The box that was clicked
            max = 0;

        // Find the highest z-index
        boxes.each(function() {
            // Find the current z-index value
            var z = parseInt( $( this ).css( "z-index" ), 10 );
            // Keep either the current max, or the current z-index, whichever is higher
            max = Math.max( max, z );
        });

        // Set the box that was clicked to the highest z-index plus one
        el.css("z-index", max + 1 );
    });
});



