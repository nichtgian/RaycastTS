import { SETTINGS } from "../../system/config.js";
import { RGBColor } from "../../system/const.js";
import { TextureCoord } from "../../system/type.js";
import { Direction } from "../common/Direction.js";

abstract class Screen {

    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    protected _fovRad: number = Direction.toRad(SETTINGS.fov);
    protected _fovRadHalf: number = this._fovRad / 2;
    protected _2Pi: number = Math.PI * 2;

    protected _resWidth = SETTINGS.resolution.width;
    protected _resHeight = SETTINGS.resolution.height;
    protected _resolutionHalf = this._resWidth / 2;
    protected _rayStartX = (-this._resWidth) / 2;
    protected _horizon = this._resHeight / 2;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    clear(): void {
        this.ctx.closePath();
        this.ctx.clearRect(0, 0, SETTINGS.resolution.width, SETTINGS.resolution.height);
        this.ctx.beginPath();
    }

    drawImageSlice(img: HTMLImageElement, slice: TextureCoord, canvasX: number, camvasY: number, width: number, height: number): void {
        this.ctx.drawImage(img, slice.startX, slice.startY, slice.width, slice.heigth, canvasX, camvasY, width, height);
    }

    changeColor(color: string = RGBColor.Default) {
        this.ctx.fillStyle = color;
    }
}

export { Screen }