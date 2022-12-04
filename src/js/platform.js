export class Platform {
    constructor(context, x, y) {
        this.context = context

        this.position = {
            x,
            y
        }

        this.width = 200
        this.height = 20
    }

    draw() {
        this.context.fillStyle = 'blue'
        this.context.fillRect(this.position.x,
            this.position.y,
            this.width,
            this.height)
    }
}
