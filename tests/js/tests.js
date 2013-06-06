$(document).ready(function() {

    module('Vector');

    test('Vector constructor', function() {

        var v = new Vector(666, 123);
        ok(v.x == 666 && v.y == 123, 'Wrong coordinates');

        //more tests

    });

});
