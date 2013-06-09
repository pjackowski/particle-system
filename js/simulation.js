function Simulation(config, parameters) {

    var that = this;

    this.config = config;

    //setup default values
    this.canvas = '';           //canvas jQuery selector
    this.context = null;        //2D context
    this.emitters = [];         //array of emitters

    //merge defaults with constructor argument
    if(_.isUndefined(parameters))
        var parameters = {};

    $.extend(this, parameters);

    //setup context
    try {

        this.context = $(this.canvas)[0].getContext("2d");

    } catch(TypeError)

    {

        console.error('Simulation: Missing canvas selector');
        return;

    }

    //newest emitter
    var emitter = null;

    //setup mouse handlers

    var leftButtonDown = false;

    $(this.canvas).mousedown(function(event) {

        //handle mouse
        leftButtonDown = true;
        var pointer = getMousePosition(event, this);

        that.deleteEmitters();

        emitter = new Emitter(that.config, {
            p: new Vector(pointer.x, pointer.y),
            force: new Vector(pointer.x, pointer.y),
            context: that.context
        });

        that.emitters.push(emitter);

        //prevent bubbling and selecting text in Chrome
        return false;

    });

    $(this.canvas).mousemove(function(event) {

        if(leftButtonDown) {

            //redraw emitter's launcher vector
            //when mouse pointer goes over canvas

            //handle mouse
            var pointer = getMousePosition(event, this);

            //redraw emitter's launcher vector
            if(!_.isNull(emitter))
                emitter.setForce(new Vector(pointer.x, pointer.y));

        }

    });

    $(this.canvas).mouseout(function(event) {

        if(leftButtonDown) {

            //redraw emitter's launcher vector
            //when mouse pointer goes beyound canvas

            //handle mouse
            var pointer = getMousePosition(event, this);

            //redraw emitter's launcher vector
            if(!_.isNull(emitter))
                emitter.setForce(new Vector(pointer.x, pointer.y));

            //preserve prameters of emitters
            that.save();

        }

        leftButtonDown = false;

    });

    $(this.canvas).mouseup(function(event) {

        //handle mouse
        leftButtonDown = false;
        var pointer = getMousePosition(event, this);

        //redraw emitter's launcher vector
        if(!_.isNull(emitter))
            emitter.setForce(new Vector(pointer.x, pointer.y));

        //preserve prameters of emitters
        that.save();

    });

    //load emitters
    this.load();

    //start simulation
    this.main();

};

Simulation.prototype.main = function() {

    var that = this;

    //clear canvas
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

    //draw emitter, particles and animate
    for(var i = 0; i < this.emitters.length; i++) {

        //draw emitters
        this.emitters[i].draw();

        //handle particles
        this.emitters[i].emit();
        this.emitters[i].action();

    }

    this.draw();

    var timer = setTimeout(function() {
        that.main();
    }, 20);

};

Simulation.prototype.save = function() {

    //check if local storage is supported
    if(Modernizr.localstorage) {

        //blacklist context, as it causes circular reference
        var whitelist = [];

        for(var i = 0; i < this.emitters.length; i++) {

            //vector can be shallow copy
            var em = this.emitters[i];

            whitelist.push({
                p: em.p,
                force: em.force
            });

        }

        //save emitters, particles will be restarted
        //JSON might be not available in older IE
        localStorage.setItem('emitters', JSON.stringify(whitelist));

    } else

    {
        //local storage is not available

        //come to the dark side
        //we have cookies

    }

};

Simulation.prototype.load = function() {

    //check if local storage is supported
    if(Modernizr.localstorage) {

        var emittersJSON = localStorage.getItem('emitters');

        if(!_.isNull(emittersJSON)) {

            //load saved emitters
            var emitters = JSON.parse(emittersJSON);

            this.deleteEmitters();

            //recreate emitters
            for(var i = 0; i < emitters.length; i++) {

                this.emitters.push(
                    new Emitter(this.config, {
                        p: new Vector(emitters[i].p.x, emitters[i].p.y),
                        force: new Vector(emitters[i].force.x, emitters[i].force.y),
                        context: this.context
                    })
                );

            }

        }

    } else

    {
        //local storage is not available

        //come to the dark side
        //we have cookies, more cookies

    }

};

Simulation.prototype.clear = function() {

    //check if local storage is supported
    if(Modernizr.localstorage) {

        //delete saved data
        localStorage.removeItem('emitters');

    }

    this.deleteEmitters();

    //clear canvas
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

};

Simulation.prototype.deleteEmitters = function() {

    //delete emitters

    for(var i = 0; i < this.emitters.length; i++)
        this.emitters[i].particles = [];

    this.emitters = [];

    Particle.instances = [];

}

Simulation.prototype.draw = function() {

    //draw statistics

    this.context.fillStyle = this.config.fillStyle;
    this.context.font = this.config.font;
    this.context.textBaseline = 'top';
    this.context.fillText('Particles: ' + Particle.instances.length, 6, 6);

};
