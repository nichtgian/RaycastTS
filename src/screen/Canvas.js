import { Minimap } from "./Minimap.js";

class Canvas {
    constructor(canvasId) {
        this.htmlCanvas = document.getElementById(canvasId);
        this.ctx = this.htmlCanvas.getContext("2d");

        this.minimap = new Minimap();
    }

    clear() {
        this.ctx.closePath();
        this.ctx.clearRect(0, 0, this.htmlCanvas.width, this.htmlCanvas.height);
        this.ctx.beginPath();
    }

    drawMinimap(level, player) {
        this.clear();
        this.minimap.draw(this.ctx, level);
        this.minimap.drawPlayer(this.ctx, player.position);
    }
}

export { Canvas };