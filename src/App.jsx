import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Login from "./Components/Authentication/Login";
import Registration from "./Components/Authentication/Registration";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "login", element: <Login /> },
  { path: "/registration", element: <Registration /> },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
