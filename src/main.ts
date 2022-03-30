import { SETTINGS, ACTIVE_ACTION } from "./system/config.js";
import { WORLD } from "./system/world.js";
import { GameEngine } from "./raycaster/GameEngine.js";
import { TextureMap } from "./raycaster/texture/TextureMap.js";
import { Camera } from "./raycaster/screen/Camera.js";
import { RGBColor } from "./system/const.js";

const canvas: HTMLCanvasElement = document.getElementById("Screen") as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

const textureMap: TextureMap = WORLD.textureMaps[0];
const gameEngine: GameEngine = new GameEngine(WORLD.levels[0], SETTINGS.renderDistance);
const camera: Camera = new Camera(canvas, ctx)

let groundImage = new Image();
groundImage.src = "media/texture/test.png";

let skyImage = new Image();
skyImage.src = "media/texture/skybox.png";

canvas.width = SETTINGS.resolution.width;
canvas.height = SETTINGS.resolution.height;

textureMap.loaded(gameEngine.currentLevel).then(res => {
    
    console.log("loaded textures");

    setInterval(() => {
        camera.clear();
        camera.drawHorizon(skyImage, gameEngine.player, RGBColor.Ground_NoonGray);
        //camera.drawGroundPlane(groundImage, gameEngine, textureMap);
        camera.drawWalls(gameEngine, textureMap);
        
        if (SETTINGS.autoTurn) {
            gameEngine.player.pov.turn(0.003);
        }
        if (ACTIVE_ACTION.lookSpeed != 0) {
            gameEngine.player.pov.turn(ACTIVE_ACTION.lookSpeed);
        }
        if (ACTIVE_ACTION.movementSpeed != 0) {
            gameEngine.player.moveBy(ACTIVE_ACTION.movementSpeed);
        }
    }, 50);

});