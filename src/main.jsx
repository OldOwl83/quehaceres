import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import GralLayout, { loader as AllListLoader } from "./routes/base/base";

import './globals.scss';
import ListScreen, { loader as todoLoader } from "./routes/list/list";


const router = createBrowserRouter([
  {
    path: "/",
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
]);

window.onkeydown = e => {
  if( e.key === 'F12') window.winHandlers.devTools();
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>
);