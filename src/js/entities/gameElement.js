export class GameElement {
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
    }
}
