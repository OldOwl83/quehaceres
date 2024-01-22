import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { join } from 'path'

import icon from '../../resources/icon.png?asset'

import { client } from "./db/dbConnection";
import {
  getAllLists, insertNewList, updateList, deleteList, 
  getTodosByList, insertNewTodo, updateTodo, deleteTodo, getFavouriteTodos
} from "./db/dbApi"


function createWindow() {
  
  const mainWindow = new BrowserWindow({
    title: 'Quehaceres',
    minWidth: 600,
    minHeight: 460,
    width: 800,
    height: 600,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true
    },
    frame: false,
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
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


  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('quit', () => {
  console.log('Conexión a la bd cerrada.')
  client.end();
})
