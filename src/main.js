import { SETTINGS, WORLD } from "./config.js";
import { Canvas } from "./screen/Canvas.js";
import { Raycaster } from "./engine/Raycaster.js";
import { Player } from "./engine/Player.js";

const canvas = new Canvas("Screen");

const engine = new Raycaster(WORLD.levels[0]);
const player = new Player(engine.getSpawnpoint());

//canvas.drawMinimap(engine.level, player);
// let intersection = engine.cast(player.position, player.direction.vector)

// canvas.drawRender(engine, player);
//console.log("x: " + intersection.x + " y: " + intersection.y);

// Gameloop

const img = new Image();
img.addEventListener("load", function() {
    
    setInterval(() => {
        canvas.drawRender(engine, player, img);
        player.direction.turn(0.01);
    }, 200);    

}, false);
img.src = "media/texture/BlueTile.jpg";