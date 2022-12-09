export class Platform {
    constructor(context, x, y, width, height, image, ref) {
        this.context = context
        this.image = image
        this.ref = ref

        this.position = {
            x,
            y
        }

        this.width = width
        this.height = height
    }

    draw() {
        this.context.drawImage(this.image, 
            this.position.x, 
            this.position.y,
            this.width,
            this.height)
        /*this.context.fillStyle = 'blue'
        this.context.fillRect(this.position.x,
            this.position.y,
            this.width,
            this.height)*/
    }
}
