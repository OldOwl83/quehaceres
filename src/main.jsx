import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import GralLayout, { loader as AllListLoader } from "./routes/base/base";

import './globals.scss';
import ListScreen, { loader as todoLoader } from "./routes/list/list";
import { action as insertTodoAction } from './routes/actions/insert-todo';
import { action as updateListAction } from './routes/actions/update-list';
import { action as updateTodoAction } from './routes/actions/update-todo';


const router = createBrowserRouter([
  {
    path: "/",
    id: 'root',
    element: <GralLayout />,
    loader: AllListLoader,
    children: [
      {
        path: ':listId',
        element: <ListScreen />,
        loader: todoLoader
      }
    ]
  },
  {
    path: '/insert-todo',
    action: insertTodoAction
  },
  {
    path: '/update-list',
    action: updateListAction
  },
  {
    path: '/update-todo',
    action: updateTodoAction
  }
]);


window.onkeydown = e => {
  if( e.key === 'F12') window.winHandlers.devTools();
}


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>
);