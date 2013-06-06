$(document).ready(function() {

    //check if canvas is supported
    if(Modernizr.canvas && Modernizr.canvastext) {

        //all features supported, good!
        var simulation = new Simulation({
            canvas: '#canvas'
        });

        $('button.clear').click(function() {
            simulation.clear();
        });

    } else

    {
        $('.missingCanvas').removeClass('ninja');
        console.error('HTML5: Missing canvas support');
        return;
    }

});
