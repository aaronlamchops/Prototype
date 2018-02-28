var frameModule = require("ui/frame");
var Page = require("tns-core-modules/ui/page");

exports.basicAction = function() {
    console.log("Button Pressed");
};

exports.navigate_home = function() {
    var topmost = frameModule.topmost();
    topmost.goBack();
};

exports.pause_modal = function(args) {
    const page = args.object.page;
    page.showModal("views/pause-modal/pause-modal", "context", function () {
        console.log("modal opened");
    }, true);
};
