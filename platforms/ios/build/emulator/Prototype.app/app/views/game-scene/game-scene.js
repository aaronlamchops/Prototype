var platformModule = require("tns-core-modules/platform");
var frameModule = require("ui/frame");
var Page = require("tns-core-modules/ui/page");
var Physics = require("nativescript-physics-js");
var Matter = require("matter-js");


exports.pause_modal = function(args) {
    const page = args.object.page;
    page.showModal("views/pause-modal/pause-modal", "context", function () {
        console.log("modal opened");
    }, true);
};

var init = false;
exports.PhysicJSLoaded = function(args) {

    if (init) {
        return;
    }
    
    // Get references to container and meta-info views
    var page = args.object;
    var container = page.getViewById("game");
    var metaText = page.getViewById("meta");
    
    // Create physics world and configure NS renderer
    var world = Physics();
    world.add(Physics.renderer('ns', {
        container: container,
        metaText: metaText,
        meta: false,
        styles: {
            // set colors for the circle bodies
            'circle' : {
                strokeStyle: '#351024',
                lineWidth: 1,
                fillStyle: '#d33682',
                angleIndicator: '#351024'
            }
        }
    }));

    world.add(Physics.body('circle', {
        x: 120,
        y: 80,
        radius: 30,
        styles: { color: "orange" }
    }));

    // add some fun interaction
    var attractor = Physics.behavior('attractor', {
        order: 0,
        strength: 0.002
    });
    world.on({
        'interact:poke': function( pos ){
            world.wakeUpAll();
            attractor.position( pos );
            world.add( attractor );
        }
        ,'interact:move': function( pos ){
            attractor.position( pos );
        }
        ,'interact:release': function(){
            world.wakeUpAll();
            world.remove( attractor );
        }
    });

    // Add behaviors
    world.add([
        Physics.behavior('edge-collision-detection', { aabb: Physics.aabb(0, 0, platformModule.screen.mainScreen.widthPixels/2, platformModule.screen.mainScreen.heightPixels/2) }),
        Physics.behavior('body-collision-detection'),
        Physics.behavior('body-impulse-response'),
        Physics.behavior('sweep-prune'), 
        Physics.behavior('constant-acceleration'), // Gravity
        Physics.behavior('interactive'),
        Physics.behavior('attractor')
    ]);

    // Start ticking...
    world.on('step', function () { 
        world.render() 
    });

    setInterval(function () { 
            world.step(Date.now()); 
        }, 20);

};


// exports.matterjsLoaded = function(args) {

//     if (init) {
//         return;
//     }
    
//     // Get references to container and meta-info views
//     var page = args.object;
//     var canvas = page.getViewById("game");

//     var engine = Matter.Engine.create();
//     var world = engine.world;
//     var render = Matter.Render.create({
//         canvas: canvas,
//         engine: engine,
//         options: {
//             width: platformModule.screen.mainScreen.widthPixels/2,
//             height: platformModule.screen.mainScreen.heightPixels/2,
//             background: 'transparent',
//             wireframes: true,
//             showAngleIndicator: false
//         }
//     });

//     var ball = Matter.Bodies.circle(x, y, radius, {
//         density: 0.04,
//         friction: 0.01,
//         frictionAir: 0.00001,
//         restitution: 0.8,
//         render: {
//             fillStyle: '#F35e66',
//             strokeStyle: 'black',
//             lineWidth: 1
//         }
//     });
//     Matter.World.add(world, ball);

//     var mouseConstraint = Matter.MouseConstraint.create(engine, { //Create Constraint
//     element: myCanvas,
//     constraint: {
//         render: {
//             visible: false
//         },
//         stiffness:0.8
//     }
//     });
//     Matter.World.add(world, mouseConstraint);

//     Matter.Engine.run(engine);
//     Matter.Render.run(render); 
// };
