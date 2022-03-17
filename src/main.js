import { SETTINGS, WORLD } from "./config.js";
import { Canvas } from "./screen/Canvas.js";
import { Raycaster } from "./engine/Raycaster.js";
import { Player } from "./engine/Player.js";

const canvas = new Canvas("Screen");

const engine = new Raycaster(WORLD.levels[0]);
const player = new Player(engine.getSpawnpoint());

canvas.drawMinimap(engine.level, player);

let intersection = engine.cast(player.position, player.direction.vector)
console.log("x: " + intersection.x + " y: " + intersection.y);

// Gameloop
//setInterval(engine.run, 100);