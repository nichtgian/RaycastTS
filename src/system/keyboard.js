const KeyBinding = {
    moveForward: [ 87, 38 ], // W, ArrowUp
    moveBackwards: [ 83, 40 ], // S, ArrowDown
    strafeLeft: [ 65, 37 ], // A, ArrowLeft
    strafeRight: [ 68, 39 ], // D, ArrowRight
};

document.addEventListener("keydown", (e) => {
    console.log(e);
});