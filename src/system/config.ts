import { TextureMap, TextureMapDefinition, TextureMapLocation } from "../raycaster/texture/TextureMap.js";
import { Coordinate } from "../raycaster/common/Coordinate.js";
import { Wall } from "../raycaster/texture/Wall.js";
import { Quality } from "./enum.js";
import { Level } from "../raycaster/Level.js";
import { Resolution } from "./const.js";

const WORLD_CONFIG: {
    textureMaps: TextureMap[],
    levels: Level[]
} = {
    textureMaps: [
        new TextureMap( 
            [
                new TextureMapDefinition(
                    "media/texture/default.png", 
                    [
                        new TextureMapLocation<Wall>(new Wall("1"), 0, 0),
                        new TextureMapLocation<Wall>(new Wall("2"), 1, 0)
                    ]
                )
            ]
        )
    ],
    levels: [
        new Level([
            ["1", "1", "2", "1", "2", "1", "2", "1", "2", "2"],
            ["1", "0", "0", "0", "0", "0", "0", "0", "0", "2"],
            ["2", "0", "0", "0", "0", "1", "0", "0", "0", "2"],
            ["1", "0", "0", "1", "1", "1", "0", "1", "1", "2"],
            ["2", "0", "0", "0", "0", "0", "0", "0", "0", "1"],
            ["1", "0", "0", "2", "0", "0", "0", "1", "0", "1"],
            ["1", "1", "2", "2", "1", "1", "1", "1", "1", "1"],
        ],
        new Coordinate(1.5, 1.5)
        ),
        new Level([
            ["0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "2", "0"],
            ["0", "0", "1", "0", "2", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "2", "0", "1", "0", "0"],
            ["0", "2", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0"]
        ],
        new Coordinate(0.5, 1.5)
        )
    ]
}

const DEFAULT_SETTINGS = {
    fov: 110,
    renderDistance: 20,
    resolution: Resolution.HD,
    scaling: 1,
    textureResolution: Quality.High, // 2->256px, 4->128px
    screenResolution: Quality.High, // 2->½rays, 4->¼rays
    minimapRadius: 3,
    showDebugInfo: true,
    autoTurn: true
}

export { DEFAULT_SETTINGS as SETTINGS, WORLD_CONFIG as WORLD }

/*
X↑    N        270°
    W + E   180°  360°
Y→    S        90°

East:   0;2PI   0°;360°,    XY(+1:0)
North:  ⅔PI     270°,       XY(0:-1)
West:   PI      180°,       XY(-1:0)
South:  ½PI     90°,        XY(0:+1)
*/
