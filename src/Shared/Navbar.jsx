import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo/Logo.png";
import { AuthContextProvider } from "../AuthProvider/AuthProvider";

const Navbar = () => {
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logOut } = useContext(AuthContextProvider);
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
    <nav className="container mx-auto bg-white border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between mx-auto py-6 px-2">
        <Link to={"/"} className="flex items-center">
          <img src={logo} className="h-12 mr-3" alt="Play Guru Logo" />
        </Link>

        {/* User Profile part */}
        <div className="flex items-center md:order-2 relative">
          {user ? (
            <>
              <button
                type="button"
                className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
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
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Dashboard
                      </a>
                    </li>
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
