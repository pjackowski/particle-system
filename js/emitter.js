function Emitter(config, parameters) {

    this.config = config;
    var cfg = this.config.emitter;

    //setup default values
    this.p = new Vector(0, 0);              //position
    this.force = new Vector(0, 0);          //initial force
    this.radius = cfg.radius;               //radius of circle
    this.maxParticles = cfg.maxParticles;   //max particles per emitter
    this.strokeStyle = cfg.strokeStyle;     //stroke color
    this.fillStyle = cfg.fillStyle;         //fill color
    this.lineWidth = cfg.lineWidth;         //line width of circle
    this.vectorColor = cfg.vectorColor;     //stroke color of force vector
    this.vectorWidth = cfg.vectorWidth;     //line width of of force vector
    this.context = null;                    //2D context
    this.particles = [];                    //array of particles

    //merge defaults with constructor argument
    if(_.isUndefined(parameters))
        var parameters = {};

    $.extend(this, parameters);

    this.draw();

};

Emitter.prototype.setForce = function(v) {

    this.force = v;

};

Emitter.prototype.draw = function() {

    //draw emitter and initial impulse
    //vector first, so it will be covered by circle

    this.context.beginPath();
    this.context.strokeStyle = this.vectorColor;
    this.context.lineWidth = this.vectorWidth;
    this.context.moveTo(this.p.x, this.p.y);
    this.context.lineTo(this.force.x, this.force.y);
    this.context.stroke();

    this.context.beginPath();
    this.context.arc(this.p.x, this.p.y, this.radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = this.fillStyle;
    this.context.fill();
    this.context.lineWidth = this.lineWidth;
    this.context.strokeStyle = this.strokeStyle;
    this.context.stroke();

};

Emitter.prototype.emit = function() {

    //create particle
    //should be timed, limited amount of particles per second
    //this applies to entire simulation

    if(this.particles.length < this.maxParticles) {

        var particle = new Particle(this.config, {
            p: new Vector(this.p.x + _.random(-20, 20), this.p.y + _.random(-20, 20)),
            ttl: 10 + _.random(50),
            force: this.force.subVector(this.p),
            radius: _.random(1, 10),
            strokeStyle: 'rgb(' + _.random(255) + ',' + _.random(255) + ',' + _.random(255) + ')',
            emitter: this,
            context: this.context
        });

        this.particles.push(particle);

    }

};

Emitter.prototype.action = function() {

    var particlesToRemove = [];

    //animate and draw particles
    for(var i = 0; i < this.particles.length; i++) {

        var result = this.particles[i].action();
        this.particles[i].draw();

        //check if particle died and mark it to remove
        if(!result)
            particlesToRemove.push(this.particles[i]);

    }

    //delete dead particles
    this.particles = _.difference(this.particles, particlesToRemove);

};
