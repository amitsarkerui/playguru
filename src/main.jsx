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
import AllClasses from "./Pages/AllClasses/Classes.jsx";
import SingleClass from "./Pages/SingleClass/SingleClass.jsx";
import Login from "./Pages/Login/Login.jsx";
import Register from "./Pages/Register/Register.jsx";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import DashboardLayout from "./Layout/DashboardLayout.jsx";
import SelectedClass from "./Pages/Dashboard/SelectedClass/SelectedClass.jsx";
import Payment from "./Pages/Dashboard/Payment/Payment.jsx";
import EnrollClass from "./Pages/Dashboard/EnrollClass/EnrollClass.jsx";
import PaymentHistory from "./Pages/Dashboard/PaymentHistory/PaymentHistory.jsx";
import PrivateRoute from "./Routes/PrivateRoute.jsx";
import AdminRoute from "./Routes/AdminRoute.jsx";
import AddClass from "./Pages/Dashboard/Instructor/AddClass.jsx";
import InstructorRoute from "./Routes/InstructorRoute.jsx";
import MyClasses from "./Pages/Dashboard/Instructor/Myclasses.jsx";
import ManageUser from "./Pages/Dashboard/Admin/ManageUser.jsx";
import ManageClasses from "./Pages/Dashboard/Admin/ManageClasses.jsx";
import StudentRoute from "./Routes/StudentRoute.jsx";

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
      {
        path: "/allclasses",
        element: <AllClasses></AllClasses>,
      },
      {
        path: "/classes/:id",
        element: (
          <PrivateRoute>
            <SingleClass></SingleClass>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3030/classes/${params.id}`),
      },
      {
        path: "/allclasses/classes/:id",
        element: <SingleClass></SingleClass>,
        loader: ({ params }) =>
          fetch(`http://localhost:3030/classes/${params.id}`),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  // Dashboard Route
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "/dashboard/selectedClass",
        element: (
          <StudentRoute>
            <SelectedClass></SelectedClass>
          </StudentRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment></Payment>,
      },
      {
        path: "/dashboard/enrollClass",
        element: (
          <StudentRoute>
            <EnrollClass></EnrollClass>
          </StudentRoute>
        ),
      },
      {
        path: "/dashboard/paymentHistory",
        element: (
          <StudentRoute>
            <PaymentHistory></PaymentHistory>
          </StudentRoute>
        ),
      },
      {
        path: "/dashboard/addClass",
        element: (
          <InstructorRoute>
            <AddClass></AddClass>
          </InstructorRoute>
        ),
      },
      {
        path: "/dashboard/myClasses",
        element: (
          <InstructorRoute>
            <MyClasses></MyClasses>
          </InstructorRoute>
        ),
      },
      {
        path: "/dashboard/manageUsers",
        element: (
          <AdminRoute>
            <ManageUser></ManageUser>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manageClasses",
        element: (
          <AdminRoute>
            <ManageClasses></ManageClasses>
          </AdminRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
