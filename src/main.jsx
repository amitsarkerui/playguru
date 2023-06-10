import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
import Home from "./Pages/Home/Home.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Instructor from "./Pages/Instructor/Instructor.jsx";
import SingleInstructor from "./Pages/SingleInstructor/SingleInstructor.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/instructors",
        element: <Instructor></Instructor>,
      },
      {
        path: "/users/:id",
        element: <SingleInstructor></SingleInstructor>,
        loader: ({ params }) =>
          fetch(`http://localhost:3030/users/${params.id}`),
      },
      {
        path: "/instructors/users/:id",
        element: <SingleInstructor></SingleInstructor>,
        loader: ({ params }) =>
          fetch(`http://localhost:3030/users/${params.id}`),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
