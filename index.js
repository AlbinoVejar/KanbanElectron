const { app, BrowserWindow } = require('electron');
const ipcMain = require('electron').ipcMain;
// const util = require('util');
const sqlModule = require('./sql.js');
// const AsAw = util.promisify(ipcMain.on);
// const url = require("url");
// const path = require("path");
// const http = require('http');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL('http://localhost:4200');
    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
}

app.on('ready', function() {
    createWindow();
});

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function() {
    if (mainWindow === null) createWindow();
});

ipcMain.on('hola', (req, res) => {
    sqlModule.buscar()
        .then((data) => {
            console.log(data);
            req.reply('adios', data);
        })
        .catch((err) => {
            console.log('error');
        });
});