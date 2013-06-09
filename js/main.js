$(document).ready(function() {

    //check if canvas is supported
    if(Modernizr.canvas && Modernizr.canvastext) {

        //all features supported, good!
        //load defaults and start simulation

        var config = new Config();

        var simulation = new Simulation(config, {
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
