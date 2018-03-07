var platformModule = require("tns-core-modules/platform");
var frameModule = require("ui/frame");
var topmost = require("ui/frame").topmost;
var Page = require("tns-core-modules/ui/page");
var observable = require("data/observable");
var pageData = new observable.Observable();

var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
var webViewInterfaceModule = require('nativescript-webview-interface');
var oWebViewInterface;

var specs = {
    width: platformModule.screen.mainScreen.widthPixels/2,
    height: platformModule.screen.mainScreen.heightPixels/2
};


exports.pageLoaded = function(args){
    const page = args.object.page;

    var webView = page.getViewById('webView');      // allows for no scroll and bounce
    webView.ios.scrollView.bounces = false;
    webView.ios.scrollView.scrollEnabled = false;

    setupWebViewInterface(page);

    console.log('page loaded');
    
    pageData.set("loading", false);
	args.object.bindingContext = pageData;
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