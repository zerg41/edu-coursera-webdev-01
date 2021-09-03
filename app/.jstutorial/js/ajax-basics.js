/** HTTP BASICS **/
/* Identifying resources on the Web */
/**
 * HTTP stands for Hyper Text Transport Protocol
 * It is based on request/response STATELESS protocol,
 * which means that response sended by client (browser)
 * doesn't depend on any preevious requests that the browser made.
 * 
 * URN: Uniform Resource Name
 * -Uniquely identifies resource or name of resource
 * -Doesn't tell how to get the resource
 * -Commonly used by organizations to standartize recources name
 * example: "HTML/CSS/Web Developers/[Author name]"
 * 
 * URI: Uniform Resource Identifier
 * -Uniquely identifies resource or location of resource
 * -Doesn't necessary tell how to get the resource
 * -Simillar to URN but more directory type of structure looking
 * example: "/app/js/ajax-basics.js"
 * 
 * URL: Uniform Resource Locator
 * -Is a form of URI that provides the information on how to get that resource
 * example: "http://localhost:3000/app/js/ajax-basics.js"
 */

/* HTTP Request/Response Structure */
/**
 * ****** GET ******
 * 'GET /index.html?firstName=Yaakov HTTP/1.1'
 * ----
 * method / URI String / Query String (name/value pairs separated by &) / HTTP version
 * We asked URL on previous step when connection client-server was established
 * 
 * ****** POST *******
 * 'POST /index.html HTTP/1.1   |  method / URI String / HTTP version
 * Host: coursera.org           |  request header
 * Accept-Charset: utf-8        |  ____________
 * firstName=Yaakov..           |  request body
 * ..
 * ..'
 * ----
 * Message in body
 * 
 * ****** HTTP Response ******
 * 'HTTP/1.1 200 OK'                    |  HTTP version / Response status code / English phrase status
 * Date: Tue, 11 Aug 2004 19:00:01 GMT  |  response header
 * Content-Type: text/html              |  _______________
 * <html>                               |  response body (not necessary HTML)
 * <body...'
 * ----
 * Message in body
 */

/* HTTP Methods */
/** 
 * GET
 * -retrieves the resource
 * -data is passed to server as part of the URI (i.e. query string)
 * -data not stored on server
 * 
 * POST
 * -sends data to server in order to be processed
 * -data is sent the message body
 */

/* Some Response Status Codes */
/** 
 * 200 OK
 * -Ok, here is the content you requested
 * 
 * 404 Not Found
 * -Server can't find the resource requested
 * 
 * 403 Forbidden
 * -Unauthenticated client to tried acces a secure resource
 * 
 * 500 Internal Server Error
 * -Some unhandled erroe was raised on the server
 */

/** AJAX BASICS **/
/** 
 * Asynchronous Javascript And XML
 * 
 * While Ajax started with XML, very few apps use it nowadays
 * -Plain text (at times as html) and JSON is used instead
 * 
 * Faster response
 * -Less bandwith, better UX
 */

/* Event handling */
document.addEventListener("DOMContentLoaded", 
    function (event) {
        
        /* Unobstrusive event binding */
        document.querySelector("button").addEventListener("click", 
            function () {
                // var self = this; // button object
                // var name = ""; 
                /* don't need until assignment in ajax function scope */
                
                /** Text Processing **/
                // /* Call server to get the name */
                // $ajaxUtils.sendGetRequest("/data/name.txt", 
                //     function (request) {
                //         // self.name = request.responseText;
                //         var name = request.responseText;
                        
                //         /* Assign the value of the name from the response to the tagged element */
                //         document.querySelector("#content").innerHTML =
                //         "<h3>Hello " + /*self.name*/ name + "!</h3>";
                //         console.log("content after AJAX: " + document.querySelector("#content").textContent);
                //     }
                // );

                // /* while ajax is async it will run next line until response has finished
                // and set empty name value to a #content */
                // /* Assign the value of the name from the response to the tagged element */
                // // document.querySelector("#content").innerHTML = "<h3>Hello " + self.name + "!</h3>";
                // // console.log(self); // since we comment 'self' it's a window object not a button object
                // console.log("content before AJAX: " + document.querySelector("#content").textContent);

                /** JSON Processing **/
                /* Call server to get the name */
                $ajaxUtils.sendGetRequest("/data/name.json", 
                    function (res) {
                        // self.name = request.responseText;
                        var message = res.firstName + " " + res.lastName
                        if (res.likesChineseFood) {
                            message += " likes Chinese food";
                        }
                        else {
                            message += " doesn't like Chinese food";
                        }
                        message += " and uses ";
                        message += res.numberOfDisplays + 1;
                        message += " displays for coding.";
                        
                        /* Assign the value of the name from the response to the tagged element */
                        document.querySelector("#content").innerHTML =
                        "<h3>" + message + "</h3>";
                    }
                );
            }
        );
    }
);

/* Processing JSON */
/**
 * JSON - JavaScript Object Notation
 * -Lightweight data-interchange format
 * -Easy for humans to read and write
 * -Easy for machines to parse and generation
 * -Similar to XML but simpler and shorter
 * -Independent for language
 * 
 * Syntax Rules
 * -Property names and String values must be in ""
 * -Example:
 * {
 * "firstName" : "Elon:,
 * "lastName" : "Musk",
 * "likesChineseFood" : false,
 * "numberOfDisplays" : 2
 * }
 * 
 * var jsonString = '{JSON FILE}';| single quotes as well
 * 
 * Common Misconception
 * -JSON is NOT a JS Object Literal
 * -JSON is just a string
 * -JSON syntax is based on Object Literal though
 * -Need to convert JSON into a JS Object
 * 
 * Converting JSON to string and back
 * -json to object
 * var obj = JSON.parse(jsonString);
 * -object to json
 * var str = JSON.stringify(obj);
 */