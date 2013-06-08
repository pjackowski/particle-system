# HTML5 Canvas particle system

Quick example how to use HTML5 Canvas to create simple simulation.


## Dependencies

* jquery-1.8.2.min.js
* underscore-1.4.4.js
* modernizr.custom.11682.js (small, custom biuld)
    * HTML Canvas
    * Canvas text
    * localStorage


## Testing

Demo was tested in Chrome 27 and Firefox 21.


## Todo

Demo is missing proper timing, so it is not simulation and will run with different speed on different machines. Also masses and vectors are loosely scaled and do not reflect real objects.

All parameters should be in config, which can be served by factory method.

More controllers/sliders: blend, speed, density, blur, randomness,  opacity)

Nice effects to implement:
* heavy particles
* smoke
* plasma
* fire
* fog
* rain
* snow

Memory leek should be fixed. Objects once deleted still referring to DOM canvas, so they might not be collected by GC.
