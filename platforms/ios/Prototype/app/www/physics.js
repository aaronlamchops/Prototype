var Physics = (function(){

    var that = {};

    that.initialize = function(spec){           // Spec contains native width and height
        //Fetch our canvas
        var canvas = document.getElementById('world');
        
        //Setup Matter JS
        var engine = Matter.Engine.create();
        var world = engine.world;
        var render = Matter.Render.create({
            canvas: canvas,
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                background: 'transparent',
                wireframes: true,
                showAngleIndicator: true
            }
        });

        window.addEventListener("resize", function(){
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
         });
        
        //Add a ball
        var ball = Matter.Bodies.circle(250, 250, 50, {
            density: 0.04,
            friction: 0.01,
            frictionAir: 0.00001,
            restitution: 0.8,
            render: {
                fillStyle: '#F35e66',
                strokeStyle: 'black',
                lineWidth: 1
            }
        });
        Matter.World.add(world, ball);
        
        //Add a floor
        var floor = Matter.Bodies.rectangle(canvas.width/2, canvas.height, canvas.width, 10, {
            isStatic: true, //An immovable object
            render: {
                visible: true
            }
        });
        Matter.World.add(world, floor);

        //Add a floor
        var ceiling = Matter.Bodies.rectangle(canvas.width/2, 0, canvas.width, 10, {
            isStatic: true, //An immovable object
            render: {
                visible: true
            }
        });
        Matter.World.add(world, ceiling);

        //Add a floor
        var leftWall = Matter.Bodies.rectangle(0, canvas.height - canvas.height/2, 10, canvas.height, {
            isStatic: true, //An immovable object
            render: {
                visible: true
            }
        });
        Matter.World.add(world, leftWall);

        // Add a floor
        var rightWall = Matter.Bodies.rectangle(canvas.width, canvas.height - canvas.height/2, 10, canvas.height, {
            isStatic: true, //An immovable object
            render: {
                visible: true
            }
        });
        Matter.World.add(world, rightWall);
        
        //Make interactive
        var mouseConstraint = Matter.MouseConstraint.create(engine, { //Create Constraint
            element: canvas,
            constraint: {
                render: {
                    visible: false
                },
                stiffness:0.8
            }
        });
        Matter.World.add(world, mouseConstraint);
        
        //Start the engine
        Matter.Engine.run(engine);
        Matter.Render.run(render);
    };

    return that;

}());