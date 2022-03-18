import { Direction } from "../common/Direction.js";
import { SETTINGS } from "../config.js";
import { RGBColor } from "../system/const.js";
import { CardinalDirection } from "../system/enum.js";

class Render {
    constructor() {

    }

    drawWalls(ctx, engine, player, img) {

        let fovRad = SETTINGS.fov / 180 * Math.PI;
        let fovStart = fovRad / 2;

        let rayDirection = new Direction(player.direction.rad);
        rayDirection.turn(-fovStart);
        let turnStep = fovRad / 480;

        for (let x = 0; x < 480; x++) {

            //if (x == 10 || x == 240 || x == 460) {

                let rayHit = engine.cast(player.position, rayDirection.vector);
                let coord = rayHit.coord;
                let wall = rayHit.wall;
    
                let angleDistortion = new Direction(player.direction.rad - rayDirection.rad);
    
                //let distance = 1 - ray.distance * 20;
                //let distance = 1 - coord.getDistance(player.position) / 6;
                let distance = coord.getDistance(player.position) //* (Math.cos(angleDistortion.rad) * 0.95);

                //console.log(distance);
        
                let height = 1 * 320 / distance;
                let margin = (320 - height) / 2;

                        
                //ctx.fillRect(x, margin, 1, height);
                ctx.drawImage(img, Math.floor(512 * rayHit.textureOffset), 0, 1, 512, x, margin, 1, height);

                /*if (wall == "2") {
                    //console.log("double");
                    ctx.drawImage(img, Math.floor(512 * rayHit.textureOffset), 0, 1, 512, x, margin-height, 1, height);
                }*/

                /*
                console.log("deg: " + rayDirection.deg);
                console.log("height: " + height + " distance: " + distance);
                console.log(rayHit);
*/
                if (rayHit.cardinalDirection == CardinalDirection.South || rayHit.cardinalDirection == CardinalDirection.West) {
                    ctx.fillStyle = RGBColor.TransparentDark;
                    ctx.fillRect(x, margin, 1, height);
                }

                // distance shadow
                if (distance > 4) {
                    ctx.fillStyle = "rgba(0, 0, 0, " + distance / 15 +")";
                    ctx.fillRect(x, margin, 1, height);
                }
            //}

            // Add shadow to South & East

            rayDirection.turn(turnStep);
    
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

    drawSkybox(ctx) {
        ctx.fillStyle = RGBColor.Skyblue;
        ctx.fillRect(0, 0, 480, 160);

        ctx.fillStyle = RGBColor.Ground;
        ctx.fillRect(0, 160, 480, 160);
    }
}

export { Render }