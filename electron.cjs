const electron = require('electron')
const path = require('path')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 700,
    height: 800,
    center: true,
    webPreferences: {nodeIntegration: true, contextIsolation: false},
    autoHideMenuBar: true,
  })
  // and load the index.html of the app.
  console.log(__dirname)
  mainWindow.loadURL(path.join(__dirname, '/dist/index.html'))
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)