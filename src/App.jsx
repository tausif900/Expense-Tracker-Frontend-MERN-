import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Login from "./Components/Authentication/Login";
import Registration from "./Components/Authentication/Registration";
import Dashboard from "./Components/Pages/Dashboard";
import { Bounce, ToastContainer } from "react-toastify";
import Accounts from "./Components/Pages/Accounts";
import Transactions from "./Components/Pages/Transaction";
import Budget from "./Components/Pages/Budget";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "login", element: <Login /> },
  { path: "/registration", element: <Registration /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/account", element: <Accounts /> },
  { path: "/transaction", element: <Transactions /> },
  { path: "/budget", element: <Budget /> },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
};

export default App;
