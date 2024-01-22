import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createHashRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import GralLayout, { loader as AllListLoader } from "./routes/base/base";

import './globals.scss';
import ListScreen, { loader as todoLoader } from "./routes/list/list";

import { action as insertListAction } from './routes/actions/insert-list';
import { action as updateListAction } from './routes/actions/update-list';
import { action as deleteListAction } from './routes/actions/delete-list';

import { action as insertTodoAction } from './routes/actions/insert-todo';
import { action as updateTodoAction } from './routes/actions/update-todo';
import { action as deleteTodoAction } from './routes/actions/delete-todo';



const router = createHashRouter([
  {
    path: "/",
    id: 'root',
    element: <GralLayout />,
    loader: AllListLoader,
    children: [
      {
        index: true,
        element: <Navigate to={ '/Favoritos' } />,
      },
      {
        path: ':listId',
        element: <ListScreen />,
        loader: todoLoader
      }
    ]
  },
  {
    path: '/insert-list',
    action: insertListAction
  },
  {
    path: '/update-list',
    action: updateListAction
  },
  {
    path: '/delete-list',
    action: deleteListAction
  },
  {
    path: '/insert-todo',
    action: insertTodoAction
  },
  {
    path: '/update-todo',
    action: updateTodoAction
  },
  {
    path: '/delete-todo',
    action: deleteTodoAction
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>
);