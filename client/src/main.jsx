import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./errorPage.jsx";
import Deposit from "./components/deposit.jsx";
import Withdraw from "./components/withdraw.jsx";
import CreateAccount from "./components/createAccount.jsx";
import App from "./App.jsx";
import Home from "./components/home.jsx";
import AllData from "./components/allData.jsx";
import "./index.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/deposit",
        element: <Deposit />,
      },
      {
        path: "/withdraw",
        element: <Withdraw />,
      },
      {
        path: "/create-account",
        element: <CreateAccount />,
      },
      {
        path: "/all-data",
        element: <AllData />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
