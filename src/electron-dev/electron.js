const { app, BrowserWindow } = require( 'electron/main' );
const path = require('node:path')
const { ipcMain } = require( 'electron' );

const { client } = require( "../db/dbConnection" );
const { getTodosByList, insertNewList } = require( "../db/dbApi" );


const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    width: 800,
    height: 600,
    autoHideMenuBar: true,
  })
  win.webContents.openDevTools()
  win.loadURL('http://localhost:5173/')
}

app.whenReady().then(() => {
  ipcMain.handle( 'getTodosByList', getTodosByList )
  ipcMain.handle( 'insertNewList', insertNewList )

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('quit', () => {
  console.log('Conexión a la bd cerrada.')
  client.end();
})