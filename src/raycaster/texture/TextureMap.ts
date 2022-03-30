import { TextureMapDefinitionSettings, TextureSlice } from "../../system/type.js";
import { Level } from "../Level.js";
import { Texture } from "./Texture.js";

class TextureMap {
    private _textureMaps: TextureMapDefinition[];

    constructor(textureMaps: TextureMapDefinition[]) {
        this._textureMaps = textureMaps;
    }

    async load(textureMap: TextureMapDefinition): Promise<void> {
        this._textureMaps.push(textureMap);
    }

    getTexture(id: string): TextureSlice {
        const definition = this.findDefiningTextureMap(id);
        return definition.getTextureById(id);
    }

    // Slice -> texture vertical column
    getTextureSlice(id: string, offset: number, width: number = 1): TextureSlice {
        if (offset < 0) {
            offset = 0;
        } else if (offset > 1) {
            offset = 1;
        }
        
        const definition = this.findDefiningTextureMap(id);
        if (!definition) {
            return null;
        }
        
        return definition.getTextureSliceById(id, offset, width);
    }

    // Sample -> texture at sample position
    getTextureSample(id: string, offsetX: number, offsetY: number = 1, width: number = 1): TextureSlice {
        let textureSlice = this.getTextureSlice(id, offsetX, width);
        if (!textureSlice) {
            return null;
        }
        textureSlice.slice.heigth = offsetY;
        return textureSlice;
    }
    
    // TODO
    async loaded(level: Level): Promise<void> {
        return new Promise((resolve, reject) => setTimeout(resolve, 50));
    }

    private findDefiningTextureMap(textureId: string): TextureMapDefinition {
        return this._textureMaps.find((definition: TextureMapDefinition) => definition.definesTexture(textureId));
    }
}

class TextureMapDefinition {
    image: HTMLImageElement = new Image();
    textures: TextureMapLocation<Texture>[];
    settings: TextureMapDefinitionSettings = {
        textureSize: 512,
        textureSpacing: 16,
        columns: 4,
        rows: 4
    }

    constructor(imageSrc: string, textures: TextureMapLocation<Texture>[], settings: TextureMapDefinitionSettings = null) {
        this.image.src = imageSrc;
        this.textures = textures;

        if (settings != null) {
            this.settings = settings;
        }
    }

    definesTexture(textureId: string): boolean {
        return this.findTextureById(textureId) != undefined;
    }

    findTextureById(textureId: string): TextureMapLocation<Texture> {
        return this.textures.find((texture: TextureMapLocation<Texture>) => texture.object.id == textureId);
    }

    getTextureById(textureId: string): TextureSlice {
        const textureLocation = this.findTextureById(textureId);
        return this.getTexture(textureLocation.columnX, textureLocation.rowY);
    }

    getTextureSliceById(textureId: string, offset: number, width: number = 1): TextureSlice {
        const textureLocation = this.findTextureById(textureId);
        return this.getTextureSlice(textureLocation.columnX, textureLocation.rowY, offset, width);
    }

    private getTexture(columnX: number, rowY: number): TextureSlice {
        if (columnX < 0 || columnX > this.settings.columns || rowY < 0 || rowY > this.settings.rows) {
            return null;
        }

        return {
            src: this.image,
            slice: {
                startX: this.getPixel(columnX),
                startY: this.getPixel(rowY),
                width: this.settings.textureSize,
                heigth: this.settings.textureSize
            }
        }
    }

    private getTextureSlice(columnX: number, rowY: number, offset: number, width: number = 1): TextureSlice {
        let fullTexture = this.getTexture(columnX, rowY);
        fullTexture.slice.startX = Math.floor(fullTexture.slice.startX + offset * this.settings.textureSize);
        fullTexture.slice.width = width;

        return fullTexture;
    }

    private getPixel(index: number): number {
        return index * (this.settings.textureSize + this.settings.textureSpacing);
    }
}

class TextureMapLocation<ObjectType extends Texture> {
    object: ObjectType;
    columnX: number;
    rowY: number;

    constructor(object: ObjectType, columnX: number, rowY: number) {
        this.object = object;
        this.columnX = columnX;
        this.rowY = rowY;
    }
}

export { TextureMap, TextureMapDefinition, TextureMapLocation }