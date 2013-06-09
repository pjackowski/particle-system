function Config(parameters) {

    //setup default values

    this.particle = {
        ttl: 100,
        radius: 5,
        massRatio: 10,
        strokeStyle: 'rgb(0, 0, 0)',
        fillStyle: 'rgb(255, 255, 255)',
        lineWidth: 1
    };

    this.emitter = {
        radius: 10,
        maxParticles: 100,
        strokeStyle: '#FF0000',
        fillStyle: '#FFFFFF',
        vectorColor: '#FF0000',
        vectorWidth: 3
    };

    this.text = {
        fillStyle: '#000000',
        font: '12px sans-serif'
    };

    this.G = 6.6742867;
    this.MASS = 1000000;
    this.massPositionOffset = new Vector(0, 10000);

    this.friction = 1.0;

    //merge defaults with constructor argument
    if(_.isUndefined(parameters))
        var parameters = {};

    $.extend(this, parameters);

};
