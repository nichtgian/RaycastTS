import { SETTINGS } from "../../system/config.js";
import { Coordinate } from "../common/Coordinate.js";
import { Level } from "../Level.js";
import { Screen } from "./Screen.js";

class Minimap extends Screen {
    settings: {
        radius: number;
    }

    constructor(canvas: any, ctx: any, radius: number) {
        super(canvas, ctx);
        this.settings = {
            radius: radius
        }
    }

    drawFull(level: Level): void {
        for (let x = 0; x < level.mapWidth; x++) {
            for (let y = 0; y < level.mapHeight; y++) {
                if (level.isSolid(x, y)) {
                    this.ctx.fillRect(x * 20, y * 20, 20, 20);
                }
            }
        }
    }

    drawMinimized(): void {

    }

    private drawPlayer(position: Coordinate): void {
        this.ctx.arc(position.x * 20, position.y * 20, 5, 0, 2 * Math.PI);
        this.ctx.fill();
    }

}

export { Minimap }