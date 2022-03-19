import { TextureCoord } from "../../system/type";

abstract class Screen {
    canvas: any;
    ctx: any;
    screen: {
        width: number;
        height: number;
    }

    constructor(canvas: any, ctx: any) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.screen = {
            width: canvas.width,
            height: canvas.height,
        }
    }

    clear(): void {
        this.ctx.closePath();
        this.ctx.clearRect(0, 0, this.screen.width, this.screen.height);
        this.ctx.beginPath();
    }

    drawImage(img: HTMLImageElement, slice: TextureCoord, canvasX: number, camvasY: number, width: number, height: number): void {
        this.ctx.drawImage(img, slice.startX, slice.startY, slice.width, slice.heigth, canvasX, camvasY, width, height);
    }
}

export { Screen }