const WORLD_CONFIG = {
    walls: [
        { id: "1", name: "cobble", height: 1, texture: "cobble.png", textureSouth: "cobble_south"},
        { id: "B", name: "brick" },
    ],
    sprites: [
        { name: "barrel", solid: true, radius: 0.3 }
    ],
    levels: [{
        map: [
            ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
            ["1", "0", "0", "0", "0", "0", "0", "0", "0", "1"],
            ["1", "0", "0", "0", "0", "0", "0", "0", "0", "1"],
            ["1", "0", "0", "1", "1", "1", "0", "1", "0", "1"],
            ["1", "0", "0", "1", "0", "0", "0", "1", "0", "1"],
            ["1", "0", "0", "1", "0", "0", "0", "1", "0", "1"],
            ["1", "0", "0", "0", "0", "0", "0", "1", "0", "1"],
            ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
        ],
        sprites: [
            { type: 1, posX: 1.5, posY: 1.5 }
        ],
        name: "default",
        spawnPoint: { x: 1.5, y: 2.5 }
    }]
}

const DEFAULT_SETTINGS = {
    fov: 90,
    renderDistance: 20,
    removeFisheye: true,
    minimapRadius: 3
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