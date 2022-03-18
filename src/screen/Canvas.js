import { Minimap } from "./Minimap.js";
import { Render } from "./Render.js";

class Canvas {
    constructor(canvasId) {
        this.htmlCanvas = document.getElementById(canvasId);
        this.ctx = this.htmlCanvas.getContext("2d");

        this.minimap = new Minimap();
        this.render = new Render();
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

    drawRender(engine, player, img) {
        this.clear();
        this.render.drawSkybox(this.ctx);
        this.render.drawWalls(this.ctx, engine, player, img);
    }
}

export { Canvas }