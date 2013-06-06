function Vector(x, y) {

    this.x = x;
    this.y = y;

};

Vector.prototype.set = function(x, y) {

    this.x = x;
    this.y = y;

};

Vector.prototype.getDistance = function(v) {

    var xPow= Math.pow((this.x - v.x), 2);
    var yPow= Math.pow((this.y - v.y), 2);
    var distance= Math.sqrt(xPow + yPow);

    return distance;

};

Vector.prototype.getLength = function(v) {

    return (
        this.getDistance(new Vector(0, 0))
    );

};

Vector.prototype.getNormalized = function() {

    if((this.x == 0) && (this.y == 0))
        return this;

    var vLen = this.getLength();

    return(
        new Vector((this.x/vLen), (this.y/vLen))
    );

};

Vector.prototype.getMultiplied = function(scalar) {

    return(
        new Vector(scalar*this.x, scalar*this.y)
    );

},

Vector.prototype.addVector = function(v) {

    return(
        new Vector(this.x + v.x, this.y + v.y)
    );

};

Vector.prototype.subVector = function(v) {

    return(
        new Vector(this.x - v.x, this.y - v.y)
    );

};
