var platformModule = require("tns-core-modules/platform");
var frameModule = require("ui/frame");
var Page = require("tns-core-modules/ui/page");

var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
var webViewInterfaceModule = require('nativescript-webview-interface');
var oWebViewInterface;

var specs = {
    width: platformModule.screen.mainScreen.widthPixels/2,
    height: platformModule.screen.mainScreen.heightPixels/2
};

var loader = new LoadingIndicator();
 
// optional options
// android and ios have some platform specific options
var options = {
  message: 'Loading...',
  progress: 0.65,
  android: {
    indeterminate: true,
    cancelable: true,
    cancelListener: function(dialog) { console.log("Loading cancelled") },
    max: 100,
    progressNumberFormat: "%1d/%2d",
    progressPercentFormat: 0.53,
    progressStyle: 1,
    secondaryProgress: 1
  },
  ios: {
    details: "Additional detail note!",
    margin: 10,
    dimBackground: true,
    color: "#4B9ED6", // color of indicator and labels
    // background box around indicator
    // hideBezel will override this if true
    backgroundColor: "yellow",
    hideBezel: true, // default false, can hide the surrounding bezel
    view: UIView, // Target view to show on top of (Defaults to entire window)
  }
};
 
loader.show(options); // options is optional

exports.pageLoaded = function(args){
    page = args.object;

    var webView = page.getViewById('webView');      // allows for no scroll and bounce
    webView.ios.scrollView.bounces = false;
    webView.ios.scrollView.scrollEnabled = false;

    loader.show(options); // options is optional
    setupWebViewInterface(page);
    loader.hide();

    console.log('page loaded');
}

exports.pause_modal = function(args) {
    const page = args.object.page;
    page.showModal("views/pause-modal/pause-modal", "context", function () {
        console.log("modal opened");
    }, true);
};

function setupWebViewInterface(page){
    var webView = page.getViewById('webView');
    oWebViewInterface = new webViewInterfaceModule.WebViewInterface(webView, '~/www/index.html');
    
    webView.on('loadFinished', (args) => {
        if (!args.error) {
            loadIntoWebView();
        }
    });

}

function loadIntoWebView(){
    oWebViewInterface.emit('loadCanvas', specs);        // respond to the event 'loadCanvas' in index.js
}