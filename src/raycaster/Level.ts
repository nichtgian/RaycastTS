import { Coordinate } from "./common/Coordinate.js";
import { Wall2dArray } from "../system/type.js";

class Level {
    map: Wall2dArray;
    spawnPoint: Coordinate;
    mapWidth: number;
    mapHeight: number;

    constructor(map: Wall2dArray, spawnPoint: Coordinate) {
        this.map = map;
        this.spawnPoint = spawnPoint;

        this.mapWidth = this.map[0].length; // X-Achsis
        this.mapHeight =  this.map.length; // Y-Achsis
    }

    get(x: number, y: number): string {
        if (x < 0 || y < 0 || x >= this.mapWidth || y >= this.mapHeight) {
            return "0";
        }

        return this.map[y][x];
    }

    isSolid(x: number, y: number): boolean {
        return this.get(x, y) == "0" ? false : true;
    }
}

export { Level }