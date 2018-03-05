var frameModule = require("ui/frame");

exports.basicAction = function() {
    console.log("Button Pressed");
};

exports.navigate_gamescene = function() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/game-scene/game-scene");
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

exports.navigate_webview = function(args) {
    var topmost = frameModule.topmost();
    topmost.navigate("views/webview/webview");
};