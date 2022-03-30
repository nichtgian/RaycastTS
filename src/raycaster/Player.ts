import { Coordinate } from "./common/Coordinate.js";
import { Direction } from "./common/Direction.js";
import { CardinalDirectionRad } from "../system/const.js";

class Player {
    position: Coordinate;
    pov: Direction

    constructor(position: Coordinate) {
        this.position = new Coordinate(position.x, position.y);
        this.pov = new Direction(CardinalDirectionRad.East, true);
    }

    moveTo(newPosition: Coordinate): void {
        this.position = newPosition;
    }

    moveBy(amount: number): void {
        this.position = new Coordinate(
            Math.cos(this.pov.rad) * amount + this.position.x,
            Math.sin(this.pov.rad) * amount + this.position.y);
    }

    lookAt(directionRad: number): void {
        this.pov.changeRad(directionRad);
    }

    turnByRad(amoundRad: number): void {
        this.pov.changeRad(amoundRad);
    }
}

export { Player }