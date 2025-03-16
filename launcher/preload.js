const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    launchRPCS3: () => ipcRenderer.send('launch-rpcs3'),
    launchPCSX2: () => ipcRenderer.send('launch-pcsx2')
});
