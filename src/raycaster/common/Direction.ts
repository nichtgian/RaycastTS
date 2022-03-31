import { Coordinate } from "./Coordinate.js";

class Direction {

    rad: number;
    deg: number;
    vector: Coordinate;

    constructor(rad: number, autoUpdate = false) {
        this.rad = rad;
        this.update();
    }

    changeRad(newRad: number): void {
        this.rad = Direction.adjustRadToPeriod(newRad);
        this.update();
    }

    turn(radChange: number = 0.05): void {
        this.rad += radChange;
        this.update();
    }

    update(): void {
        this.rad = Direction.adjustRadToPeriod(this.rad);
        this.deg = Direction.toDeg(this.rad);
        this.vector = Direction.toVector(this.rad);
    }

    static toVector(rad: number): Coordinate {
        return new Coordinate(Math.cos(rad), Math.sin(rad));
    }

    static toDeg(rad: number): number {
        return rad / Math.PI * 180;
    }

    static toRad(deg: number): number {
        return deg / 180 * Math.PI;
    }

    // Period [0;2*PI] -> 0° to 360°
    static adjustRadToPeriod(rad: number): number {
        if (rad < 0) {
            rad += Math.PI * 2;
            return Direction.adjustRadToPeriod(rad);
        } else if (rad > Math.PI * 2) {
            rad -= Math.PI * 2;
            return Direction.adjustRadToPeriod(rad);
        }
        return rad;
    }
}

export { Direction }