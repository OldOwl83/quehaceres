const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('dbApi', {
  getTodosByList: ( listId ) => ipcRenderer.invoke( 'getTodosByList', listId ),
  insertNewList: ( listName ) => ipcRenderer.invoke( 'insertNewList', listName ),
})