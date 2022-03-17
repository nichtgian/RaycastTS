import { Coordinate } from "./Coordinate.js";

class Direction {
    constructor(rad) {
        this.rad = rad;
        this.deg = 0;
        this.vector = null;

        this.update();
    }

    update() {
        this.deg = Direction.getDeg(this.rad);
        this.vector = Direction.getVector(this.rad);
    }

    change(newRad) {
        this.rad = newRad;
        this.update();
    }

    static getDeg(rad) {
        return rad / Math.PI * 180;
    }

    static getVector(rad) {
        return new Coordinate(Math.cos(rad), Math.sin(rad));
    }
}

export { Direction };