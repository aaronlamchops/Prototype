var frameModule = require("ui/frame");

exports.basicAction = function() {
    console.log("Button Pressed");
};

exports.navigate_gamescene = function() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/game-scene/game-scene");
};