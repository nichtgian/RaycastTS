class Coordinate {
    constructor(x = 0, y = 0) {
      this.x = x;
      this.y = y;
    }

    getDistance(otherPos) {
        return Math.sqrt(Math.pow(this.x - otherPos.x, 2) + Math.pow(this.y - otherPos.y, 2))
    }
}

export { Coordinate };