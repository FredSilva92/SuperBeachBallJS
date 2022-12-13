import beachBallImg from "../../resources/BeachBall.png"
import wreckedImg from "../../resources/WreckedBall.png"
import { createImage } from "../utils"

export class Player {

    constructor(canvas) {
        this.gravity = 1.50

        this.canvas = canvas
        this.context = canvas.getContext('2d')

        this.image = createImage(beachBallImg)
        this.coins = 0;
        this.isWrecked = false;

        this.specialPower = false

        this.position = {
            x: 100,
            y: 100
        }

        this.velocity = {
            x: 0,
            y: 2
        }

        this.width = 50
        this.height = 50

        this.rotateVal = 0.01
    }

    reset() {
        this.image = createImage(beachBallImg)
        this.coins = 0;
        this.isWrecked = false;

        this.position = {
            x: 100,
            y: 100
        }

        this.velocity = {
            x: 0,
            y: 2
        }

    }

    draw() {

        /*this.context.drawImage(this.image, 
            this.position.x, 
            this.position.y,
            this.width,
            this.height)*/
        this.context.save();
        //this.context.translate(this.position.x, this.position.y);
        this.rotateVal += 0.01

        //this.context.translate( this.position.x + this.width/2, this.position.y + this.width/2);
        //this.context.rotate(this.rotateVal)    
        
        this.context.drawImage(this.image, 
            this.position.x, 
            this.position.y,
            this.width,
            this.height)
        
        this.context.restore();
        
        //this.context.rotate((this.rotateVal++) * Math.PI / 180);
        
        if (this.specialPower) {
            this.context.strokeStyle = "#d8c800";
            this.context.lineWidth = 5;
            this.context.beginPath();
            this.context.arc(this.position.x + this.width/2, this.position.y + this.height/2, this.width - this.width/3, 0, 2 * Math.PI);
            this.context.stroke();
        }
            
            /*
        this.context.fillStyle = 'red'
        this.context.fillRect(this.position.x,
            this.position.y,
            this.width,
            this.height)*/
    }

    clearDraw() {
        this.context.clearRect(this.position.x, 
            this.position.y,
            this.width,
            this.height)
    }

    update() {
        //this.move(keys)
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        let bottonScreen = this.position.y + this.height +
            this.velocity.y <= this.canvas.height;
        
        if (bottonScreen) {
            this.velocity.y += this.gravity
        } 
        
    }
}