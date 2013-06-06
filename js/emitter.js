function Emitter(parameters) {

    //setup default values
    this.p = null;                      //position
    this.force = null;                  //initial force
    this.radius = 10;                   //radius of circle (1..10)
    this.speed = 1;                     //speed of production (1..100)
    this.randomness = 1;                //randomness of motion (1..100)
    this.maxParticles = 100;             //max particles per emitter (1..100)
    this.context = null;                //2D context
    this.particles = [];                //array of particles

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

    this.context.beginPath();
    this.context.arc(this.p.x, this.p.y, this.radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = '#FF0000';
    this.context.fill();
    this.context.lineWidth = 1;
    this.context.strokeStyle = '#000000';
    this.context.stroke();

    this.context.beginPath();
    this.context.lineWidth = '3';
    this.context.strokeStyle = '#FF0000';
    this.context.moveTo(this.p.x, this.p.y);
    this.context.lineTo(this.force.x, this.force.y);
    this.context.stroke();

};

Emitter.prototype.emit = function() {

    //create particle
    //should be timed, limited amount of particles per second
    //this applies to entire simulation

    if(this.particles.length < this.maxParticles) {

        var particle = new Particle({
            p: new Vector(this.p.x + _.random(-20, 20), this.p.y + _.random(-20, 20)),
            ttl: 10 + _.random(50),
            force: this.force.subVector(this.p),
            radius: _.random(1, 10),
            color: 'rgb(' + _.random(255) + ',' + _.random(255) + ',' + _.random(255) + ')',
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
