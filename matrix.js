require([
    "dojo/dom", "dojo/fx", "dojox/gfx", "dojox/gfx/Moveable", "dojo/_base/array", "dojo/window", "dojo/domReady!"
    ],

    function(dom, fx, gfx, move, array, win){
        // Create a new dojo surface element.  This allows to draw allllll
        // over the f'in place.  How sweet is that?
        var canvasEle = dom.byId("canvas");
        var surface = gfx.createSurface(canvasEle);

        // Specify the number of circles we want on the screen.
        var numberOfCircles = 200;

        // Get the size of the viewport!
        var vpDimensions = win.getBox();
        var vpWidth = vpDimensions.w
        var vpHeight = vpDimensions.h

        // Create a generic group, because we're adding all the circles
        // to this group so it can all be moved at once.
        // var group = surface.createGroup();
        var allStars = [];

        // Create a new circle object on the surface/screen.
        function makeCircle(radius, x, y){
            // Randomly get x, y, and radius... these will be used if not
            // supplied in the fn() when called.
            var randX = Math.floor(Math.random()*vpWidth);
            var randY = Math.floor(Math.random()*vpHeight);
            var randR = Math.floor(Math.random()+1.5);

            // Createa a circle on the surface.
            var circ = surface.createCircle({
                cx: x || randX,
                cy: y || randY,
                r: radius || randR
                })
            .setFill("white")
            .setStroke("black");
            return circ

        };

        // Since our circles have not been created yet, we need to create them.
        // This 'for loop' will cycle through and create the number of circles
        // specified in 'numberOfCircles'.
        for(var i=0; i<numberOfCircles; i++){
            // Create a new circle with a new variable name of newCirc + the
            // 'i' value of the current iteration.
            var newCirc = new move(makeCircle());
            // Add the newly created circle to the group.
            // group.add(makeCircle());

        // Make it moveable!  This allows us to grab and drag!  Yay!
        // var moveable = new move(group);
        };

        function gravity(circle){
            // Let balls fall.
            fx.moveTo
        }
    });