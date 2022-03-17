import { SETTINGS } from "../config.js";
import { Coordinate } from "../common/Coordinate.js";
import { Level } from "./Level.js";

class Raycaster {
  constructor(level, renderDistance = SETTINGS.renderDistance, removeFisheye = SETTINGS.removeFisheye) {
    this.level = new Level(level.map, level.name, level.sprites, level.spawnPoint);

    this.renderDistance = renderDistance;
    this.removeFisheye = removeFisheye;
  }

  changeLevel(newLevel) {
    this.level = newLevel;
  }

  run() {

  }

  getSpawnpoint() {
    return this.level.spawnPoint;
  }

  // DDA raycasting algorithm
  cast(position, direction) {
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

    // West
    if (direction.x < 0) {
      step.x = -1;
      ray.x = (position.x - wallPos.x) * unitStep.x;
    } // East
    else {
      step.x = 1;
      ray.x = (wallPos.x + 1 - position.x) * unitStep.x;
    }
    // South
    if (direction.y < 0) {
      step.y = -1;
      ray.y = (position.y - wallPos.y) * unitStep.y;
    } // North
    else {
      step.y = 1;
      ray.y = (wallPos.y + 1 - position.y) * unitStep.y;
    }

    // Increment by ray, limit by max units
    while (distance < this.renderDistance) {
      if (ray.x < ray.y) {
        wallPos.x += step.x;
        distance = ray.x;
        ray.x += unitStep.x;
      }
      else {
        wallPos.y += step.y;
        distance = ray.y;
        ray.y += unitStep.y;
      }

      // Check OutOfBound -> x/y < 0 or x/y > mapsize
      if (wallPos.x == 0 || wallPos.y == 0 || wallPos.x == 6 || wallPos.y == 6) {
        // Check SolidWall
        if (true) {
          console.log("hit wall");
          return new Coordinate(position.x + direction.x * distance, position.y + direction.y * distance);
        }
      }
    }
  }
}

export { Raycaster };