var x = "Hello world!";
function compare (x, y) {
    return x > y;
}
var a = compare(7, 6);
console.log(a);
console.log(a) // Semicolons are OPTIONAL in JS but PREFFERED

/** SCOPE **/
/* Global variable */
var Gx = "Global Variable";
/* Local/Function/Lexical variable */
function localVar () {
    var Lx = "Local Variable";
}

/** SCOPE CHAIN **/
/**
 * Everything is executed in an Exectution Context
 * Function invocation creates a new Execution Context
 * Each Execution Context has:
 * -It's own Variable Execution
 * -Special 'this' object
 * -Reference to its Outer Environment
 * Global scope doesn't have an Outer Environment

 * Referenced (not defined) variable will be searched for in its current scope first.
 * If not found, the Outer Reference will be searched.
 * If not found, the Outer Reference's Outer Reference will be searched, etc.
 * This will keep goinf until the Global scope.
 * If not found in Global scope, the variable is 'undefined'. */

function scope() {
    console.log(Lz); // Calling a variable before it's defined will result 'undefined'
    var Lz = "Local Scope";
    console.log(Lz);
    console.log(Gx); // Calling a Global variable which will be override in local will result 'undefined'
    var Gx = "Overriding a Global Variable";
    console.log(Gx);
}
scope();

/* Scope Chain Example */
var message = "in global";
console.log("SCOPE | global: message = " + message)
var a = function () {
    var message = "inside a";
    console.log("SCOPE | a: message = " + message);
    Gb();

    function Lb() { // Function 'Lb' is defined in Local scope, that's why message equal Local var.
        console.log("SCOPE | Lb: message = " + message);
    }
    Lb();
}
function Gb() { // Function 'Gb' is defined in Global scope, that's why message equal Global var.
    console.log("SCOPE | Gb: message = " + message);
}
a();

/** JAVA SCRIPT TYPES **/
/** 8* Built-in Types:
 * 
 * 1) Object (name:value) | Object is a collection of name/value pairs
 * 
 * and 7* Primitive type represent a single, immutable value
 * 2) Boolean (true | false)
 * 3) Undefined (undefined) means no value has been set | NOT explicilty assigned!
 * 4) Null (null) Lack of value
 * 5) Number (double-precision 64 bit floating point) | Only numeric type. JS doesn't have an integer!
 * 6) String ("text") 
 * 7) Symbol ('a') | New to ES6
 * 
 * (*new) 
 * 8) BigInt (number with unlimited size)
 * 
 * !! Undefined DOESN'T EQUAL to Not Defined !!
 * */

function typesJS () {
    console.log("TYPES | " + typeof(['name: 123']));
    console.log("TYPES | " + typeof(false));
    console.log("TYPES | " + typeof(undefined));
    console.log("TYPES | " + null);
    console.log("TYPES | " + typeof(123));
    console.log("TYPES | " + typeof("text"));
    var id = Symbol("id");
    console.log("TYPES | " + typeof(id));
    console.log("TYPES | " + typeof(123n));
}
typesJS();


/** COMMON LANGUAGE CONSTRUCTS **/
/* String concatination */
var string = "Word";
string += " and another word";
console.log("CONCATINATION | " + string + "!");

/* Regular math */
console.log("MATH | " + (5 + 4) /3 );
console.log("MATH | " + undefined / 3);  // NaN - means Not A Number

/* Equality */
var x = 4, y = 4;
if (x == y) {
    console.log("EQUALITY | x=4 is equal to y=4");
}
x = "4";
if (x == y) {
    console.log("EQUALITY | x='4' is equal to y=4"); // Auto convertation from String to Number
}

/* Strict Equality */
if (x === y) {
    console.log("EQUALITY | x=4 is strict equal to y=4");
}
x = "4";
if (x === y) {
    console.log("EQUALITY | x='4' is strict equal to y=4");
}
else {
    console.log("EQUALITY | x='4' is NOT strict equal to y=4");
}

/* If statement (Boolean) */
/* Boolean Operators: "||" - OR operator, "&&" - AND operator */
if ( false || null || undefined || "" | 0 | NaN) { // if left side of compare is false - all false
    console.log("BOOLEAN IF-ELSE | This line won't ever execute");
}
else {
    console.log("BOOLEAN IF-ELSE | All false");
}
if (null) {
    console.log("BOOLEAN IF-ELSE | null is true");
}
else {
    console.log("BOOLEAN IF-ELSE | null is false");
}
if (undefined) {
    console.log("BOOLEAN IF-ELSE | undefined is true");
}
else {
    console.log("BOOLEAN IF-ELSE | undefined is false");
}
if (NaN) {
    console.log("BOOLEAN IF-ELSE | NaN is true");
}
else {
    console.log("BOOLEAN IF-ELSE | NaN is false");
}

console.log("BOOLEAN IF-ELSE | 1 is true: " + Boolean(1));
console.log("BOOLEAN IF-ELSE | -1 is also true: " + Boolean(-1)); // ! Any number not a zero = True

/* For loop */
var sum1 = 0;
var i = 0;
console.log("FOR LOOP | i = " + i);
for (i; i < 10; i++) { // (counter; condition; increment|decrement)
    console.log("FOR LOOP | i = " + i);
    sum1 = sum1 + i;
}
console.log("FOR LOOP | sum of 0 through 9 is: " + sum1);
console.log("FOR LOOP | i = " + i);
// or
var sum2 = 0;
for (var ii = 0; ii < 10; ii++) { // (counter; condition; increment|decrement)
    sum2 = sum2 + ii;
}
console.log("FOR LOOP | sum of 0 through 9 is: " + sum2);
console.log("FOR LOOP | ii = " + ii);


/** HANDLING **/
function orderWithChicken(sideDish) {
    sideDish = sideDish || "stock dish"; // add default value to argument
    console.log("Chicken with " + sideDish);
}
orderWithChicken("noodles");
orderWithChicken(); // with empty argeument will "Chicken with 'undefined'"


/** OBJECT **/
/* Object Creation */
var company = new Object();
company.name = "Facebook";
console.log(company);
// add new properties
company.ceo = new Object();
company.ceo.firstName = "Mark"; // valid JS Object name
company.ceo.lastName = "Zuckerberg";

console.log(company);
console.log("Facebook CEO name is: " + 
            company.ceo.firstName + " " +
            company.ceo.lastName); // dot notation | work only with valid JS Object name (see row 201)
console.log("Mark Zuckerberg CEO of " + company["name"]); // bracket notation

company["stock of company"] = 110; // invalid JS Object name
console.log("Current Facebook stock is $" + company["stock of company"]);

var favColor = "favorite color"; // alternative for using dot notation with invalid Object name
company.favColor = "blue";
console.log(company.favColor);

/* Better way: object literal */
var tesla = {
    name: "Tesla",
    ceo: {
        firstName: "Elon",
        lastName: "Musk"
    },
    $stock: 110,
    "main product": "Electro Vehicle"
};
console.log(tesla)

/** FUNCTIONS **/
/** Functions Explained
 * 
 * Functions are First-Class Data | 
 * means you could manipulate it like an object (pass to another functions etc.)
 * 
 * Functions ARE Objects
 * 
 *  */
function multiply (x, y) {
    return x * y;
};
console.log("FUNCTION | " + multiply(5,3));
multiply.version = "v.1.0.0";
console.log("FUNCTION | " + multiply);
console.log("FUNCTION | multiply function version is: " + multiply.version);

/* Function factory */
function makeMultiplier(multiplier) {
    var myFunc = function (x) {
        return multiplier * x;
    };

    return myFunc;
};
var multiplyBy3 = makeMultiplier(3);
console.log("FUNCTION | " + multiplyBy3(10));
var doubleAll = makeMultiplier(2);
console.log("FUNCTION | " + doubleAll(100));

/* Function factory */
function doOperationOn (x, operation) {
    return operation(x);
};
var result = doOperationOn(5, multiplyBy3);
console.log("FUNCTION | " + result);


/** PASSING VARIABLES **/
/**
 * In JS primitives are passed by VALUE
 * Objects are passed by REFERENCE | *everything is actually passed by value
 */
/* Copy By Value */
var a = 7;
var b = a;
console.log("PASS | a = " + a + " and b= " + b);
a = 8;
console.log("PASS | now a = " + a + " and b still= " + b);

/* Copy By Reference */
var n = {x: 7};
var m = n;
console.log("PASS | n = " + n.x + " and m= " + m.x);
n.x = 8;
console.log("PASS | now n = " + n.x + " and m now= " + m.x);
m.x = 9;
console.log("PASS | now n = " + n.x + " and m now= " + m.x);

/* Pass by refernce vs by value */
// Change by val
function changePrimitive(primValue) {
    console.log("in changePrimitive...");
    console.log("before:");
    console.log(primValue);

    primValue = 5;
    console.log("after:");
    console.log(primValue);
};
var value = 7;
changePrimitive(value); // primValue = value
console.log("after changePrimitive, orig value:");
console.log(value);

// Change by ref
function changeObject(objValue) {
    console.log("in changeObject...");
    console.log("before:");
    console.log(objValue);

    objValue.x = 5;
    console.log("after:");
    console.log(objValue);
};
value = {x: 7};
changeObject(value); // objValue = value
console.log("after changeObject, orig value:");
console.log(value);


/** FUNCTION CONSTRUCTOR **/
function test() {
    console.log("Hello Coursera!");
    console.log(this);
    this.myName = "Oleg";
}
test();
console.log(this.myName); // or
console.log(window.myName);

/* Function Constructors */
function Circle(radius) {
    console.log(this);
    this.radius = radius * 2;
    console.log(radius);
    console.log(this.radius);
    // return {}; // we cannot return anything from a function constructor

    // make a method | method is JS Object which set a properties to an Object
    this.radius = radius;
    /* this.getArea = function () { // in this case function will be created everytime constructor run
        return Math.PI * Math.pow(this.radius, 2); 
    };
}

var myCircle = new Circle(10);
console.log(myCircle);
console.log(myCircle.getArea());

var myAnotherCircle = new Circle(30);
console.log(myAnotherCircle);
console.log(myAnotherCircle.getArea()); */
}

/* Function Constructors - Prototype */
Circle.prototype.getArea = 
    function () { // in this case function will be created ONCE
        return Math.PI * Math.pow(this.radius, 2);
    }

var myCircleWithProto = new Circle(20);
console.log(myCircleWithProto);

var myAnotherCircleWithProto = new Circle(40);
console.log(myAnotherCircleWithProto.getArea());
// First Rule - don't place a Protoype into Function' body | it's wasted processing
// Second Rule - don't remember use a "new" keyword | otherwise it's just a regular function
// Third Rule - Use capitalised first letter for a Function Constructor


/** OBJECT LITERAL **/
var literalCircle = { // new Object()
    radius: 10,
    getArea: function () {
        var self = this; // debug to assign this for Object
        console.log(this);

        var increaseRadius = function () {
            this.radius = 20; // 'this' reffered to window Object when used in func in another func
        };
        increaseRadius();
        console.log(this.radius);
        var increaseRadius = function () {
            self.radius = 20; // 'self' reffered to 'this' of the Object
        };
        increaseRadius();
        console.log(self.radius);

        return Math.PI * Math.pow(this.radius, 2);
    }
};

console.log(literalCircle.getArea());


/** ARRAYS **/
var array = new Array();
array[0] = "Oleg";
array[1] = 2;
array[2] = function myFunc(name) {
    console.log("Hello "+ name);
    };
array[3] = {course: "HTML, CSS & JS"};
console.log("ARRAY | ");
console.log(array);
console.log(array[1]);
array[2](array[0]);
console.log(array[3].course);

// Short hand array creation
var names = ["Mitch", "Sidor", "Vit"];
console.log(names);
for (var i = 0; i < names.length; i++) {
    console.log("Hello " + names[i]); 
}
names[100] = "Bogdan"; // it makes a 100th element, but also 97 blank elements within
for (var i = 0; i < names.length; i++) {
    console.log("Hello " + names[i]); 
}

var names2 = ["Mitch", "Sidor", "Vit"];
var myObj = {
    name: "Oleg",
    course: "HTML/CSS/JS",
    platform: "Coursera"
};
for (var props in myObj) { // we can change a dummy var (props in this case) to loop props in Object
    console.log(props + ": " + myObj[props]);
}

for (var name in names2) { 
    console.log("Hello " + names2[name]);
}

names2.greeting = "Hi!";
for (var name in names2) { 
    console.log("Hello " + names2[name]);
}

/** CLOSURES **/
/**
 * In JS ALL functions ARE closures (except 'new Function'(?))
 * Closure is a first-class function which has references to var in outer scope
 */
function makeMultiplier (multiplier) {
    function b() {
        console.log("Multiplier is: " + multiplier);    
    }
    b();

    return (
        function (x) {
            return multiplier * x; // multiplier - var in outer scope
        }
    );
}

var doubleAll = makeMultiplier(2);
console.log("CLOSURES | " + doubleAll(10));


//** NAMESPACES **/
/* In JS there are not such functionality like a namespaces */
console.log("NAMESPACES | ");
var name = "Oleg";
function sayHello() {
    console.log("Hello " + name);
}
var name = "John";
function sayHi() {
    console.log("Hi " + name);
}
sayHello(); // say 'Hello John' instead 'Hello Oleg'
sayHi();
// to fix this need to use Fake Namespaces

/* Fake Namecpaces */
var olegGreeter = {}; // creating fake namespace
olegGreeter.name = "Oleg";
olegGreeter.sayHello = function () {
    console.log("Hello " + olegGreeter.name);
}
var johnGreeter = {}; // creating fake namespace
johnGreeter.name = "John";
johnGreeter.sayHi = function () {
    console.log("Hi " + johnGreeter.name);
}
olegGreeter.sayHello(); // say 'Hello Oleg' now !
johnGreeter.sayHi(); // say 'Hi John'
// Another way is to used isolated fucntions - Immediately Invoked Function Expressions (IIFE)


/** IIFE **/
// create a simple func
console.log("IIFE | ");
var newFunc1 = function sayTrue() {
    console.log("This is usual Func");
}
newFunc1();
// same because funcs are objects
var newFunc2 = (function sayTrue() {
    console.log("This is Object also");
});
newFunc2();
// same IIFE
(function sayTrue() {
    console.log("This is IIFE");
})();
// we can also pass parameters to IIFE
(function (name) {
    console.log("Hello " + name);
})("Coursera!");

(function (window) {
    var newGreeter = {}; // creating fake namespace
    newGreeter.name = "New User!";
    var greetingX = "Hello ";
    newGreeter.sayHello = function () {
        console.log(greetingX + newGreeter.name);
    }

    window.newGlobalProp = newGreeter; // expose the function's Object (fake namespace) to Global Object (window)
})(window); // invoke the function and pass Execution Context

newGlobalProp.sayHello();
// console.log(greetingX); // after execution var greeting will destroy and not defined now
console.log(newGlobalProp.name);