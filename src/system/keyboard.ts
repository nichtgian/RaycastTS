import { SETTINGS, ACTIVE_ACTION } from "./config.js";
import { KeyBindings } from "./const.js";
import { Action } from "./enum.js";
import { KeyBinding } from "./type.js";

document.addEventListener("keydown", (e: KeyboardEvent) => {
    const keyBinding = KeyBindings.find((keyBinding: KeyBinding) => keyBinding.keys.find(key => key == e.code));

    switch (keyBinding?.action) {
        case Action.Pause:
            SETTINGS.autoTurn = !SETTINGS.autoTurn;
            break;
        case Action.LookLeft:
            SETTINGS.autoTurn = false;
            ACTIVE_ACTION.lookSpeed = -0.04;
            break;
        case Action.LookRight:
            SETTINGS.autoTurn = false;
            ACTIVE_ACTION.lookSpeed = 0.04;
            break;
        case Action.MoveForward:
            SETTINGS.autoTurn = false;
            ACTIVE_ACTION.movementSpeed = 0.1;
            break;
        case Action.MoveBackward:
            SETTINGS.autoTurn = false;
            ACTIVE_ACTION.movementSpeed = -0.08;
            break;
        case Action.ToggleMinimap:
            ACTIVE_ACTION.displayMinimap = !ACTIVE_ACTION.displayMinimap;
            break;
    }
});

document.addEventListener("keyup", (e: KeyboardEvent) => {
    const keyBinding = KeyBindings.find((keyBinding: KeyBinding) => keyBinding.keys.find(key => key == e.code));
    
    switch (keyBinding?.action) {
        case Action.LookLeft:
        case Action.LookRight:
            ACTIVE_ACTION.lookSpeed = 0;
            break;
        case Action.MoveForward:
        case Action.MoveBackward:
            ACTIVE_ACTION.movementSpeed = 0;
    }
});