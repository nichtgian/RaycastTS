import { Action, KeyCode } from "./enum";

type Wall2dArray = string[][];

type KeyBinding = {
    action: Action;
    keys: KeyCode[];
}

type TextureMapDefinitionSettings = {
    textureSize: number;
    textureSpacing: number;
    columns: number;
    rows: number;
}

type TextureCoord = {
    startX: number,
    startY: number,
    width: number,
    heigth: number
}

type TextureSlice = { 
    src: HTMLImageElement, 
    slice: TextureCoord 
}

export { Wall2dArray, KeyBinding, TextureMapDefinitionSettings, TextureCoord, TextureSlice }