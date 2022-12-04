import {Player} from "./player.js"
import { Platform } from "./platform.js"
import tile from "../resources/tile1.png"

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const gravity = 1.5
const key = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}


const player = new Player(canvas, 200, 100)
const platforms = [new Platform(context, 100, 400), new Platform(context, 350, 250)]


function animate() {
    requestAnimationFrame(animate)
    context.clearRect(0, 0, canvas.width, canvas.height)
    player.update()

    platforms.forEach(platform => {
        platform.draw()
    })

    if (key.left.pressed && player.position.x > 100) {
        player.velocity.x += -1
        console.log('Aqui 1')
    } else if (key.right.pressed && player.position.x < 400) {
        player.velocity.x += 1
        console.log('Aqui 2')
    } else {
        player.velocity.x = 0
        
        if (key.left.pressed) {
            platforms.forEach(platform => {
                platform.position.x += 4
            })
            
            console.log('Aqui 3')
        } else if (key.right.pressed) {
            platforms.forEach(platform => {
                platform.position.x -= 4
            })
            
            console.log('Aqui 4')
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
        player.velocity.y = 0
    } 
    })

}

animate()

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
            player.velocity.y -= 20
            break;
        case LEFT:
            key.left.pressed = false
            console.log('Left up')
            break;
        case RIGHT:
            key.right.pressed = false
            console.log('Right up')
            break;
    }
})