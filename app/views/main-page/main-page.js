var frameModule = require("ui/frame");
var gridModule = require("ui/layouts/grid-layout");
var gestures = require("ui/gestures");

exports.onLoaded = function(args) {
    var page = args.object;
    var myStack = page.getViewById("container");
    myStack.on(gestures.GestureTypes.swipe, function(args){
        console.log("SWIPED");
    });
};

exports.navigate_gamescene = function() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/game-scene/game-scene");
};

exports.navigate_webview = function() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/webview/webview");
};

exports.navigate_settings = function(args) {
    const page = args.object.page;
    page.showModal("views/settings-screen/settings-screen", "context", function () {
        console.log("modal opened");
    }, true);
};

exports.navigate_about = function(args) {
    const page = args.object.page;
    page.showModal("views/about-screen/about-screen", "context", function () {
        console.log("modal opened");
    }, true);
};
