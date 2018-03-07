var webViewInterfaceModule = require('nativescript-webview-interface');
var platformModule = require("tns-core-modules/platform");

var oWebViewInterface;

// var specs = {
//     width: platformModule.screen.mainScreen.widthPixels/2,
//     height: platformModule.screen.mainScreen.heightPixels/2
// };

var specs = {
    width: 500,
    height: 500
};

exports.pageLoaded = function(args){
    page = args.object;

    var webView = page.getViewById('webView');      // allows for no scroll and bounce
    webView.ios.scrollView.bounces = false;
    webView.ios.scrollView.scrollEnabled = false;

    setupWebViewInterface(page);
    console.log('page loaded');
}

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


