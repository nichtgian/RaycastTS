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

    fovRad: number = SETTINGS.fov / 180 * Math.PI;
    zBuffer: number[] = [];

    constructor(canvas: any, ctx: any) {
        super(canvas, ctx);
    }

    drawWalls(engine: GameEngine, textureMap: TextureMap): void  {

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

            // Draw floors 
            /*if (SETTINGS.renderFloors && wallHeight < SETTINGS.resolution.height) {
                this.drawFloors(canvasX, margin + wallHeight, rayDirection.rad, Math.cos(rayDirection.rad - engine.player.pov.rad), engine.player.position);
            }*/

            // Draw wall texture
            const textureSlice = textureMap.getTextureSlice(wallType, rayHit.textureOffset, 1);
            if (textureSlice) {
                this.drawImage(textureSlice.src, textureSlice.slice, canvasX, margin, 1, wallHeight)
            } else {
                this.ctx.fillStyle = RGBColor.Default;
                this.ctx.fillRect(canvasX, margin, 1, wallHeight);
            }

            // Add shadow to South & East
            if (rayHit.cardinalDirection == CardinalDirection.North || rayHit.cardinalDirection == CardinalDirection.South) {
                this.ctx.fillStyle = RGBColor.Transparent;
                this.ctx.fillRect(canvasX, margin, 1, wallHeight);
            }

            // Distance shadow
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

    drawFloors(canvasX: number, yStart: number, rayDirection: number, normalizedDirection: number, cameraPosition: Coordinate): void {
        for (let y = yStart; y < SETTINGS.resolution.height - 1; y++) {

            
            if (canvasX == 0) {
                console.log(canvasX, y);
            }

            this.ctx.fillStyle = RGBColor.Ground_NoonGray;
            this.ctx.fillRect(canvasX, y, 1, 1);

            /*
            const dy = y - (SETTINGS.resolution.height / 2);
            let tx = cameraPosition.x/2 + Math.cos(rayDirection) * SETTINGS.resolution.height / dy / normalizedDirection;
            let ty = cameraPosition.y/2 - Math.sin(rayDirection) * SETTINGS.resolution.height / dy / normalizedDirection;

            if (canvasX == 0) {
                console.log(tx, ty);
            }

            this.ctx.fillStyle = RGBColor.Ground;
            this.ctx.fillRect(canvasX, y, 1, 1);
            */
        }
    }

    // Mode-7 (pseudo 3d planes)
    drawGroundPlane(image, engine: GameEngine, textureMap: TextureMap): void {

        let x0 = -image.width / 2,
            y0 = image.height / 2,
            height = 15,
            horizon = image.height / 2,
            theta = -320 * Math.PI;

        let half_w = image.width / 2;
        let half_h = image.height / 2;


        let sin_theta = Math.sin(theta);
        let cos_theta = Math.cos(theta);
        let out = new ImageData(image.width, image.height);

        for (let i = 4 * image.width * horizon; i < out.data.length; i += 4) {

            let y = Math.floor(i/(4*image.width));

            if (y >= horizon) {
                let x = Math.floor((i/4)%image.width)-half_w,
                    z = y/height,
                    view_angle = y-half_h;

                let xtemp = (x/(z*view_angle))*half_w,
                    ytemp = (height/view_angle)*half_h;

                let xprime = Math.floor((xtemp * cos_theta) - (ytemp * sin_theta) - x0),
                    yprime = Math.floor((xtemp * sin_theta) + (ytemp * cos_theta) + y0);

                if (xprime >= 0 && xprime <= image.width && yprime >= 0 && yprime <= image.height) {
                    let i_dest = ((yprime * image.width) + xprime) * 4;

                    out.data[i] = image.data[i_dest];
                    out.data[i+1] = image.data[i_dest+1];
                    out.data[i+2] = image.data[i_dest+2];
                    out.data[i+3] = image.data[i_dest+3];
                }
            }
        }
    }

    drawCrosshair(): void  {

    }

    drawHud(): void  {

    }

    drawHorizon(skyImage: HTMLImageElement, player: Player, groundColor: string = RGBColor.Ground_NoonGray): void  {
        let fov = SETTINGS.fov / 180 * Math.PI;
        let horizon = SETTINGS.resolution.height / 2;
        let startX = skyImage.width / (Math.PI * 2) * (player.pov.rad - (fov / 2));
        let width = skyImage.width / (Math.PI * 2) * (fov);
 
        this.ctx.drawImage(skyImage, startX, 0, width, skyImage.height, 0, 0, SETTINGS.resolution.width, horizon);

        // fill blanco space where image ends or starts
        if (startX < 0) { 
            startX = Math.abs(startX);
            let screenEnd = SETTINGS.resolution.width / width * startX;
            this.ctx.drawImage(skyImage, skyImage.width - startX, 0, startX, skyImage.height, 0, 0, screenEnd, horizon);
        } 
        else if (startX + width > skyImage.width) {
            let screenStart = SETTINGS.resolution.width / width * (skyImage.width - startX);
            this.ctx.drawImage(skyImage, 0, 0, width - (skyImage.width - startX), skyImage.height, screenStart, 0, SETTINGS.resolution.width - screenStart, horizon);
        }

        // fill rest with ground
        this.ctx.fillStyle = groundColor;
        this.ctx.fillRect(0, horizon, SETTINGS.resolution.width, SETTINGS.resolution.height - horizon);
    }
}

export { Camera }