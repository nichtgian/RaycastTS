import { Coordinate } from "../common/Coordinate.js";

class Level {
    constructor(map = [[]], name = "", sprites = [], spawnPoint = new Coordinate(1.5, 1.5)) {
        this.name = name;
        this.map = map;
        this.sprites = sprites;
        this.spawnPoint = spawnPoint;
    }

    getWidth() { // X-Achsis
        return this.map[0].length;
    }

    getHeight() { // Y-Achsis
        return this.map.length;
    }

    get(x, y) {
        return this.map[y][x];
    }

    isSolid(x, y) {
        return this.get(x, y) == 0 ? false : true;
    }
}

export { Level }