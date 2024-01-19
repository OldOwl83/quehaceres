const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('dbApi', {

  getAllLists: () => ipcRenderer.invoke('getAllLists'),

  insertNewList: ( listName ) => ipcRenderer.invoke( 
    'insertNewList', listName 
  ),

  updateList: ( newListName, listId ) => ipcRenderer.invoke( 
    'updateList', newListName, listId 
  ),

  deleteList: ( listId ) => ipcRenderer.invoke( 'deleteList', listId ),

  getTodosByList: ( listId ) => ipcRenderer.invoke( 'getTodosByList', listId ),

  insertNewTodo: ( todoDescr, listId ) => ipcRenderer.invoke( 
    'insertNewTodo', todoDescr, listId 
  ),

  updateTodo: ( todoDescr, todoFavor, todoDone, listId ) => ipcRenderer.invoke( 
    'updateTodo', todoDescr, todoFavor, todoDone, listId
  ),
  
  deleteTodo: ( todoId ) => ipcRenderer.invoke( 'deleteTodo', todoId ),
})

contextBridge.exposeInMainWorld( 'winHandlers', {
  exit: () => ipcRenderer.send( 'exit' ),
  devTools: () => ipcRenderer.send( 'devTools' )
})