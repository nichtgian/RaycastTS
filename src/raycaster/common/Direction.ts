import { Coordinate } from "./Coordinate.js";

class Direction {

    private _rad: number;
    private _deg: number;
    private _vector: Coordinate;
    private _isUpdated: boolean = false;
    private _autoUpdate: boolean = false;

    constructor(rad: number, autoUpdate = false) {
        this._rad = rad;
        this._autoUpdate = autoUpdate;
        this.update();
    }

    get rad(): number { return this._rad; }

    get deg(): number { this.update(); return this._deg; } 

    get vector(): Coordinate { this.update(); return this._vector; } 

    changeRad(newRad: number): void {
        this._rad = Direction.adjustToPeriod(newRad);
        this._isUpdated = false;

        if (this._autoUpdate) {
            this.update();
        }
    }

    turn(radChange: number = 0.05): void {
        this._rad += radChange;
        this._isUpdated = false;

        if (this._autoUpdate) {
            this.update();
        }
    }

    update(): void {
        if (!this._isUpdated) {
            this._rad = Direction.adjustToPeriod(this._rad);
            this._deg = Direction.getDeg(this._rad);
            this._vector = Direction.getVector(this._rad);
            this._isUpdated = true;
        }   
    }

    static getVector(rad: number): Coordinate {
        return new Coordinate(Math.cos(rad), Math.sin(rad));
    }

    static getDeg(rad: number): number {
        return rad / Math.PI * 180;
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