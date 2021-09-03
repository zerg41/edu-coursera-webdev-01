/** DOM | Document Object Model **/
/**
 * DOM manipulation starts with Global Object named "Document" (window.document)
 * It is provide us to be able to get an individual elements withn our page
 */

console.log(window.document);
/* Special element to get document's element by ID */
var title = document.getElementById("title");
console.log(title);

/* DOM Manipulation */
function sayHello() {
    this.textContent = "Said it!"
    var name = document.getElementById("name").value;
    var message = "<h2>Hello " + name + "!</h2>";

    // document.getElementById("content").textContent = message;
    document.getElementById("content").innerHTML = message;

    if (name === "student") {
        var title = document.querySelector("#title").textContent;
        title += " & Lovin' it!"; // nothing changed 'cause pass by value
        document.querySelector("#title").textContent = title; // excplicit assigned new value
        // document.querySelector("h1") // choosing only the first element with h1 tag
    }
}

/** EVENT HANDLERS **/
/* Unobstrusive event binding */
// document.querySelector("button").addEventListener("click", sayHello); // button become a Call

// another way
document.querySelector("button").onclick = sayHello;

