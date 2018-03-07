var Web = (function(){

    var that = {};
    var oWebViewInterface = window.nsWebViewInterface;      // oWebViewInterface provides necessary APIs for communication to native app.


    function addNativeMsgListener(){
        oWebViewInterface.on('loadCanvas', function (specs) {
            var spec = {
                width: specs.width,
                height: specs.height
            }
            Physics.initialize(spec);
        });
    }

    that.initialize = function(){
        addNativeMsgListener();
    };


    return that;

}());