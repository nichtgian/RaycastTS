import { WorldElement } from "./Element.js";

class Wall extends WorldElement {

    letRayPass: boolean = false;

    constructor(id: string, height: number = 1) {
        super(id, height);
    }
}

export { Wall }