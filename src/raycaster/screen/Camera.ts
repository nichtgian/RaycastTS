import { Direction } from "../common/Direction.js";
import { SETTINGS } from "../../system/config.js";
import { RGBColor } from "../../system/const.js";
import { Screen } from "./Screen.js";
import { CardinalDirection } from "../../system/enum.js";
import { GameEngine } from "../GameEngine.js";
import { TextureMap } from "../texture/TextureMap.js";

class Camera extends Screen {

    fovRad: number = SETTINGS.fov / 180 * Math.PI;

    constructor(canvas: any, ctx: any) {
        super(canvas, ctx);
    }

    drawWalls(engine: GameEngine, textureMap: TextureMap) {

        const resolutionHalf = SETTINGS.resolution.width / 2;
        const planeDistance = (resolutionHalf) / Math.tan(this.fovRad / 2)
        const startX = (-SETTINGS.resolution.width) / 2;

        for (let x = startX; x < resolutionHalf; x++) {

            const canvasX = x + resolutionHalf;
            const rayDirection = new Direction(engine.player.pov.rad + Math.atan(x / planeDistance));
            const rayHit = engine.raycast(rayDirection);

            if (rayHit == null) {
                continue;
            }

            let distanceToWall = rayHit.coord.getDistanceTo(engine.player.position);
            if (SETTINGS.correctFisheye) {
                distanceToWall *= Math.cos(rayDirection.rad - engine.player.pov.rad);
            }
   
            const wallType = rayHit.wallTextureId;
            const wallHeight = SETTINGS.scaling * (planeDistance / distanceToWall);
            const margin = (SETTINGS.resolution.height - wallHeight) / 2;

            // Draw wall texture
            const textureSlice = textureMap.getTextureSlice(wallType, rayHit.textureOffset, 1);
            if (textureSlice) {
                this.drawImage(textureSlice.src, textureSlice.slice, canvasX, margin, 1, wallHeight)
            } else {
                this.ctx.fillStyle = RGBColor.DefaultTexture;
                this.ctx.fillRect(canvasX, margin, 1, wallHeight);
            }

            // Add shadow to South & East
            if (rayHit.cardinalDirection == CardinalDirection.North || rayHit.cardinalDirection == CardinalDirection.South) {
                this.ctx.fillStyle = RGBColor.TransparentDark;
                this.ctx.fillRect(canvasX, margin, 1, wallHeight);
            }

            // distance shadow
            if (SETTINGS.showDistanceShadow) {
                let shadow = distanceToWall / 20;
                if (shadow > 0.66) {
                    shadow = 0.66;
                }

                this.ctx.fillStyle = "rgba(0, 0, 0, " + shadow +")";
                this.ctx.fillRect(canvasX, margin, 1, wallHeight);
            }
        }
    }

    drawCrosshair() {

    }

    drawHud() {

    }

    drawSkybox() {
        let horizon = SETTINGS.resolution.height / 2;
        this.ctx.fillStyle = RGBColor.Skyblue;
        this.ctx.fillRect(0, 0, SETTINGS.resolution.width, horizon);
        this.ctx.fillStyle = RGBColor.Ground;
        this.ctx.fillRect(0, horizon, SETTINGS.resolution.width, horizon);
    }

    drawHorizon() {
    }
}

export { Camera }