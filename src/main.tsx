import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import "./index.css"
import Home from "./features/home"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { ImportProduct } from "./components/importProduct"
import { Inventory } from "./components/inventory"
import { ExportProduct } from "./components/exportProduct"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/importProduct",
    element: <ImportProduct />,
  },
  {
    path: "/inventory",
    element: <Inventory />,
  },
  {
    path: "/exportProduct",
    element: <ExportProduct />,
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
