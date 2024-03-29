const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.2;

c.fillRect(0,0,canvas.width,canvas.height);

class Sprite{
    constructor({position,velocity, color = "red"}){
        this.position = position;

        this.velocity = velocity;

        this.width = 50;
        this.height = 150;

        this.LastKey;

        this.attackBox = {
            position : this.position
        }

        this.color   = color;
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
    }

    Update(){
        this.draw();

        this.position.y += this.velocity.y;

        this.position.x += this.velocity.x;

        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0;
        }
        else{
            this.velocity.y += gravity;
        }
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
    color : "blue"
})

const enemy = new Sprite({
    position: {
        x :400,
        y :100,
    },
    velocity: {
        x :0,
        y :10,
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
        player.velocity.x = -1;
    }else if(keys.d.pressed && player.LastKey === 'd'){
        player.velocity.x = +1;
    }

    if(keys.ArrowLeft.pressed && enemy.LastKey === 'ArrowLeft'){
        enemy.velocity.x = -1;
    }else if(keys.ArrowRight.pressed && enemy.LastKey === 'ArrowRight'){
        enemy.velocity.x = +1;
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
    }
})

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
})