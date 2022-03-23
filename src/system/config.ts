import { Quality } from "./enum.js";
import { Resolution } from "./const.js";

const DEFAULT_SETTINGS = {
    fov: 100,
    renderDistance: 25,
    renderOutOfBound: true,
    showDistanceShadow: true,
    correctFisheye: true,

    scaling: 1,
    resolution: Resolution.HD,
    textureResolution: Quality.High,
    screenResolution: Quality.High,

    minimapRadius: 3,
    showDebugInfo: true,
    autoTurn: true
}

const ACTIVE_ACTION = {
    lookSpeed: 0,
    movementSpeed: 0,
    strafeSpeed: 0
}

export { DEFAULT_SETTINGS as SETTINGS, ACTIVE_ACTION }

/*
X↑    N        270°
    W + E   180°  360°
Y→    S        90°

East:   0;2PI   0°;360°,    XY(+1:0)
North:  ⅔PI     270°,       XY(0:-1)
West:   PI      180°,       XY(-1:0)
South:  ½PI     90°,        XY(0:+1)
*/
