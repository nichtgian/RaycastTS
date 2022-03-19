import { SETTINGS } from "../system/config.js";
import { Coordinate } from "./common/Coordinate.js";
import { Level } from "./Level.js";
import { CardinalDirection } from "../system/enum.js";
import { Player } from "./Player.js";
import { Direction } from "./common/Direction.js";

class GameEngine {
    currentLevel: Level;
    player: Player;
    settings: {
        renderDistance: number;
    }

    constructor(level: Level, renderDistance: number = SETTINGS.renderDistance) {
        this.changeLevel(level);
        this.settings = {
            renderDistance: renderDistance
        }
    }

    changeLevel(newLevel: Level): void {
        this.currentLevel = newLevel;
        this.player = new Player(newLevel.spawnPoint);
        //this.player.moveTo(this.currentLevel.spawnPoint);
    }

    // DDA raycasting algorithm
    raycast(rayDirection: Direction) {
        let position = this.player.position;
        let direction = rayDirection.vector;

        const infinite = 100000;

        let unitStep = new Coordinate(
            direction.x == 0 ? infinite : Math.abs(1 / direction.x),
            direction.y == 0 ? infinite : Math.abs(1 / direction.y)
        );

        let wallPos = new Coordinate(
            Math.floor(position.x),
            Math.floor(position.y)
        );

        let step = new Coordinate();
        let ray = new Coordinate();
        let distance = 0;

        let horizontalDirection = CardinalDirection.North;
        let verticalDirection = CardinalDirection.East;
        let xWallHit = true;

        // West
        if (direction.x < 0) {
            step.x = -1;
            ray.x = (position.x - wallPos.x) * unitStep.x;
            verticalDirection = CardinalDirection.West;
        } // East
        else {
            step.x = 1;
            ray.x = (wallPos.x + 1 - position.x) * unitStep.x;
        }
        // South
        if (direction.y < 0) {
            step.y = -1;
            ray.y = (position.y - wallPos.y) * unitStep.y;
            horizontalDirection = CardinalDirection.South;
        } // North
        else {
            step.y = 1;
            ray.y = (wallPos.y + 1 - position.y) * unitStep.y;
        }

        // Increment by ray, limit by max units
        while (distance < this.settings.renderDistance) {
            if (ray.x < ray.y) {
                wallPos.x += step.x;
                distance = ray.x;
                ray.x += unitStep.x;
                xWallHit = true;
            }
            else {
                wallPos.y += step.y;
                distance = ray.y;
                ray.y += unitStep.y;
                xWallHit = false;
            }

            // OutOfBound -> x/y < 0 or x/y > mapsize, then if solid
            if (wallPos.x < 0 || wallPos.y < 0  || wallPos.x >= this.currentLevel.mapWidth || wallPos.y >= this.currentLevel.mapHeight) {
                console.log("out of bound");
                return null;
            }
            else if (this.currentLevel.isSolid(wallPos.x, wallPos.y)) {
                let hitCoordinate = new Coordinate(position.x + direction.x * distance, position.y + direction.y * distance);

                let cardinalDirection = horizontalDirection;
                let textureOffset = 0;

                if (xWallHit) {
                    cardinalDirection = verticalDirection;
                    textureOffset = hitCoordinate.y - Math.floor(hitCoordinate.y);
                    //hitCoordinate.x = Math.floor(hitCoordinate.x);
                } else {
                    textureOffset = hitCoordinate.x - Math.floor(hitCoordinate.x);
                    //hitCoordinate.y = Math.floor(hitCoordinate.y);
                }

                // flip North & West textures
                if (cardinalDirection == CardinalDirection.North || cardinalDirection == CardinalDirection.West) {
                    textureOffset = 1 - textureOffset;
                }

                return { 
                    coord: hitCoordinate,
                    cardinalDirection: cardinalDirection,
                    textureOffset: textureOffset,
                    wallTextureId: this.currentLevel.get(wallPos.x, wallPos.y)
                };
            }
        }

        console.log("raycast limit");
        return null;
    }
}

export { GameEngine }