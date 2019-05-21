// Enemies our player must avoid
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");
let count3 = 0 ;

class Player{
    constructor(x,y){
    let img = new Image();
    this.image ='images/char-boy.png';
    img.src = this.image 
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    }
}

var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    let img = new Image();
    this.sprite = 'images/enemy-bug.png';
    img.src = this.sprite;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
      
 };

 let allEnemies = [new Enemy(5, 55),new Enemy(60, 145), new Enemy(8, 220)];
let thePlayer = new Player(200,420);

function gameStatus(masssage , color ){
    document.body.innerHTML = "" 
    var text = document.createElement('p');
    text.innerHTML = masssage
    text.style.color = color
    text.style.marginTop = "200px"
    text.style.fontSize = "40px"
    document.body.appendChild(text);
    
    var button = document.createElement("button");
     button.innerHTML = "Restart Game";
     button.style.marginTop = "30px "
     button.style.fontSize = "30px"
     button.addEventListener("click", function() {
        location.reload(true);
 });

   document.body.appendChild(button);

}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    let random = Math.floor(Math.random() * 10)*(60);
    this.x += 1+dt*random;
    if(this.x >520){
        this.x = 0 ; 
        
    }

    
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.image), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

 Player.prototype.handleInput = function(allowedKeys){
        const xSpeed = 30;
        const ySpeed = 30;
        const maxDown = 440;
        const maxRight = 420;
        let yPosition = this.y; 
        let xPosition = this.x; 
        let score = document.querySelector("#score");
        
        if (allowedKeys == "up" ) {
            yPosition-= ySpeed;
            count3++;
        } else if (allowedKeys == "down") {
            yPosition+= ySpeed;
        } else if (allowedKeys == "right") {
            xPosition+= xSpeed;
        } else if (allowedKeys == "left") {
            xPosition-= xSpeed;
        } 

        
        if(yPosition<=0){
            swal({
                title: "Good job!",
                text: "You Won in the Game!",
                icon: "success",
                button: "Restart",
              })
              .then((Restart) => {
                if (Restart) {
                    location.reload(true);
                }
            
            }
        );
        }

        if(yPosition< maxDown && xPosition < maxRight && yPosition>-10 && xPosition>-20 ){
            this.y = yPosition;
            this.x = xPosition;
            score.innerHTML = count3 ;
        }
         
    };

    



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    
    thePlayer.handleInput(allowedKeys[e.keyCode]);
});
