const Electron = require("electron");
const App = Electron.app;
const BrowserWindow = Electron.BrowserWindow;
const path = require("path");
const url = require("url");
let window;



function createApplicationWindow() {
    window = new BrowserWindow({frame: false, webPreferences: { nodeIntegration: true}});
    window.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true
    }));
    
    window.webContents.openDevTools();
    console.log("hello" + window.webContents.getURL())

    window.maximize();
    window.setMenu(null);
    window.on("closed", () => {
        window = null;
    })
}

App.on("ready", createApplicationWindow);

App.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        App.quit();
    }
});

App.on("activate", () => {
    if (window === null) {
        createWindow();
    }
});

