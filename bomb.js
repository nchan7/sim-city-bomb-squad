console.log('loaded!');

// Variables
const STARTING_TIME = 30; 
var gameOver = false;
var remainingTime = 0;
var delayHandle = null;
var timerHandle = null;

var wiresToCut = [];
var wiresCut = {
    blue: false,
    green: false,
    red: false,
    white: false, 
    yellow: false
};

// DOM References
var timerText;
var startButton;
var resetButton;
var blue;
var green;
var red; 
var white;
var yellow;
var wireBox;

// Event Listeners
document.addEventListener("DOMContentLoaded", function(e) {
    timerText = document.getElementById("timertext");
    startButton = document.getElementById("startbutton");
    resetButton = document.getElementById("resetbutton");
    blue = document.getElementById("blue");
    green = document.getElementById("green");
    red = document.getElementById("red");
    white = document.getElementById("white");
    yellow = document.getElementById("yellow");
    wireBox = document.getElementById("wirebox");

    startButton.addEventListener("click", function(e) {
        console.log("clicked start!");
    });
    resetButton.addEventListener("click", function(e) {
        console.log("clicked reset!");
    });
    // Parent of wires are going to handle the click and then e.target.id = blue, green, red, white, yellow]
    wireBox.addEventListener("click", function(e) { //e = event object
        switch(e.target.id) {
            case "blue":
                console.log(e.target);
                break; 
            case "green":
                console.log(e.target);
                break; 
            case "red":
                console.log(e.target);
                break; 
            case "white":
                console.log(e.target);
                break; 
            case "yellow":
                console.log(e.target);
                break; 
        };
    })

})

