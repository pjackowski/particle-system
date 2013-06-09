function Particle(config, parameters) {

    this.config = config;
    var cfg = this.config.particle;

    //setup default values
    this.p = new Vector(0, 0);                  //position
    this.ttl = cfg.ttl;                         //time to live
    this.v = new Vector(0, 0);                  //current velocity
    this.dV = new Vector(0, 0);                 //velocity delta
    this.force = new Vector(0, 0);              //initial force
    this.radius = cfg.radius;                   //radius of circle
    this.mass = this.radius * cfg.massRatio;    //mass
    this.strokeStyle = cfg.strokeStyle;         //stroke color
    this.fillStyle = cfg.fillStyle;             //fill color
    this.lineWidth = cfg.lineWidth;             //line width of circle
    this.emitter = null;                        //reference to parent
    this.context = null;                        //2D context

    //merge defaults with argument
    if(_.isUndefined(parameters))
        var parameters = {};

    $.extend(this, parameters);

    Particle.instances.push(this);

    this.draw();

};

Particle.instances = [];

Particle.prototype.draw = function() {

    //draw particle

    this.context.beginPath();
    this.context.arc(this.p.x, this.p.y, this.radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = this.fillStyle;
    this.context.fill();
    this.context.lineWidth = this.lineWidth;
    this.context.strokeStyle = this.strokeStyle;
    this.context.stroke();

};

Particle.prototype.applyMotion = function() {

    //compute motion

    var direction = this.force;
    var direction = direction.getNormalized();

    var a = this.force.getLength() / this.mass;

    //clear force after initial impulse
    this.force = new Vector(0, 0);

    return direction.getMultiplied(a);

};

Particle.prototype.applyGravity = function() {

    //compute gravity

    var G = this.config.G;
    var MASS = this.config.MASS;

    //mass center is under emitter, far away
    var massCenter = new Vector(this.emitter.p.x, this.emitter.p.y);
    massCenter = massCenter.addVector(this.config.massPositionOffset);

    var direction = massCenter.subVector(this.p);
    var distance = direction.getLength();

    direction = direction.getNormalized();

    //this is why Newton was hit by an apple in 1600s
    var force = (G * this.mass * MASS) / (distance * distance);

    var a = force / this.mass;

    return direction.getMultiplied(a);

};

Particle.prototype.action = function() {

    //all computation happenes here

    var mV = this.applyMotion();
    var gV = this.applyGravity();

    //apply computation
    this.dV = this.dV.addVector(mV);
    this.dV = this.dV.addVector(gV);

    //apply friction (1.0 - no friction)
    //add delta V and update position
    this.v = this.v.addVector(this.dV);
    this.v = this.v.getMultiplied(this.config.friction);
    this.dV = new Vector(0, 0);

    this.p = this.p.addVector(this.v);

    return this.kill();

};

Particle.prototype.kill = function() {

    //kill particle if ttl expired
    //technically objects are marked for reuse

    if(this.ttl > 0) {

        this.ttl--;
        return true;

    } else

    {
        this.destroy();
        return false;
    }

}

Particle.prototype.destroy = function() {

    //drop particle
    Particle.instances = _.without(Particle.instances, this);

};
