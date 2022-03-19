import { SETTINGS } from "./config.js";
import { KeyBindings } from "./const.js";
import { Action } from "./enum.js";
import { KeyBinding } from "./type.js";

document.addEventListener("keydown", (e: KeyboardEvent) => {
    const keyBinding = KeyBindings.find((keyBinding: KeyBinding) => keyBinding.keys.find(key => key == e.code));

    switch (keyBinding.action) {
        case Action.Pause:
            SETTINGS.autoTurn = !SETTINGS.autoTurn;
            break;
    
        default:
            console.log(keyBinding);
            break;
    }
});