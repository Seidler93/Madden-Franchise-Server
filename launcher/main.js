const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const path = require('path');

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('index.html');

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// 🏈 Function to Launch RPCS3
ipcMain.on('launch-rpcs3', () => {
    const rpcs3Path = `"C:\\Users\\ajsei\\Downloads\\rpcs3-v0.0.34-17288-0bb2f72e_win64\\rpcs3.exe"`;
    exec(rpcs3Path, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error launching RPCS3: ${error.message}`);
            return;
        }
        console.log(`RPCS3 started: ${stdout}`);
    });
});

// 🏈 Function to Launch PCSX2
ipcMain.on('launch-pcsx2', () => {
    const pcsx2Path = `"C:\\Users\\ajsei\\Desktop\\Emulation\\PCSX2\\pcsx2-qt.exe"`; 
    exec(pcsx2Path, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error launching PCSX2: ${error.message}`);
            return;
        }
        console.log(`PCSX2 started: ${stdout}`);
    });
});

ipcMain.on('open-settings', () => {
  const settingsWindow = new BrowserWindow({
      width: 500,
      height: 400,
      webPreferences: {
          nodeIntegration: true
      }
  });

  settingsWindow.loadFile('settings.html'); // Create this file next
});

