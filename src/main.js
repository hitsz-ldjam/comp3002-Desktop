const {
    app,
    BrowserWindow,
    ipcMain
} = require("electron")

const path = require("path")

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        center: true,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'src/preload.js'),
            nodeIntegration: false
        }
    });

    win.removeMenu();
    win.loadFile("web/login.html");
    win.webContents.setUserAgent("zebra-settings {platform:Desktop;}")
    win.webContents.openDevTools();
}

function onPlatformMessage(event, message) {}

app.on('ready', () => {
    ipcMain.on("platformMessage", onPlatformMessage);
    createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length == 0) {
        createWindow();
    }
});