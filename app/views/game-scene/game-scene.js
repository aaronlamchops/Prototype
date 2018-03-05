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
    var renderer = Physics.renderer('ns', {container: container, metaText: metaText, meta: false, el: 'viewport'});
    world.add(renderer);

    world.add(Physics.body('rectangle', {
        x: 120,
        y: 80,
        width: 50,
        height: 50,
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
            attractor.position(pos);
            world.add(attractor);
        }
        ,'interact:move': function(pos){
            attractor.position(pos);
        }
        ,'interact:release': function(){
            world.wakeUpAll();
            world.remove(attractor);
        }
    });

    // Add behaviors
    world.add([
        Physics.behavior('edge-collision-detection', { aabb: Physics.aabb(0, 0, platformModule.screen.mainScreen.widthPixels/2, platformModule.screen.mainScreen.heightPixels/2) }),
        Physics.behavior('body-collision-detection'),
        Physics.behavior('body-impulse-response'),
        Physics.behavior('constant-acceleration'), // Gravity
        Physics.behavior('interactive', {el: renderer.el}),
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