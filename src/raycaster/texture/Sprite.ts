import { WorldElement } from "./Element";

class Sprite extends WorldElement {
    constructor(id: string, height: number = 1) {
        super(id, height);
    }
}

// Todo: Complex sprites (change texture based on direction) + Animations -> Enemies & Players

export { Sprite }