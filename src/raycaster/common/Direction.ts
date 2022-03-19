import { Coordinate } from "./Coordinate.js";

class Direction {
    rad: number; 
    deg: number;
    vector: Coordinate;

    constructor(rad: number) {
        this.rad = rad;
        this.update();
    }

    private update(): void {
        this.rad = Direction.adjustToPeriod(this.rad);
        this.deg = Direction.getDeg(this.rad);
        this.vector = Direction.getVector(this.rad);
    }

    changeRad(newRad: number): void {
        this.rad = Direction.adjustToPeriod(newRad);
        this.update();
    }

    turn(radChange: number = 0.05): void {
        this.rad += radChange;
        this.update();
    }

    static getDeg(rad: number): number {
        return rad / Math.PI * 180;
    }

    static getVector(rad: number): Coordinate {
        return new Coordinate(Math.cos(rad), Math.sin(rad));
    }

    // Period [0;2*PI]
    static adjustToPeriod(rad: number): number {
        if (rad < 0) {
            rad += Math.PI * 2;
            return Direction.adjustToPeriod(rad);
        } else if (rad > Math.PI * 2) {
            rad -= Math.PI * 2;
            return Direction.adjustToPeriod(rad);
        }
        return rad;
    }
}

export { Direction }