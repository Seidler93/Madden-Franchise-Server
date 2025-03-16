const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    launchRPCS3: () => ipcRenderer.send('launch-rpcs3'),
    launchPCSX2: () => ipcRenderer.send('launch-pcsx2'),
    openSettings: () => ipcRenderer.send('open-settings')
});

window.addEventListener("gamepadconnected", (event) => {
  console.log("Controller connected:", event.gamepad.id);
});

window.addEventListener("gamepaddisconnected", (event) => {
  console.log("Controller disconnected:", event.gamepad.id);
});

setInterval(() => {
  let gamepads = navigator.getGamepads();
  console.clear();
  console.log("Gamepads:", gamepads);
}, 1000);


