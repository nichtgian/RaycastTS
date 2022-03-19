import { Coordinate } from "./common/Coordinate.js";
import { Direction } from "./common/Direction.js";
import { CardinalDirectionRad } from "../system/const.js";

class Player {
    position: Coordinate;
    directionPOV: Direction

    constructor(position: Coordinate) {
        this.position = new Coordinate(position.x, position.y);
        this.directionPOV = new Direction(CardinalDirectionRad.ESE);
    }

    moveTo(newPosition: Coordinate): void {
        this.position = newPosition;
    }

    lookAt(directionRad: number): void {
        this.directionPOV.changeRad(directionRad);
    }

    turnByRad(amoundRad: number): void {
        this.directionPOV.changeRad(amoundRad);
    }
}

export { Player }