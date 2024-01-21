const { app, BrowserWindow } = require( 'electron/main' );
const path = require('node:path')
const { ipcMain } = require( 'electron' );

const { client } = require( "../db/dbConnection" );
const { 
  getAllLists, insertNewList, updateList, deleteList, 
  getTodosByList, insertNewTodo, updateTodo, deleteTodo, getFavouriteTodos 
} = require( "../db/dbApi" );


const createWindow = () => {
  const win = new BrowserWindow({
    title: 'Quehaceres',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    minWidth: 600,
    minHeight: 460,
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    frame: false,
  })
  
  ipcMain.on( 'devTools', () => win.webContents.openDevTools() )

  win.loadURL('http://localhost:5173')
}

app.whenReady().then(() => {
  ipcMain.handle( 'getAllLists', getAllLists )
  ipcMain.handle( 'insertNewList', insertNewList )
  ipcMain.handle( 'updateList', updateList )
  ipcMain.handle( 'deleteList', deleteList )
  ipcMain.handle( 'getTodosByList', getTodosByList )
  ipcMain.handle( 'getFavouriteTodos', getFavouriteTodos )
  ipcMain.handle( 'insertNewTodo', insertNewTodo )
  ipcMain.handle( 'updateTodo', updateTodo )
  ipcMain.handle( 'deleteTodo', deleteTodo )
  ipcMain.on( 'exit', () => app.quit() )


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