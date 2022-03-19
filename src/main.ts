import { SETTINGS, WORLD } from "./system/config.js";
import { GameEngine } from "./raycaster/GameEngine.js";
import { TextureMap } from "./raycaster/texture/TextureMap.js";
import { Camera } from "./raycaster/screen/Camera.js";

const canvas: HTMLCanvasElement = document.getElementById("Screen") as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

const textureMap: TextureMap = WORLD.textureMaps[0];
const gameEngine: GameEngine = new GameEngine(WORLD.levels[0], SETTINGS.renderDistance);
const camera: Camera = new Camera(canvas, ctx)

canvas.width = SETTINGS.resolution.width;
canvas.height = SETTINGS.resolution.height;

textureMap.loaded(gameEngine.currentLevel).then(res => {
    
    console.log("loaded textures");

    setInterval(() => {
        camera.drawSkybox();
        camera.drawWalls(gameEngine, textureMap);
        if (SETTINGS.autoTurn) {
            gameEngine.player.directionPOV.turn(0.01);
        }
    }, 100);

});