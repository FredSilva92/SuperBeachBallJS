export class Player {

    constructor(canvas) {
        this.gravity = 1.5
        this.canvas = canvas
        this.context = canvas.getContext('2d')

        this.position = {
            x: 100,
            y: 100
        }

        this.velocity = {
            x: 0,
            y: 2
        }

        this.width = 30
        this.height = 30
    }

    draw() {
        this.context.fillStyle = 'red'
        this.context.fillRect(this.position.x,
            this.position.y,
            this.width,
            this.height)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        let bottonScreen = this.position.y + this.height +
            this.velocity.y <= this.canvas.height;
        
        if (bottonScreen) {
            this.velocity.y += this.gravity
        } else {
            //this.velocity.y = 0
        } 
        
    }
}