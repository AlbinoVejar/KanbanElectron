const { app, BrowserWindow } = require('electron');
const ipcMain = require('electron').ipcMain;
const sqlModule = require('./sql.js');
const sql = new sqlModule();

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadURL(`file://${process.cwd()}/dist/index.html`);
    mainWindow.removeMenu();
    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

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

ipcMain.handle('getOne', async(event, arg) => {
    try {
        const data = await sql.getOne(arg);
        return data;
    } catch (error) {
        event.returnValue = 'Error';
    }
});
ipcMain.handle('getAll', async(event, arg) => {
    try {
        const data = await sql.getAll(arg);
        return data;
    } catch (error) {
        event.sender.send('Error');
    }
});
ipcMain.handle('insert', async(event, arg) => {
    try {
        const data = await sql.insert(arg);
        return data;
    } catch (error) {
        event.sender.send('Error');
    }
});
ipcMain.handle('update', async(event, arg) => {
    try {
        const data = await sql.update(arg);
        return data;
    } catch (error) {
        event.returnValue = 'Error';
    }
});
ipcMain.handle('delete', async(event, arg) => {
    try {
        const data = await sql.delete(arg);
        return data;
    } catch (error) {
        event.returnValue = 'Error';
    }
});