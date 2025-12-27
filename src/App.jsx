import React from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./routes/Home/index.jsx";
import Movie from "./routes/Movie/index.jsx";


const App = () => {
  const router = createBrowserRouter([
     {
      path: "/movies/:id",
      Component: Movie,
    },
    {
      path: "/",
      Component: Home,
    },

  ]);
  return <RouterProvider router={router} />
};
export default App 