import { TextureMap, TextureMapDefinition, TextureMapLocation } from "../raycaster/texture/TextureMap.js";
import { Coordinate } from "../raycaster/common/Coordinate.js";
import { Wall } from "../raycaster/texture/Wall.js";
import { Level } from "../raycaster/Level.js";

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
            ["2", "0", "0", "0", "0", "0", "0", "0", "0", "2"],
            ["1", "0", "0", "1", "0", "0", "0", "1", "X", "2"],
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

export { WORLD_CONFIG as WORLD }