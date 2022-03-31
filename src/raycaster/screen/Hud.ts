import { RGBColor } from "../../system/const.js";
import { Screen } from "./Screen.js";

class Hud extends Screen {

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        super(canvas, ctx);
    }

    draw(): void {
        this.changeColor(RGBColor.Hud_Crosshair);
        this.ctx.arc(this._resolutionHalf, this._horizon, 1, 0, this._2Pi);
        this.ctx.fill();
    }
}

export { Hud }