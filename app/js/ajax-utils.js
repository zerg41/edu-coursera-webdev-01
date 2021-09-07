(function (global) { // using IIFI
    // Set up a namespace for our utility
    var ajaxUtils = {};

    // Returns an HTTP request object
    function getRequestObject() { // this function not in ajaxUtils namespace (unable to call outside)
        if (window.XMLHttpRequest) {
            return (new XMLHttpRequest());
        }
        else if (window.ActiveXObject) {
            // For very old IE browsers (optional)
            return (new ActiveXObject("Microsoft.XMLHTTP"));
        }
        else {
            global.alert("Ajax is not supported!");
            return(null);
        }
    }

    // Makes an Ajax GET request to 'requestUrl'
    /**
     * 
     * @param {*user requested URL} requestURL 
     * @param {*handler for handle result which server returned} responseHandler
     * @param {*for validate JSON string} isJsonResponse
     */
    ajaxUtils.sendGetRequest = function (requestURL, responseHandler, isJsonResponse) {
        var request = getRequestObject(); // get a http request object for current browser
        request.onreadystatechange = function () { 
            /* when the server comes back with a response, this function 
            going to get called every time a change in communication state
            including the very final one (final response) */
            handleResponse(request, responseHandler, isJsonResponse);
            /* we use anonymous function rather than just assign to 'onreadystatechange'
            a function for 2 reasons:
            1) otherwise we need to declare our vars (request, repsonseHandler)
            outside of 'sendGetRequest' function to make them globally available
            2) and this will lead to the possibility of using the same 'request' parameter in
            various requests, which will cause Race Condition 
            (when when we receive a response to the previous request, wrong data or no data at all) */
        };
        request.open("GET", requestURL, true);
        /* all lines above just to set up parameters of the request */

        /* and only last line is actualy the one executes the request and sends it to a server
        if we need to send some parametres to the server we need to change 'null */
        request.send(null); // for POST only
    };

    // Only calls user provided 'responseHandler' function if response is ready and not a error
    function handleResponse(request, responseHandler, isJsonResponse) {
        if ((request.readyState == 4) && (request.status == 200)) {

            if (isJsonResponse == undefined) { // Default to isJsonResponse = true
                isJsonResponse = true;
            }
            if (isJsonResponse) {
                responseHandler(JSON.parse(request.responseText));
            }
            else {
                responseHandler(request.responseText);
            }
            // responseHandler(request); // unused since add isJsonResponse parameter
        }
    }

    // Expose utility to the global object
    global.$ajaxUtils = ajaxUtils;

})(window);