import { Coordinate } from "../common/Coordinate.js";

class Level {
    constructor(map = [[]], name = "", sprites = [], spawnPoint = new Coordinate(1.5, 1.5)) {
        this.name = name;
        this.map = map;
        this.sprites = sprites;
        this.spawnPoint = spawnPoint;
    }

    isSolid(x, y) {
        return this.map[y][x] == 0 ? false : true;
    }
}

export { Level };