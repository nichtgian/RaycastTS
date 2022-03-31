import { SETTINGS, ACTIVE_ACTION } from "./system/config.js";
import { WORLD } from "./system/world.js";
import { GameEngine } from "./raycaster/GameEngine.js";
import { TextureMap } from "./raycaster/texture/TextureMap.js";
import { Camera } from "./raycaster/screen/Camera.js";
import { RGBColor } from "./system/const.js";
import { Minimap } from "./raycaster/screen/Minimap.js";
import { Hud } from "./raycaster/screen/Hud.js";

const canvas: HTMLCanvasElement = document.getElementById("Screen") as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

const textureMap: TextureMap = WORLD.textureMaps[0];
const gameEngine: GameEngine = new GameEngine(WORLD.levels[1], SETTINGS.renderDistance);
const camera: Camera = new Camera(canvas, ctx);
const minimap: Minimap = new Minimap(canvas, ctx, 5);
const hud: Hud = new Hud(canvas, ctx);

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
        //camera.drawPlane(groundImage, gameEngine, textureMap);
        camera.drawWalls(gameEngine, textureMap);

        hud.draw();

        if (ACTIVE_ACTION.displayMinimap) {
            minimap.draw(gameEngine.currentLevel);
        }
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