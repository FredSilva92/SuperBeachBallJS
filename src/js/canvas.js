import {Player} from "./entities/player.js"
import { Platform } from "./entities/platform.js"
import { GameElement } from "./entities/gameElement.js"

import { createImage} from "./utils.js"

import backgroundLvl1 from "../resources/background.png"
import tile1 from "../resources/tile1.png"
import spike from "../resources/spike.png"
import "particles.js";
import particles from "./particles.json"
import Timer from "./timer.js"


const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const PLAT_REF = 'p',
    SPIKE_REF= 's',
    COIN_REF = 'c',
    FINISH_REF = 'f';

let currentLevel = 1;

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


async function init() {
    await startLevel();
    animate();
}


async function startLevel() {



    let levelMap, 
        myPromise = new Promise((resolve, reject) => {

            fetch("http://localhost:8080/level" + currentLevel, {
                method: "GET",
                headers: {
                "Content-Type": "application/json"
                }
            }).then(data => resolve(data))
                .catch(error => reject(error));
        });
    

    await myPromise.then(response =>  response.json()).then(data => {
        levelMap = data.level
        platforms = buildLevel(levelMap);
    }).catch(error => console.log(error))

    player = new Player(canvas, 200, 100)

    //gameElements = [new GameElement(context, 0, 0, background)]
    gameElements = []

    
    //particlesJS('particles-js', particles);
}


function sleep(miliseconds) {
    var currentTime = new Date().getTime();
 
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
 }

async function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    

    /*gameElements.forEach(gameElem => {
        gameElem.draw()
    });*/

    player.update();

    platforms.forEach(platform => {
        platform.draw()

    });


    if (key.left.pressed && player.position.x > 100) {
        player.velocity.x += -4;
       // console.log('player velocity');
        //console.log(player.velocity);
    } else if (key.right.pressed && player.position.x < 100) {
        player.velocity.x += 4;
        //console.log('player velocity');
        //console.log(player.velocity);
    } else {
        player.velocity.x = 0;
        
        if (key.left.pressed) {
            platforms.forEach(platform => {
                platform.position.x += 8;
            })
            
        } else if (key.right.pressed) {
            platforms.forEach(platform => {
                platform.position.x -= 8;
            })
            
        }
    }

    let isDead = false;

    for(let i = 0; i < platforms.length; i++) {
        
        let platform = platforms[i];

        if (PLAT_REF == platform.ref &&
            player.position.y + player.height
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

        if ( SPIKE_REF == platform.ref && 
            player.position.x + player.width >= 
                platform.position.x &&
            player.position.x <=
                platform.position.x + platform.width &&
             player.position.y + player.height >= platform.position.y) {

                player.velocity.y = 0;
                player.position.x = platform.position.x;
                player.position.y = platform.position.y;
                player.draw()
                console.log('estas morto');
                //setInterval(7000)
                sleep(500)
                isDead = true
                startLevel();
        }
    }

    // lose condition
    if (player.position.y > canvas.height ) {
        console.log('you lose')
        //player.velocity.x = 0;
        //ddawait delay(5000).then(init);
        isDead = false
        
        const timer = new Timer(60);
        timer.update = function update(deltaTime) {
            //level.update(deltaTime);
    
            //camera.pos.x = Math.max(0, mario.pos.x - 100);

            
            
        }
    
        //timer.start()
        await setTimeout(5000);

        startLevel()
        
        return;
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function buildLevel(levelMap) {
    const platforms = [];
    const elemXSize = 60;
    const elemYSize = 60;
  
    let revertedY = levelMap.length,
      xAxis = 0;
  
    for (let i = 0; i <levelMap.length; i++) {
      
      var line = levelMap[i];
  
      for(let j = 0; j < line.length; j++) {

        let x = xAxis,
           y = innerHeight - elemYSize * revertedY;
        
        switch(line[j]) {
        
          case PLAT_REF:
            platforms.push(new Platform(context, x, y, elemXSize, elemYSize, tile, PLAT_REF));
            break;
  
          case SPIKE_REF:
            
            platforms.push(new Platform(context, x, y, elemXSize, elemYSize, createImage(spike), SPIKE_REF));
            break;  

          case COIN_REF:
            //platforms.push(new Platform(context, x, y, elemXSize, elemYSize, tile, COIN_REF));
            break;
        }
  
        xAxis+=elemXSize;
        
      }
  
      revertedY--;
      xAxis = 0;
    }
  
    return platforms;
  }


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



init()