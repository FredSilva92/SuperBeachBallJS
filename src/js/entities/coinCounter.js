import coinPng from "../../resources/coin.png"
import { createImage } from "../utils";

export class CoinCounter {

    constructor(context) {
        this.context = context;
        this.image = createImage(coinPng)

        this.position = {
            x:innerWidth - innerWidth/12,
            y: 0
        }
    }

    update(coins) {
        //this.context.fillRect(60, 60, innerWidth-60, innerHeight-60);
        this.context.font = "bold 24px Arial";
        this.context.fillStyle = "#d8c800";
        this.context.drawImage(this.image, this.position.x, 0, this.image.width, this.image.height)
        this.context.fillText(coins, this.position.x + this.image.width, this.image.width/1.65);
    }
};