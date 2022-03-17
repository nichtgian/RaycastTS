import { SETTINGS } from "../config.js";

class Minimap {
    constructor(radius = SETTINGS.minimapRadius) {

    }

    draw(ctx, level) {
        for (let x = 0; x < level.map[0].length; x++) {
            for (let y = 0; y < level.map.length; y++) {
                if (level.isSolid(x, y)) {
                    ctx.fillRect(x * 20, y * 20, 20, 20);
                }
            }
        }
    }

    drawMinimized() {

    }

    drawPlayer(ctx, position) {
        ctx.arc(position.x * 20, position.y * 20, 5, 0, 2 * Math.PI);
        ctx.fill();
    }

}

export { Minimap };