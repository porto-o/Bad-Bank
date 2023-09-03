import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Deposit from "./components/customer/Deposit";
import Withdraw from "./components/customer/Withdraw";
import History from "./components/customer/History";
import Home from "./components/customer/Home";
import NavBar from "./components/customer/NavBar";
import ErrorPage from "./components/Error.jsx";
import { AuthProvider } from "./context/auth.context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signin",
    errorElement: <ErrorPage />,
    element: <SignIn />,
  },
  {
    path: "/me",
    element: <NavBar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/me",
        element: <Home />,
      },
      {
        path: "deposit",
        element: <Deposit />,
      },
      {
        path: "withdraw",
        element: <Withdraw />,
      },
      {
        path: "history",
        element: <History />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
