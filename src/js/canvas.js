import {Player} from "./entities/player.js"
import { Platform } from "./entities/platform.js"
import { GameElement } from "./entities/gameElement.js"
import tile1 from "../resources/tile1.png"
import { createImage } from "./utils.js"
import backgroundLvl1 from "../resources/background.png"

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight



const tile = createImage(tile1)
const background = createImage(backgroundLvl1)

let player,
    platforms,
    gameElements;

const key = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

const getLevel = new Promise((resolve, reject) => {
    fetch("http://localhost:8080/level", {
       method: "GET",
       headers: {
        "Content-Type": "application/json"
        },
    }).then(data => resolve(data))
       .catch(error => reject(error));
 });

getLevel.then(response => {
    response.json().then(data => {
       console.log(data);
    })
 });
 
 

const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("foo");
    }, 300);
  });

const mySolve = function(a) {
    console.log(a)
    init()
    animate()
}

const myReject = function() {
    console.log("not foo")
}

myPromise.then(mySolve, myReject)


function init() {

    const tileBottom = innerHeight - tile.height;
    
    platforms = [new Platform(context, 0, tileBottom, tile), 
        new Platform(context, 60, tileBottom, tile),
        new Platform(context, 120, tileBottom, tile),
        new Platform(context, 180, tileBottom, tile),
        new Platform(context, 240, tileBottom, tile),
        new Platform(context, 300, tileBottom, tile),
        new Platform(context, 360, tileBottom, tile),
        new Platform(context, 420, tileBottom, tile),
        new Platform(context, 480, tileBottom, tile),
        new Platform(context, 540, tileBottom, tile)]

    
    player = new Player(canvas, 200, 100)

    gameElements = [new GameElement(context, 0, 0, background)]

}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    

    gameElements.forEach(gameElem => {
        gameElem.draw()
    });

    player.update();

    platforms.forEach(platform => {
        platform.draw()
    });

    



    if (key.left.pressed && player.position.x > 100) {
        player.velocity.x += -1;
    } else if (key.right.pressed && player.position.x < 400) {
        player.velocity.x += 1;
    } else {
        player.velocity.x = 0;
        
        if (key.left.pressed) {
            platforms.forEach(platform => {
                platform.position.x += 4;
            })
            
        } else if (key.right.pressed) {
            platforms.forEach(platform => {
                platform.position.x -= 4;
            })
            
        }
    }



    platforms.forEach(platform => {
        if (player.position.y + player.height
                <= platform.position.y &&
            player.position.y + player.height + player.velocity.y
                >= platform.position.y &&
            player.position.x + player.width >= 
                platform.position.x &&
            player.position.x <=
                platform.position.x + platform.width
            ) {
            player.velocity.y = 0;
        } 
    })

    // lose condition
    if (player.position.y > canvas.height) {
        console.log('you lose')
        init()
    }
}

//init()
//animate()

addEventListener('keydown', ({keyCode}) => {
    console.log(keyCode)
    const JUMP = 87,
        LEFT = 65,
        RIGHT = 68;
    
    switch(keyCode) {
        case JUMP:
            player.velocity.y -= 20
            break;
        case LEFT:
            key.left.pressed = true

            console.log('Left down')
            break;
        case RIGHT:
            key.right.pressed = true
            console.log('Right down')
            break;
    }
})

addEventListener('keyup', ({keyCode}) => {
    console.log(keyCode)
    const JUMP = 87,
        LEFT = 65,
        RIGHT = 68;
    
    switch(keyCode) {
        case JUMP:
            player.velocity.y -= 20;
            break;
        case LEFT:
            key.left.pressed = false;
            break;
        case RIGHT:
            key.right.pressed = false;
            break;
    }
})