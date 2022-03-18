import { Coordinate } from "./Coordinate.js";

class Direction {
    constructor(rad) {
        this.rad = rad;
        this.deg = 0;
        this.vector = null;

        this.update();
    }

    update() {
        this.rad = Direction.adjustPeriod(this.rad);
        this.deg = Direction.getDeg(this.rad);
        this.vector = Direction.getVector(this.rad);
    }

    changeRad(newRad) {
        this.rad = Direction.adjustPeriod(newRad);
        this.update();
    }

    turn(radChange = 0.05) {
        this.rad += radChange;
        this.update();
    }

    static getDeg(rad) {
        return rad / Math.PI * 180;
    }

    static getVector(rad) {
        return new Coordinate(Math.cos(rad), Math.sin(rad));
    }

    // Period [0;2*PI]
    static adjustPeriod(rad) {
        if (rad < 0) {
            rad += Math.PI * 2;
            return Direction.adjustPeriod(rad);
        } else if (rad > Math.PI * 2) {
            rad -= Math.PI * 2;
            return Direction.adjustPeriod(rad);
        }
        return rad;
    }
}

export { Direction }