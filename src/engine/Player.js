import { Coordinate } from "../common/Coordinate.js";
import { Direction } from "../common/Direction.js";

class Player {
  constructor(position = {x: 1.5, y: 1.5}, directionRad = Math.PI / 4) {
    this.position = new Coordinate(position.x, position.y);
    this.direction = new Direction(directionRad); // default 45°|SouthEeast
  }

  move(newPosition) {

  }

  look(newDirection) {
    
  }
}

export { Player };