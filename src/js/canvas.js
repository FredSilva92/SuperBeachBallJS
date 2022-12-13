import {Player} from "./entities/player.js"
import { Platform } from "./entities/platform.js"
import { GameElement } from "./entities/gameElement.js"
import { createImage} from "./utils.js"

import backgroundLvl1 from "../resources/backgroundLvl1.png"
import backgroundLvl2 from "../resources/backgroundLvl2.png"
import backgroundLvl3 from "../resources/backgroundLvl3.png"
import backgroundLvl4 from "../resources/backgroundLvl4.png"
import congratulationsImg from "../resources/congratulations.png"
import pauseImg from "../resources/pause.png"
import youDiedImg from "../resources/youDied.png"
import loadingImg from "../resources/loading.png"
import platform from "../resources/platform.png"
import finishFlag from "../resources/finishFlag.png"
import spikePng from "../resources/spike.png"
import coinPng from "../resources/coin.png"
import "particles.js";
import particles from "./particles.json"
import { CoinCounter } from "./entities/coinCounter.js"


const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const PLAT_REF = 'p',
    SPIKE_REF= 's',
    COIN_REF = 'c',
    FINISH_REF = 'f';


canvas.width = innerWidth
canvas.height = innerHeight

const youDiedObj = new GameElement(context, 
    innerWidth/2 - innerWidth/6, 
    0, 
    youDiedImg)

let player,
    collisionElements,
    gameElements,
    loadingElements,
    coinCounter,
    freezeMovement = false,
    pauseGame = false,
    isFinish = false,
    raf,
    currentLevel = 1;

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    jump: {
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
        levelMap = data.map;
        collisionElements = buildLevel(levelMap);
    }).catch(error => console.log(error))



    if (player === undefined) {
        player = new Player(canvas, 200, 100)
    } else {
        player.reset()
    }

    coinCounter = new CoinCounter(context)

    //gameElements = [new GameElement(context, 0, 0, background)]
    gameElements = [];
    loadingElements = [];

    switch(currentLevel) {
        case 1:
            gameElements = [new GameElement(context, 0, 0, backgroundLvl1)];
            break;
        case 2:
            gameElements = [new GameElement(context, 0, 0, backgroundLvl2)];
            break;
        case 3:
            gameElements =  [new GameElement(context, 0, -500, backgroundLvl3)];
            break;
        case 4:
            gameElements =  [new GameElement(context, 0, -250, backgroundLvl4)];
            break;
        case 5:   
            particlesJS('particles-js', particles);       
            break;
    }
}

function animate() {
    raf = requestAnimationFrame(animate);


    context.clearRect(0, 0, canvas.width, canvas.height);
    

    gameElements.forEach(gameElem => {
        gameElem.draw();
    });

    collisionElements.forEach(collisionElem => {
        collisionElem.draw();
    });

    coinCounter.update(player.coins);

    if (pauseGame) {
        player.draw();
    } else {
        player.update(keys, freezeMovement);
    }

    loadingElements.forEach(loadingElem => {
        context.save()
        context.globalAlpha = 0.3;
        context.fillStyle = "blue";
        context.fillRect(0, 0, innerWidth, innerHeight)
        
        context.restore();

        loadingElem.draw();
    });

    

    if (pauseGame) {
        return;
    }

    if (isFinish) {
        onFreezeMovement() 
        return;
    }

    if (freezeMovement) {
        onFreezeMovement() 

        setTimeout( ()=> {
            startLevel();
            animate();
            freezeMovement = false;    
        }, 1000);

        return;
    } else {
        loadingElements = [];
    }

    
    if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x += -1;
    } else if (keys.right.pressed && player.position.x < 100) {
        player.velocity.x += 1;
    } else {
        player.velocity.x = 0;

        if (keys.left.pressed) {
            collisionElements.forEach(collisionElem => {
                collisionElem.position.x += 4;
            })
            
        } else if (keys.right.pressed) {
            collisionElements.forEach(collisionElem => {
                collisionElem.position.x -= 4;
            })
            
        }
    }
    
    let hasCollided = collisionChecker();

    if (keys.jump.pressed && 
        hasCollided) {
        player.velocity.y -= 30
    }

    if (player.position.y > canvas.height ) {

        loadingElements.push(youDiedObj);
        
        player.specialPower = false;
        freezeMovement = true;
    }
}

function onFreezeMovement() {

    keys.jump.pressed = false;
    keys.left.pressed = false;
    keys.right.pressed = false;
    player.velocity.x = 0;
    player.velocity.y = 0;

    cancelAnimationFrame(raf);
}

function collisionChecker() {

    let hasCollided = false;

    for(let i = 0; i < collisionElements.length; i++) {
        
        let collisionElem = collisionElements[i],
            leftSide = player.position.x + player.width >= collisionElem.position.x,
            rightSide = player.position.x <= collisionElem.position.x + collisionElem.width,
            topSide = player.position.y + player.height+ player.velocity.y >= collisionElem.position.y,
            bottomSide = player.position.y <= collisionElem.position.y + collisionElem.height,
            checkCollision = leftSide && rightSide && topSide && bottomSide;

        if (PLAT_REF == collisionElem.ref &&
            player.position.y + player.height <= collisionElem.position.y &&
            player.position.y + player.height + player.velocity.y >= collisionElem.position.y &&
            leftSide &&
            rightSide) {

                hasCollided = true;
                player.velocity.y = 0;
        } 



        if (SPIKE_REF === collisionElem.ref && checkCollision) {

            if (player.specialPower) {
                player.specialPower = false;

                player.coins = 0;
                
                let playerPosx = player.position.x + player.width,
                    playerPosY = player.position.y + player.height/2,
                    a = collisionElem.position.x,
                    b = collisionElem.position.x + 5,
                    c = collisionElem.position.y + collisionElem.height/2 - 5,
                    d =collisionElem.position.y + collisionElem.height/2 + 5,
                    e = player.position.y + player.height,
                    f = collisionElem.position.y;

                if (playerPosx >= a &&
                    playerPosx <= b &&
                    playerPosY >= c &&
                    playerPosY <= d) {
                        player.position.x -= player.width*2;
                } else if( player.position.x <= collisionElem.position.x + collisionElem.width &&
                    player.position.x >= collisionElem.position.x + collisionElem.width - 5 &&
                    playerPosY >= c &&
                    playerPosY <= d)  {
                        player.position.x += player.width*2;
                } else if (e <= f ) {
                    keys.jump.pressed = false;
                    player.velocity.y = 0
                    player.velocity.y -= 40;
                }
            } else {
                player.position.x = collisionElem.position.x;
                player.position.y = collisionElem.position.y;

                player.isWrecked = true;
                freezeMovement = true;

                loadingElements.push(new GameElement(context, 
                    innerWidth/2 - innerWidth/6, 
                    innerHeight/2 - innerHeight/8, 
                    youDiedImg));

                return;
            }
        } 

        if (FINISH_REF === collisionElem.ref && checkCollision) {

            
            player.position.x = collisionElem.position.x;
            player.position.y = collisionElem.position.y;
            
            freezeMovement = true;
            

            if (currentLevel == 5) {
                isFinish = true;
                loadingElements.push(new GameElement(context, 
                    innerWidth/2 - innerWidth/6, 
                    innerHeight/2, 
                    congratulationsImg));
                return;
            }

            if (player.coins > 9) {
                player.specialPower = true;
            }

            loadingElements.push(new GameElement(context, 
                innerWidth/4, 
                innerHeight/4, 
                loadingImg));

            currentLevel++;

            return;
        }

        if (COIN_REF === collisionElem.ref && checkCollision) {
            player.coins++;
            
            if (player.coins === 10) {
                player.specialPower = true
            }

            collisionElements.splice(i, 1);
        }
    }

    return hasCollided;
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
                platforms.push(new Platform(context, x, y, elemXSize, elemYSize, createImage(platform), PLAT_REF));
                break;

            case SPIKE_REF:
                platforms.push(new Platform(context, x, y, elemXSize, elemYSize, createImage(spikePng), SPIKE_REF));
                break;  

            case FINISH_REF:
                platforms.push(new Platform(context, x, y, elemXSize, elemYSize, createImage(finishFlag), FINISH_REF));
                break;  

            case COIN_REF:
                platforms.push(new Platform(context, x, y, elemXSize, elemYSize, createImage(coinPng), COIN_REF));
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
    const JUMP = 87,
        LEFT = 65,
        RIGHT = 68,
        SPACE = 32;

    if (freezeMovement) {
        return;
    }
    
    switch(keyCode) {
        case JUMP:
            keys.jump.pressed = true
            break;
        case LEFT:
            keys.left.pressed = true
            break;
        case RIGHT:
            keys.right.pressed = true
            break;
        case SPACE:
            pauseGame = !pauseGame
            if (pauseGame) {
                loadingElements = [new GameElement(context, innerWidth/3.5, innerHeight/3, pauseImg)];
            } else {
                loadingElements = [];
            }
            break;    
    }
})
    
  addEventListener('keyup', ({keyCode}) => {
    const JUMP = 87,
        LEFT = 65,
        RIGHT = 68;

    if (freezeMovement) {
        return;
    }    
    
    switch(keyCode) {
        case JUMP:
            keys.jump.pressed = false;
            break;
        case LEFT:
            keys.left.pressed = false;
            break;
        case RIGHT:
            keys.right.pressed = false;
            break;
    }
})



init()