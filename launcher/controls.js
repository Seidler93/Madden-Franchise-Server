let selectedButton = 0;
let buttons = [];
let lastStickMove = 0; // Prevents rapid movement skipping buttons
let buttonPressed = false; // Tracks button press state

function updateSelection() {
    buttons.forEach((btn, index) => {
        btn.style.backgroundColor = index === selectedButton ? "lightblue" : "";
    });
}

function handleControllerInput() {
    let gamepads = navigator.getGamepads();
    if (!gamepads) return;

    let gp = gamepads[0];
    if (gp) {
        let yAxis = gp.axes[1];

        // Dead zone for analog stick
        if (Math.abs(yAxis) < 0.2) {
            lastStickMove = 0;
        } else if (yAxis < -0.5 && lastStickMove !== -1) {
            selectedButton = Math.max(0, selectedButton - 1);
            lastStickMove = -1;
        } else if (yAxis > 0.5 && lastStickMove !== 1) {
            selectedButton = Math.min(buttons.length - 1, selectedButton + 1);
            lastStickMove = 1;
        }

        // Button press handling (Debounce)
        if (!buttonPressed) {
            if (gp.buttons[12].pressed) { // D-Pad Up
                selectedButton = Math.max(0, selectedButton - 1);
                buttonPressed = true;
            }
            if (gp.buttons[13].pressed) { // D-Pad Down
                selectedButton = Math.min(buttons.length - 1, selectedButton + 1);
                buttonPressed = true;
            }
            if (gp.buttons[0].pressed) { // "A" Button (Xbox) or "X" (PS)
                buttons[selectedButton].click();
                buttonPressed = true;
            }
        }

        // Reset button state when no buttons are pressed
        if (!gp.buttons[12].pressed && !gp.buttons[13].pressed && !gp.buttons[0].pressed) {
            buttonPressed = false;
        }
    }

    updateSelection();
    requestAnimationFrame(handleControllerInput);
}

window.onload = function () {
    buttons = document.querySelectorAll("button");
    updateSelection();
    requestAnimationFrame(handleControllerInput);
};


function launchRPCS3() { window.electronAPI.launchRPCS3(); }
function launchPCSX2() { window.electronAPI.launchPCSX2(); }
function openSettings() { window.electronAPI.openSettings(); }
