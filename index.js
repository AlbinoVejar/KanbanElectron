const { app, BrowserWindow } = require('electron');
const ipcMain = require('electron').ipcMain;
const sqlModule = require('./sql.js');
const sql = new sqlModule();

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

ipcMain.on('getOne', (req, res) => {
    console.log(res);
    // sql.getOne(res)
    //     .then((data) => {
    //         req.reply('adios', data);
    //     })
    //     .catch((err) => {
    //         req.returnValue('Ocurrió un error');
    //     });
});
ipcMain.on('getAll', (req, res) => {
    sql.getAll(res).then((data) => {
        req.reply('getAll', data);
        sql.cerrar();
    }).catch((err) => {
        req.returnValue('Ocurrió un error');
    });
});
ipcMain.on('insert', (req, res) => {
    sql.insert(res).then((data) => {
        req.reply('inserted', data);
        sql.cerrar();
    }).catch((err) => {
        req.returnValue('Ocurrió un error');
    });
});
ipcMain.on('update', (req, res) => {
    sql.update(res).then((data) => {
        req.reply('updated', data);
        sql.cerrar();
    }).catch((err) => {
        req.returnValue('Ocurrió un error');
    });
});
ipcMain.on('delete', (req, res) => {
    sql.delete(res).then((data) => {
        req.reply('deleted', data);
        sql.cerrar();
    }).catch((err) => {
        req.returnValue('Ocurrió un error');
    });
});