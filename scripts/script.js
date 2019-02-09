var bestScores = [];

// Starts the game
// Creates the player shaceship and the first target
// Also initialize shotexist, numshot et shotsfired, variables needed to create shots

function startGame(){
    document.querySelector(".replay").style.display="none";
    document.querySelector(".splashScreen").style.display = "none";
    document.querySelector(".area").style.display = "block";
    gameArea.createCanvas();
    startTime = new Date();
    document.querySelector("canvas").style.display = "block";
    gameArea.start();
    shotexist = false;
    targetsCount = 0;
    numshot = 0;
    shotsfired = [];
    reload = 20;
    myTimer = new textComp("30px", 'AtarianSystemExtended', 'white', 700, 40);
    myScore = new textComp("30px", "AtarianSystemExtended", "white",20, 40);
    spaceship = new drawcomp(document.querySelector("#spaceship"),300,450,200,200);
    alien = new drawcomp(document.querySelector('#alien'),getRandomPosition()[0],getRandomPosition()[1],120,120);
}

function endGame(){
    document.querySelector("canvas").style.display = "none";
    document.querySelector(".replay").style.display = "flex";
    document.querySelector("#score").innerHTML ="Your score : "+ String(endTimer) + " seconds";
    ul = document.querySelector("#classment");
    ul.innerHTML="";
    if (bestScores.length < 4){
        for (i=0; i<bestScores.length;i++){
            li = document.createElement("li");
            li.appendChild(document.createTextNode(bestScores[i]+" seconds"));
            ul.appendChild(li);
        }
    } else if (bestScores.length >= 4){
        for (i=0 ; i< 4 ; i++){
            li = document.createElement("li");
            li.appendChild(document.createTextNode(bestScores[i]+" seconds"));
            ul.appendChild(li);
        }
    }
    document.querySelector("#replayBtn").removeEventListener("click",startGame);
    replay()
}

function replay(){
    setTimeout(function(){
        document.querySelector("#replayBtn").addEventListener("click",startGame);
    }, 1500);    
}

// Create the canvas into the html body
// -- start : initialize the canvas and sets its attributes
// -- start : also includes evenListeners changing the "key" property of the gameArea based on the key pressed by user.
// -- clear : clear everything from the canvas, used to prevent duplicates when refreshing the canvas

var gameArea = {
    canvas : document.createElement("canvas"),
    createCanvas : function(){
        this.canvas.height = 600;
        this.canvas.width = 800;
        this.canvas.style.background = "black";
        this.context = this.canvas.getContext("2d");
        document.querySelector(".area").insertBefore(this.canvas,document.querySelector(".area").childNodes[0]);},
    start : function(){
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function(e){
            gameArea.keys = (gameArea.keys || []);
            gameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup',function(e){
            gameArea.keys[e.keyCode] = false;
        })
    },
    clear : function() {
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
      }
}

// Create a random position within the canvas
// This is used to create a position for the alien

function getRandomPosition() {  
    var canvas = document.querySelector("canvas");
    var y = (canvas.height)-220;
    var x = (canvas.width)-120;   
    var randomX = Math.floor(Math.random()*x);
    var randomY = Math.floor(Math.random()*y);
    return [randomX,randomY];
}

// Create an image into the canvas
// --update is used to redraw the image every 20ms
// --newPos is used to refresh coordinates and change those if needed

function drawcomp(src,x,y,width,height){
    this.src = src;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.width = width;
    this.height= height;
    this.update = function(){
        ctx = gameArea.context;
        ctx.drawImage(this.src,this.x,this.y,this.width,this.height);
    }
    this.newPos = function(){
        this.x += this.speedX;
    }
}

// Draw the laser shots image onto the canvas
// Different from the other because it takes no argument and we use the prototype to declare the newpos and update functions. This enables us to create multiple instances of the same object onto the canvas.

function drawshots(){
    this.src = document.querySelector('#shots');
    let xpos = spaceship.x;
    this.x = xpos;
    this.y = 480;
    this.speedX = 0;
    this.speedY = -25;
    this.width = 200;
    this.height = 25.86;
    this.newPos = function(){
        this.y += this.speedY;
    }
    this.update = function(){
        ctx = gameArea.context;
        ctx.drawImage(this.src,this.x,this.y,this.width,this.height);    
    }
    this.collision = function(alienObj){
        crash = [false,0]
        var a_left = alienObj.x;
        var a_right = alienObj.x + (alienObj.width);
        var a_bottom = alienObj.y + (alienObj.height);
        var las_center = this.x + 100;
        if ((a_left <= las_center) && (a_right >= las_center)){
            crash[0] = true;
            crash[1] = a_bottom
        }else{
            crash[0] = false;
            crash[1] = 0;
        }
        return crash;
    }
}

// Constructor to create a text element
// Used for the score and the timer

function textComp(width, height, color, x, y){
    this.type = "text";
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = gameArea.context;
        ctx.font = this.width + " " + this.height;
        ctx.fillStyle = color;
        ctx.fillText(this.text, this.x, this.y);}
    }

function timer(){
    var elapsed=parseFloat((new Date() - startTime)/1000).toFixed(2);
    return elapsed
}
// Updates the game every 20ms

function updateGameArea(){
    gameArea.clear();
    myTimer.text = timer();
    myScore.text = "Remaining targets : " + String(10 - targetsCount);
    myTimer.update();
    myScore.update();
    spaceship.speedX = 0;
    reload--;
    if (targetsCount == 10){
        endTimer = parseFloat((new Date()-startTime)/1000).toFixed(2);
        bestScores.push(endTimer);
        orderScores();
        gameArea.stop();
        endGame();
    }
    if (gameArea.keys && gameArea.keys[37]){spaceship.speedX = -12}
    if (gameArea.keys && gameArea.keys[39]){spaceship.speedX = 12;}
    // Next block creates a laser shot if the reload time is under 0
    if (gameArea.keys && gameArea.keys[32] && reload <= 0){
        shotsfired = new drawshots();
        endShot = shotsfired.collision(alien)[1]; // Calculate the position where the shot ends
        hit = shotsfired.collision(alien)[0]; // Determine if the shot ends because of a collision with the target or not
        shotexist = true;
        reload = 20;
    }
    spaceship.newPos();
    spaceship.update();
    alien.update();

    // Makes the shot move upwards if it exists
    if (shotexist == true){
        shotsfired.newPos();
        shotsfired.update();
        if ((shotsfired.y) < endShot){
            if (hit == true){ // If the shot has run its course, checks if it is due to a collision with the target or going out of the screen
                targetsCount += 1; // If it's a collision, increases the count and create a new target in a random place
                alien = 0;
                alien.x = getRandomPosition()[0];
                alien.y = getRandomPosition()[1];
                alien = new drawcomp(document.querySelector('#alien'),getRandomPosition()[0],getRandomPosition()[1],120,120);
            } else {
                console.log("out")
            }
            shotsfired = 0; // Then destroy the shot
            shotexist = false;
        }
    }
}

// Order the bestScore Array

function orderScores(){
    for (i=0 ; i<bestScores.length;i++){
        if (bestScores[i] < 10){
            bestScores[i] = ("0"+String(bestScores[i])).slice(-5);
        } else{
            bestScores[i]=String(bestScores[i]).slice(-5);
        }
    }
    bestScores.sort();
}
