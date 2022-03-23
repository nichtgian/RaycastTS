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
    }

    // DDA raycasting algorithm
    raycast(rayDirection: Direction, position: Coordinate = this.player.position) {
        const direction: Coordinate = rayDirection.vector;
        const infinite: number = 100000;

        const unitStep: Coordinate = new Coordinate(
            direction.x == 0 ? infinite : Math.abs(1 / direction.x),
            direction.y == 0 ? infinite : Math.abs(1 / direction.y)
        );
        const wallPos: Coordinate = new Coordinate(
            Math.floor(position.x),
            Math.floor(position.y)
        );

        const step: Coordinate = new Coordinate();
        const ray: Coordinate = new Coordinate();

        let distance: number = 0;
        let verticalDirection: CardinalDirection  = CardinalDirection.West;
        let horizontalDirection: CardinalDirection = CardinalDirection.North;
        let xWallHit: boolean = true;

        // West
        if (direction.x < 0) {
            step.x = -1;
            ray.x = (position.x - wallPos.x) * unitStep.x;
            verticalDirection = CardinalDirection.East;
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

            // OutOfBound -> coord < 0 or coord > mapsize
            if (!SETTINGS.renderOutOfBound && (wallPos.x < 0 || wallPos.y < 0 || wallPos.x >= this.currentLevel.mapWidth || wallPos.y >= this.currentLevel.mapHeight)) {
                return null;
            }
            if (this.currentLevel.isSolid(wallPos.x, wallPos.y)) {

                const hitCoordinate = new Coordinate(position.x + direction.x * distance, position.y + direction.y * distance);    
                let cardinalDirection: CardinalDirection = horizontalDirection;
                let textureOffset = 0;

                if (xWallHit) {
                    cardinalDirection = verticalDirection;
                    textureOffset = hitCoordinate.y - Math.floor(hitCoordinate.y);
                } else {
                    textureOffset = hitCoordinate.x - Math.floor(hitCoordinate.x);
                }

                // flip textures
                if (cardinalDirection == CardinalDirection.North || cardinalDirection == CardinalDirection.East) {
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

        return null;
    }
}

export { GameEngine }