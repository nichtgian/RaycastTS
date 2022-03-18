import { Coordinate } from "../common/Coordinate.js";
import { Direction } from "../common/Direction.js";
import { CardinalDirectionRad } from "../system/const.js";

class Player {
  constructor(position = {x: 1.5, y: 1.5}, directionRad = CardinalDirectionRad.ESE) {
    this.position = new Coordinate(position.x, position.y);
    this.direction = new Direction(directionRad);
  }

  move(newPosition) {

  }

  look(newDirection) {
    
  }
}

export { Player }