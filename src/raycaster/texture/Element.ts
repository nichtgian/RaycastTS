abstract class Element {

    id: string;
    height: number = 1;

    constructor(id: string, height: number) {
        this.id = id;
        this.height = height;
    }
}

export { Element as WorldElement }