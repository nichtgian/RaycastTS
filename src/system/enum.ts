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
    ToggleMinimap,
    Interact,
    Jump,
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
    Spacebar = "Space",
}

enum Quality {
    High = 1, // 100%
    Mid = 2, // 50%
    Low = 4 // 25%
}

export { CardinalDirection, Action, KeyCode, Quality }