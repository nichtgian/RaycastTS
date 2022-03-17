const KeyBinding = {
    moveForward: [ 87, 38 ], // W, ArrowUp
    moveBackwards: [ 83, 40 ], // S, ArrowDown
    straveLeft: [ 65, 37 ], // A, ArrowLeft
    straveRight: [ 68, 39 ], // D, ArrowRight
};

document.addEventListener("keydown", (e) => {
    console.log(e);
});