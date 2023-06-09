import React from "react";
import Navbar from "../Pages/Home/Shared/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Pages/Home/Shared/Footer";

const Layout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
