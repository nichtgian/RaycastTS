import { Direction } from "../common/Direction.js";
import { SETTINGS } from "../../system/config.js";
import { RGBColor } from "../../system/const.js";
import { Screen } from "./Screen.js";
import { CardinalDirection } from "../../system/enum.js";
import { GameEngine } from "../GameEngine.js";
import { TextureMap } from "../texture/TextureMap.js";
import { Player } from "../Player.js";
import { TextureSlice } from "../../system/type.js";

class Camera extends Screen {
    constructor(canvas: any, ctx: any) {
        super(canvas, ctx);
    }

    drawWalls(engine: GameEngine, textureMap: TextureMap) {

        let player: Player = engine.player;
        let ctx = this.ctx;

        let fovRad = SETTINGS.fov / 180 * Math.PI;
        let fovStart = fovRad / 2;

        let rayDirection = new Direction(player.directionPOV.rad);
        rayDirection.turn(-fovStart);
        let turnStep = fovRad / SETTINGS.resolution.width;

        for (let x = 0; x < SETTINGS.resolution.width; x++) {

            let rayHit = engine.raycast(rayDirection);

            if (rayHit == null) {
                rayDirection.turn(turnStep);
                continue;
            }


            let coord = rayHit.coord;
            let wall = rayHit.wallTextureId;
            let angleDistortion = new Direction(player.directionPOV.rad - rayDirection.rad);
            let distanceRaw = coord.getDistanceTo(player.position) //* (Math.cos(angleDistortion.rad) * 0.95);

            let distance = distanceRaw; //* Math.cos(rayDistortion / 10);
   
            let height = 1 * SETTINGS.resolution.height / distance;
            let margin = (SETTINGS.resolution.height - height) / 2;

                    
            ctx.fillRect(x, margin, 1, height);
            //ctx.drawImage(img.src, Math.floor(512 * rayHit.textureOffset), 0, 1, 512, x, margin, 1, height);

            let textureQuality = 1;
            let textureSlice = textureMap.getTextureSlice(wall, rayHit.textureOffset, textureQuality);

            this.drawImage(textureSlice.src, textureSlice.slice, x, margin, 1, height);



            // Add shadow to South & East
            if (rayHit.cardinalDirection == CardinalDirection.South || rayHit.cardinalDirection == CardinalDirection.West) {
                ctx.fillStyle = RGBColor.TransparentDark;
                ctx.fillRect(x, margin, 1, height);
            }

            // distance shadow SETTING TODO
            let settingDistanceShadow = true;
            if (settingDistanceShadow && distance > 4) {
                ctx.fillStyle = "rgba(0, 0, 0, " + distance / 15 +")";
                ctx.fillRect(x, margin, 1, height);
            }

            rayDirection.turn(turnStep);
        }
    }

    drawCrosshair() {

    }

    drawHud() {

    }

    drawSkybox() {
        let ctx = this.ctx;
        let horizon = SETTINGS.resolution.height / 2;

        ctx.fillStyle = RGBColor.Skyblue;
        ctx.fillRect(0, 0, SETTINGS.resolution.width, horizon);
        ctx.fillStyle = RGBColor.Ground;
        ctx.fillRect(0, horizon, SETTINGS.resolution.width, horizon);
    }
}

export { Camera }