import React from "react";
// import Sidebar from "../Pages/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/logo/Logo.png";
import {
  FaCartArrowDown,
  FaCheckDouble,
  FaMoneyCheckAlt,
  FaHome,
  FaUserShield,
  FaUserGraduate,
} from "react-icons/fa";

const DashboardLayout = () => {
  return (
    <div>
      <button
        data-drawer-target="separator-sidebar"
        data-drawer-toggle="separator-sidebar"
        aria-controls="separator-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="separator-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <Link to={"/"}>
            <img className="h-12 mt-6 mb-10" src={logo} alt="" />
          </Link>

          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to={"/dashboard/selectedClass"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaCartArrowDown className="text-xl font-medium text-gray-500"></FaCartArrowDown>
                <span className="ml-3">Selected Class</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/dashboard/enrollClass"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaCheckDouble className="text-xl font-medium text-gray-500"></FaCheckDouble>
                <span className="ml-3">Enrollment Class</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/dashboard/paymentHistory"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaMoneyCheckAlt className="text-xl font-medium text-gray-500"></FaMoneyCheckAlt>
                <span className="ml-3">Payment History</span>
              </Link>
            </li>
          </ul>
          <hr className="my-10" />
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to={"/"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaHome className="text-xl font-medium text-gray-500"></FaHome>
                <span className="ml-3">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/instructors"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaUserShield className="text-xl font-medium text-gray-500"></FaUserShield>
                <span className="ml-3">Instructors</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/allclasses"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaUserGraduate className="text-xl font-medium text-gray-500"></FaUserGraduate>
                <span className="ml-3">Classes</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 py-24">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
