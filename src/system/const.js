const CardinalDirectionRad = {
    // 270°
    Noth: Math.PI * 1.5,
    NNW: Math.PI * 1.625,
    NorthEast: Math.PI * 1.75,
    ENE: Math.PI * 1.875,
    // 360° | 0°
    East: 0,
    ESE: Math.PI * 0.125,
    SouthEast: Math.PI * 0.25,
    SSE: Math.PI * 0.375,
    // 90°
    South: Math.PI * 0.5,
    SSW: Math.PI * 0.675,
    SouthWest: Math.PI * 0.75,
    WSE: Math.PI * 0.875,
    // 180°
    West: Math.PI,
    WNW: Math.PI * 1.125,
    NorthWest: Math.PI * 1.25,
    NNW: Math.PI * 1.375
}

const KeyCode = {
    W: 87,
    A: 65,
    S: 83,
    D: 68,
    ArrowUp: 38,
    ArrowDown: 40,
    ArrowLeft: 37,
    ArrowRight: 39
}

const RGBColor = {
    TransparentDark: "rgba(0, 0, 0, 0.3)",
    Skyblue: "#87CEEB",
    Ground: "#5B8C5A"
}

export { CardinalDirectionRad, KeyCode, RGBColor }