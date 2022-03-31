import { Direction } from "../common/Direction.js";
import { SETTINGS } from "../../system/config.js";
import { RGBColor } from "../../system/const.js";
import { Screen } from "./Screen.js";
import { CardinalDirection } from "../../system/enum.js";
import { GameEngine } from "../GameEngine.js";
import { TextureMap } from "../texture/TextureMap.js";
import { Coordinate } from "../common/Coordinate.js";
import { Player } from "../Player.js";

class Camera extends Screen {

    private _zBuffer: number[] = [];

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        super(canvas, ctx);
    }

    // Raycasting
    drawWalls(engine: GameEngine, textureMap: TextureMap): void  {

        const planeDistance = this._resolutionHalf / Math.tan(this._fovRadHalf);

        for (let x = this._rayStartX; x < this._resolutionHalf; x++) {

            const canvasX = x + this._resolutionHalf;
            const rayDirection = new Direction(engine.player.pov.rad + Math.atan(x / planeDistance));
            const rayHit = engine.raycast(rayDirection);

            if (rayHit == null) {
                continue;
            }

            let distanceToWall = rayHit.coord.distanceTo(engine.player.position);
            if (SETTINGS.correctFisheye) {
                distanceToWall *= Math.cos(rayDirection.rad - engine.player.pov.rad);
            }
   
            const wallType = rayHit.wallTextureId;
            const wallHeight = SETTINGS.scaling * (planeDistance / distanceToWall);
            const margin = (this._resHeight - wallHeight) / 2;

            // Draw floors 
            if (SETTINGS.renderFloors && wallHeight < this._resHeight) {
                this.drawFloors(canvasX, margin + wallHeight, rayDirection.rad, Math.cos(rayDirection.rad - engine.player.pov.rad), engine.player.position);
            }

            // Draw wall texture
            const textureSlice = textureMap.getTextureSlice(wallType, rayHit.textureOffset, 1);
            if (textureSlice) {
                this.drawImageSlice(textureSlice.src, textureSlice.slice, canvasX, margin, 1, wallHeight)
            } else {
                this.changeColor(RGBColor.Default);
                this.ctx.fillRect(canvasX, margin, 1, wallHeight);
            }

            // Add shadow to South & East
            if (rayHit.cardinalDirection == CardinalDirection.North || rayHit.cardinalDirection == CardinalDirection.South) {
                this.changeColor(RGBColor.Transparent);
                this.ctx.fillRect(canvasX, margin, 1, wallHeight);
            }

            // Distance shadow
            if (SETTINGS.showDistanceShadow) {
                let shadow = distanceToWall / 20;
                if (shadow > 0.66) {
                    shadow = 0.66;
                }

                this.changeColor("rgba(0, 0, 0, " + shadow +")");
                this.ctx.fillRect(canvasX, margin, 1, wallHeight);
            }
        }
    }

    // Floor/ceiling casting
    drawFloors(canvasX: number, yStart: number, rayDirection: number, normalizedDirection: number, cameraPosition: Coordinate): void {

    }

    // Mode 7 (pseudo 3d planes)
    drawPlane(image, engine: GameEngine, textureMap: TextureMap): void {

    }

    // Skybox texture as 360°
    drawHorizon(skyImage: HTMLImageElement, player: Player, groundColor: string = RGBColor.Ground_NoonGray): void  {

        let startX = Math.floor(skyImage.width / this._2Pi * (player.pov.rad - this._fovRadHalf));
        const width = Math.floor(skyImage.width / this._2Pi * this._fovRad);
 
        this.ctx.drawImage(skyImage, startX, 0, width, skyImage.height, 0, 0, this._resWidth, this._horizon);

        // fill blanco space where image ends or starts
        if (startX < 0) { 
            startX = Math.abs(startX);
            const screenEnd = Math.ceil(this._resWidth / width * startX);
            this.ctx.drawImage(skyImage, skyImage.width - startX, 0, startX, skyImage.height, 0, 0, screenEnd, this._horizon);
        } 
        else if (startX + width > skyImage.width) {
            const screenStart = Math.floor(this._resWidth / width * (skyImage.width - startX));
            this.ctx.drawImage(skyImage, 0, 0, width - (skyImage.width - startX), skyImage.height, screenStart, 0, this._resWidth - screenStart, this._horizon);
        }

        // fill rest with ground
        this.changeColor(groundColor);
        this.ctx.fillRect(0, this._horizon, this._resWidth, this._resHeight - this._horizon);
    }
}

export { Camera }