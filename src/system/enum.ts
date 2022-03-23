enum CardinalDirection {
    North,
    East,
    South,
    West
}

enum Action {
    MoveForward,
    MoveBackward,
    StrafeLeft,
    StrafeRight,
    LookLeft,
    LookRight,
    LookUp,
    LookDown,
    Jump,
    Crouch,
    ToggleMinimap,
    Interact,
    Pause
}

enum KeyCode {
    W = "KeyW",
    A = "KeyA",
    S = "KeyS",
    D = "KeyD",
    ArrUp = "ArrowUp",
    ArrDown = "ArrowDown",
    ArrLeft = "ArrowLeft",
    ArrRight = "ArrowRight",
    Q = "KeyQ",
    E = "KeyE",
    Spacebar = "Space",
}

enum Quality {
    High = 1, // 100%
    Mid = 2, // 50%
    Low = 4 // 25%
}

export { CardinalDirection, Action, KeyCode, Quality }