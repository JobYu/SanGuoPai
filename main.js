const { app, BrowserWindow } = require('electron');
const path = require('path');

// 热重载 (Hot Reload)
try {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    });
} catch (err) {
    console.log('electron-reload not found');
}

function createWindow() {
    const window = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false // For prototype simplicity, allow node integration
        },
        title: "三國派 - 21點戰鬥 Demo"
    });

    window.loadFile('index.html');
    window.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();

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
