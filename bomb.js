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
        timerHandle = setInterval(updateClock, 1000);
    });
    resetButton.addEventListener("click", function(e) {
        console.log("clicked reset!");
        reset();
    });
    // Parent of wires are going to handle the click and then e.target.id = blue, green, red, white, yellow]
    wireBox.addEventListener("click", function(e) { //e = event object
        if (!wiresCut[e.target.id] && !gameOver) {
            // Change the image
            e.target.src = "img/cut-" + e.target.id + "-wire.png";
            // Mark it as cut
            wiresCut[e.target.id] = true; 
            // Was it correct?
            var wireIndex = wiresToCut.indexOf(e.target.id); 
            if (wireIndex > -1) {
                // correct
                console.log(e.target.id + "was correct");
                wiresToCut.splice(wireIndex,1);
                // Here we will check for a win! 
                if(checkForWin()) {
                    endGame(true);
                }
            } else {
                // incorrect
                console.log(e.target.id + "was incorrect");
                delayHandle = setTimeout(function() {
                    // Here we will end the game with a loss!
                    endGame(false);
                }, 750);
            }
        }
        // switch(e.target.id) {
        //     case "blue":
        //         break; 
        //     case "green":
        //         break; 
        //     case "red":
        //         break; 
        //     case "white":
        //         break; 
        //     case "yellow":
        //         break; 
        // };
    })
})

// Functions

function checkForWin () {
    return wiresToCut.length ? false: true; // conditional ? true : false
    // when wiresToCut is greater than 0 return false and if it does have a length of zero return true 
}

function endGame(win) {
    // clear timers
    clearTimeout(delayHandle);
    clearInterval(timerHandle);
    // change the game to over
    gameOver = true;
    // enable the reset button
    resetButton.disabled = false;
    if (win) {
        // win condition
        console.log("You saved the city!");
        timerText.classList.remove("red");
        timerText.classList.add("green");
    } else {
        // loss condition
        console.log("Boom!!!");
        document.body.classList.remove("unexploded");
        document.body.classList.add("exploded");
    }
}

function updateClock() {
    remainingTime--; 
    if (remainingTime <= 0) {
        endGame(false);
    }
    timerText.textContent = "0:00:" + remainingTime;
}

function initGame() {
    startButton.disabled = true;
    wiresToCut.length = 0; // if we make this a new array it would initialize a new array in memory
    remainingTime = STARTING_TIME;
    timerText.textContent = "0:00:" + remainingTime;
    for (let wire in wiresCut) {
        var rand = Math.random();
        if(rand > 0.5) {
            wiresToCut.push(wire);
        }
    }
    console.log(wiresToCut);
    resetButton.disabled = true; 
    startButton.disabled = false; 
}

function reset() { // this is what we need to do in our project! 
    gameOver = false;
    var wireImages = wireBox.children; // HTML collection
    for (let i = 0; i < wireImages.length; i++) {
        wireImages[i].src = "img/uncut-" + wireImages[i].id + "-wire.png";
    }
    document.body.classList.add("unexploded");
    document.body.classList.remove("exploded");
    timerText.classList.remove("green");
    timerText.classList.add("red");
    clearTimeout(delayHandle);
    clearInterval(timerHandle);
    for (let wire in wiresCut) {
        wiresCut[wire] = false;
    }
    initGame();
}

