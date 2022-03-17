import { SETTINGS } from "../config.js";

class Render {
    constructor() {

    }

    drawWalls(ctx, engine, player) {

        let fovRad = SETTINGS.fov / 180 * Math.PI;
        let fovStart = fovRad / 2;

        let direction = player.direction;
        direction.turn(-fovStart);
        let turnStep = fovRad / 480;

        for (let x = 0; x < 480; x++) {
            let ray = engine.cast(player.position, direction.vector);
            let coord = ray.coord;
            //let distance = 1 - ray.distance / SETTINGS.renderDistance;
            let distance = 1 - coord.getDistance(player.position) / 6;
    
            let screenHeight = 320;
    
            let height = 320 * distance;
            let margin = (320 - height) / 2;
    
            ctx.fillRect(x, margin, 1, height);

            direction.turn(turnStep);
    
            /*
            console.log("Px: " + player.position.x + " Py: " + player.position.y);
            console.log("Wx: " + coord.x + " Wy: " + coord.y);
            console.log("height: " + height + " margin "  + margin); 
            */ 
        }
    }

    drawCrosshair(ctx) {

    }

    drawHud(ctx) {

    }
}

export { Render };