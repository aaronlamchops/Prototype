const topmost = require("ui/frame").topmost;

exports.closeModal = function(args) {
    const page = args.object.page;
    page.closeModal();
};

exports.quit = function(args) {
    const page = args.object.page;
    page.closeModal();

    const navigationEntry = {
        moduleName: "./views/main-page/main-page",
        clearHistory: true,                             // clears stack of navigated pages
        animated: true,
        transition: {
            name: "fade"
        }
    };
    topmost().navigate(navigationEntry);
    
};