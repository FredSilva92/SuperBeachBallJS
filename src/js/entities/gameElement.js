import { createImage } from "../utils"

export class GameElement {
    constructor(context, x, y, imageName) {
        this.context = context
        this.image = createImage(imageName)

        this.position = {
            x,
            y
        }

        this.width = innerWidth
        this.height = innerHeight
    }

    draw() {
        this.context.drawImage(this.image, 
            this.position.x, 
            this.position.y)
    }
}
