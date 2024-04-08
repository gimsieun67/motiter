const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.3;

c.fillRect(0,0,canvas.width,canvas.height);

class Sprite{
    constructor({position,velocity, color = "red", offset}){
        this.position = position;

        this.velocity = velocity;

        this.width = 50;
        this.height = 150;

        this.LastKey;

        this.attackBox = {
            // position : this.position,
            width:100,
            height:50,
            position: {
                x: this.position.x,
                y:this.position.y,
            },
            offset
        }

        this.color   = color;
        this.isAttacking;
        this.health = 100;
    }
    draw(){
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y,this.width,this.height);

        if(this.isAttacking) {

            c.fillStyle = "green";
            c.fillRect(
                this.attackBox.position.x,
                this.attackBox.position.y,
                this.attackBox.width,
                this.attackBox.height 
                
                );
                
           }
    };

    Update(){
        this.draw();
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;
        this.position.y += this.velocity.y;

        this.position.x += this.velocity.x;

        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0;
        }
        else{
            this.velocity.y += gravity;
        }
        
        
    };
    attack() {
        this.isAttacking = true;
        setTimeout(()=> {
            this.isAttacking = false;
        },100)
    }


}
    
const player = new Sprite({
    position: {
        x :0,
        y :0,
    },
    velocity: {
        x :0,
        y :10,
    },
    color : "blue",
    offset: {
        x:0,
        y:0
    }
})

const enemy = new Sprite({
    position: {
        x :400,
        y :100,
    },
    velocity: {
        x :0,
        y :10,
    },
    offset: {
        x:-50,
        y:0
    }
})

console.log(player);

const keys = {
    a:{
        pressed : false,
    },
    d:{
        pressed : false,
    },
    w:{
        pressed : false,
    },

    ArrowRight:{
        pressed : false,
    },
    ArrowLeft:{
        pressed : false,
    },
    ArrowUp:{
        pressed : false,
    },
}
// player.draw();
// enemy.draw();

//let LastKey;
let timer = 5;

function decreaseTimer() {
  if(timer > 0) {
    setTimeout(decreaseTimer, 1000); // 밀리새컨즈
    timer--;
    document.querySelector("#redbox").innerHTML = timer;
    
  }
  if(timer === 0) 
  {
    document.querySelector("#displaytext").style.display = "flex"
      if(player.health === enemy.health) {
        document.querySelector("#displaytext").innerHTML = "무승부";

      } else if(player.health > enemy.health) {
        document.querySelector("#displaytext").innerHTML = "1p 승리";
      } else if(player.health > enemy.health) {
        document.querySelector("#displaytext").innerHTML = "2p 승리";
      }
  }
}
decreaseTimer();

function animate(){
    window.requestAnimationFrame(animate);

    c.fillStyle = "black";
    c.fillRect(0,0,canvas.width,canvas.height);

    player.Update();
    enemy.Update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    //if(keys.a.pressed){
    //    player.velocity.x = -1;
    //}else if(keys.d.pressed){
    //    player.velocity.x = +1;
    //}

    if(keys.a.pressed && player.LastKey === 'a'){
        player.velocity.x = -2;
    }else if(keys.d.pressed && player.LastKey === 'd'){
        player.velocity.x = +2;
    }
    if(keys.ArrowLeft.pressed && enemy.LastKey === 'ArrowLeft'){
        enemy.velocity.x = -2;
    }else if(keys.ArrowRight.pressed && enemy.LastKey === 'ArrowRight'){
        enemy.velocity.x = +2;
    }


    if(
       rectangularColistion({rectangle:player, rectangle2:enemy}) &&
       player.isAttacking)
    {
        console.log("hit");
        player.isAttacking = false;
        enemy.health -= 20;
        document.querySelector("#enemyHealth").style.width = enemy.health + "%";
    }
    

    if(
        rectangularColistion({rectangle:enemy, rectangle2:player}) &&
        enemy.isAttacking)
     {
         console.log("enemyhit");
         enemy.isAttacking = false;
         player.health -= 20;
        document.querySelector("#playerHealth").style.width = player.health + "%";
     }
}

animate();

window.addEventListener("keydown",(event)=>{
    console.log(event.key);

    switch(event.key){
        case "d":
            keys.d.pressed = true;
            player.LastKey = "d";
            break;
        case "a":
            keys.a.pressed = true;
            player.LastKey = "a";
            break;
        case "w":
            player.velocity.y = -10;
            break;
        case " ":
            player.attack();
            break;
        case "ArrowRight":
            keys.ArrowRight.pressed = true;
            enemy.LastKey = "ArrowRight";
            break;
        case "ArrowLeft":
            keys.ArrowLeft.pressed = true;
            enemy.LastKey = "ArrowLeft";
            break;
        case "ArrowUp":
            enemy.velocity.y = -10;
            break;
        case "ArrowDown":
            enemy.attack();
            break;    
    }
})

function rectangularColistion({rectangle, rectangle2}) {
    return(

        rectangle.attackBox.position.x + rectangle.attackBox.width >= rectangle2.position.x &&
        rectangle.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle.attackBox.position.y + rectangle.attackBox.height >= rectangle2.position.y &&
        rectangle.attackBox.position.y <= rectangle2.position.y + rectangle2.height
        )
}

function decreaseTimer({player, enemy}) {

}
window.addEventListener("keyup",(event)=>{
    console.log(event.key);

    switch(event.key){
        case "d":
            keys.d.pressed = false;
            break;
        case "a":
            keys.a.pressed = false;
            break;

        case "ArrowRight":
            keys.ArrowRight.pressed = false;
            break;
        case "ArrowLeft":
            keys.ArrowLeft.pressed = false;
            break;
    }
}
if (enemy.health <= 0 || player.health)
)