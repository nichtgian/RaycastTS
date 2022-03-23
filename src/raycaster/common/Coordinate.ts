class Coordinate {
    x: number;
    y: number;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    getDistanceTo(otherCoord: Coordinate): number {
        return Math.sqrt(Math.pow(this.x - otherCoord.x, 2) + Math.pow(this.y - otherCoord.y, 2))
    }

    getAngleTo(otherCoord: Coordinate): number {
        return (this.y - otherCoord.y) / (this.x - otherCoord.y);
    }
}

export { Coordinate }