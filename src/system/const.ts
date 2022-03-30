import { Action, KeyCode } from "./enum.js";
import { KeyBinding } from "./type.js";

const CardinalDirectionRad = {
    North: Math.PI * 1.5,
    NNE: Math.PI * 1.625,
    NorthEast: Math.PI * 1.75,
    ENE: Math.PI * 1.875,
    East: 0,
    ESE: Math.PI * 0.125,
    SouthEast: Math.PI * 0.25,
    SSE: Math.PI * 0.375,
    South: Math.PI * 0.5,
    SSW: Math.PI * 0.675,
    SouthWest: Math.PI * 0.75,
    WSE: Math.PI * 0.875,
    West: Math.PI,
    WNW: Math.PI * 1.125,
    NorthWest: Math.PI * 1.25,
    NNW: Math.PI * 1.375
}

const RGBColor = {
    Sky_ClearBlue: "#87CEEB",
    Ground_Grass: "#5B8C5A",
    Ground_NoonGray: "#8D7177",
    Transparent: "rgba(0, 0, 0, 0.3)",
    Default: "#8B8589"
}

const KeyBindings: KeyBinding[] = [
    { action: Action.MoveForward, keys: [ KeyCode.W, KeyCode.ArrUp ]},
    { action: Action.MoveBackward, keys: [ KeyCode.S, KeyCode.ArrDown ]},
    { action: Action.StrafeLeft, keys: [ KeyCode.A, KeyCode.ArrLeft ]},
    { action: Action.StrafeRight, keys: [ KeyCode.D, KeyCode.ArrRight ]},
    { action: Action.LookLeft, keys: [ KeyCode.Q ]},
    { action: Action.LookRight, keys: [ KeyCode.E ]},
    { action: Action.Pause, keys: [ KeyCode.Spacebar ]}
];

const Resolution = {
    Legacy: { width: 320, height: 180 },
    SD: { width: 640, height: 360 },
    HQ: { width: 854, height: 480 },
    HD: { width: 1280, height: 720 },
    FHD: { width: 1920, height: 1080 }
}

export { CardinalDirectionRad, RGBColor, KeyBindings, Resolution }