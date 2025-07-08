import React from "react";
import { RouterProvider } from "react-router-dom";
import AppRoutes from "./routes/Routes.jsx";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <RouterProvider router={AppRoutes} />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default App;
