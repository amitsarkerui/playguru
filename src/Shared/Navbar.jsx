import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo/Logo.png";
import { AuthContextProvider } from "../AuthProvider/AuthProvider";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";
import useInstructorRole from "../hooks/useInstructorRole";
import useStudent from "../hooks/useStudent";

const Navbar = () => {
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructorRole();
  const [isStudent] = useStudent();
  const { user, logOut } = useContext(AuthContextProvider);
  const [cart] = useCart();
  // console.log(user);
  const toggleUserDropdown = () => {
    setUserDropdownOpen(!isUserDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const isLinkActive = (path) => {
    return location.pathname === path;
  };

  //signOut
  const handleSignOut = () => {
    logOut();
  };
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-white border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between mx-auto py-6 px-2">
        <Link to={"/"} className="flex items-center">
          <img src={logo} className="h-12 mr-3" alt="Play Guru Logo" />
        </Link>

        {/* User Profile part */}
        <div className="flex items-center md:order-2 relative">
          <div className="flex justify-center items-center mr-10">
            <div className="relative py-2">
              <div className="t-0 absolute left-3">
                <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                  {cart?.length || 0}
                </p>
              </div>
              <Link to={"/dashboard/selectedClass"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="file: mt-4 h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </Link>
            </div>
          </div>
          {user ? (
            <>
              <button
                type="button"
                className="flex mr-3 text-sm rounded-full md:mr-0 focus:ring-4 "
                id="user-menu-button"
                aria-expanded={isUserDropdownOpen ? "true" : "false"}
                onClick={toggleUserDropdown}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={user.photoURL}
                  alt="user photo"
                />
              </button>
            </>
          ) : (
            <>
              {/* ---------------- Login btn ----------------- */}
              <Link to={"/login"}>
                <button className="btn btn-primary text-white">Login</button>
              </Link>
            </>
          )}

          {/* Dropdown menu */}
          {user ? (
            <>
              {isUserDropdownOpen && (
                <div className="z-50 absolute right-0 my-4 mt-[230px] text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {user.displayName}
                    </span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                      {user.email}
                    </span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    {isStudent ? (
                      <Link
                        to={"/dashboard/selectedClass"}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Dashboard
                      </Link>
                    ) : (
                      <>
                        {isAdmin ? (
                          <Link
                            to={"/dashboard/manageUsers"}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Dashboard
                          </Link>
                        ) : (
                          <Link
                            to={"/dashboard/myClasses"}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Dashboard
                          </Link>
                        )}
                      </>
                    )}

                    <li>
                      <a
                        onClick={handleSignOut}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <></>
          )}

          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded={isMobileMenuOpen ? "true" : "false"}
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isMobileMenuOpen ? "" : "hidden"
          }`}
          id="mobile-menu-2"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                className={`block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 ${
                  isLinkActive("/") ? "text-primary" : "text-gray-900"
                } md:hover:text-[#C37815] md:dark:text-blue-500 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/instructors"
                className={`block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 ${
                  isLinkActive("/instructors")
                    ? "text-primary"
                    : "text-gray-900"
                } md:hover:text-[#C37815] md:dark:text-blue-500 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
              >
                Instructors
              </Link>
            </li>
            <li>
              <Link
                to="/allclasses"
                className={`block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 ${
                  isLinkActive("/classes") ? "text-primary" : "text-gray-900"
                } md:hover:text-[#C37815] md:dark:text-blue-500 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
              >
                Classes
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 ${
                  isLinkActive("/contact") ? "text-primary" : "text-gray-900"
                } md:hover:text-[#C37815] md:dark:text-blue-500 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
