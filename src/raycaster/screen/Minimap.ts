import { RGBColor } from "../../system/const.js";
import { Level } from "../Level.js";
import { Screen } from "./Screen.js";

class Minimap extends Screen {

    private _radius: number;
    private _size: number = 10;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, radius: number) {
        super(canvas, ctx);
        this._radius = radius;
    }

    draw(level: Level): void {
        this.changeColor( RGBColor.Minimap_Wall);
        for (let x = 0; x < level.mapWidth; x++) {
            for (let y = 0; y < level.mapHeight; y++) {
                if (level.isSolid(x, y)) {
                    this.ctx.fillRect(x * this._size, y * this._size, this._size, this._size);
                }
            }
        }
    }
}

export { Minimap }