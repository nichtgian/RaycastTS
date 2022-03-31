class Coordinate {
    x: number;
    y: number;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    distanceTo(destination: Coordinate): number {
        return Math.sqrt(Math.pow(this.x - destination.x, 2) + Math.pow(this.y - destination.y, 2))
    }

    angleTo(destination: Coordinate): number {
        return (this.y - destination.y) / (this.x - destination.y);
    }
}

export { Coordinate }