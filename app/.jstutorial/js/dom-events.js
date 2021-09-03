/* Browser lifecycle event */
// Creating an event waiting for the HTML page to finish loading
//alert(document.getElementById("content")); // Object is null yet
document.addEventListener("DOMContentLoaded", // Waiting for loading page
    function (event) {
        //alert("The page is finish loading"); 
        //alert(document.getElementById("content")); // Object is defined now!
        
        /* Event parameters */
        document.querySelector("body").addEventListener("mousemove", 
            function (event) {
                if (event.shiftKey) {
                    console.log("x: " + event.clientX);
                    console.log("y: " + event.clientY);
                }
            }
        );
    }
);

