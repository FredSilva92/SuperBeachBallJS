export class Platform {
    constructor(context, x, y, image) {
        this.context = context
        this.image = image

        this.position = {
            x,
            y
        }

        this.width = image.width
        this.height = image.height
    }

    draw() {
        this.context.drawImage(this.image, 
            this.position.x, 
            this.position.y)
        /*this.context.fillStyle = 'blue'
        this.context.fillRect(this.position.x,
            this.position.y,
            this.width,
            this.height)*/
    }
}
