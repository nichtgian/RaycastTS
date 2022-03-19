import { Coordinate } from "./Coordinate";

class ObjectPosition<ObjectType> {
    object: ObjectType;
    position: Coordinate;

    constructor(object: ObjectType, position: Coordinate) {
        this.object = object;
        this.position = position;
    }
}

export { ObjectPosition }