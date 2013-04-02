require([
  "dojo/dom", "dojo/fx", "dojox/gfx", "dojox/gfx/Moveable", "dojo/_base/array", "dojo/window",
  "dojox/gfx/fx", "dojo/domReady!"
],

  function (dom, fx, gfx, move, array, win, gfxFX) {
    // Create a new dojo surface element.  This allows to draw allllll
    // over the f'in place.  How sweet is that?
    var canvasEle = dom.byId("canvas");
    var surface = gfx.createSurface(canvasEle);

    // Specify the number of circles we want on the screen.
    var numberOfCircles = 200;

    // Get the size of the viewport!
    var vpDimensions = win.getBox();
    var vpWidth = vpDimensions.w;
    var vpHeight = vpDimensions.h;

    // Create a generic group, because we're adding all the circles
    // to this group so it can all be moved at once.
    var starsFar = surface.createGroup();
    var starsNear = surface.createGroup();
    var starsStay = surface.createGroup();

    // Create a new circle object on the surface/screen.
    function makeCircle(radius, x, y) {
      // Randomly get x, y, and radius... these will be used if not
      // supplied in the fn() when called.
      var randX = x || Math.floor(Math.random() * vpWidth);
      var randY = y || Math.floor(Math.random() * vpHeight);
      var randR = radius || Math.random() + 1.2;

      // Createa a circle on the surface.
      var circ = surface.createCircle({
          cx: x || randX,
          cy: y || randY,
          r: radius || randR
        })
          .setFill("white")
          .setStroke("black");

      if (randR < 1.6) {
        starsFar.add(circ);
      } else if (randR >= 1.6 && randR < 2) {
        starsStay.add(circ);
      } else {
        starsNear.add(circ);
      }
      return circ;
    }

    // Since our circles have not been created yet, we need to create them.
    // This 'for loop' will cycle through and create the number of circles
    // specified in 'numberOfCircles'.
    for (var i=0; i<numberOfCircles; i++) {
        new move(makeCircle());
    }

    // Get the coordinates of the middle of the screen.
    var vpScreenX = vpWidth/2;
    var vpScreenY = vpHeight/2;

    // Set a state variable to false on start - flips at completion.
    // This is used to determine what values to use in rotating the stars.
    var flip = true;

    function spinStars() {

      if (flip === true) {
        // Set the starting positions.
        startNear = 360;
        startFar =  360;
        // Set the ending positions.
        endNear = -0.05;
        endFar = 0.05;
        flip = false;
      } else if (flip === false) {
        // Set the starting positions.
        startNear = -0.05;
        startFar =  0.05;
        // Set the ending positions.
        endNear = 0;
        endFar = 0;
        flip = true;
      }
        // Spinning behaviors, asynchronously running!
        new gfxFX.animateTransform({
            duration: 7000,
            repeat: -1,
            easing: function(n) { return n;},
            shape: starsNear,
            transform: [{
                name: 'rotateAt',
                start: [startNear, vpScreenX, vpScreenY],
                end: [endNear, vpScreenX, vpScreenY]
            }]
        }).play();
        new gfxFX.animateTransform({
            duration: 7000,
            shape: starsFar,
            transform: [{
                name: 'rotateAt',
                start: [startFar, vpScreenX, vpScreenY],
                end: [endFar, vpScreenX, vpScreenY]
            }]
        }).play();
    }

    // Start off by spinning the stars at least once!
    spinStars();

    // // Then, start to spin the stars ever 4.5 seconds.
    // setInterval(function(){
    //   spinStars();
    // }, 4500);
});