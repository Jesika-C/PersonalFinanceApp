import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Record from "./components/Login";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
    
  }
]);

ReactDOM.createRoot(document.getElemetnById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);