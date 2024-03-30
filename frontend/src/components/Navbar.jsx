import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/actions/authActions";

const Navbar = () => {
  const authState = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <header className="flex justify-between sticky top-0 p-4 bg-gray-800 shadow-md items-center text-white">
      <h2 className="cursor-pointer text-xl font-bold">
        <Link to="/">Schedular</Link>
      </h2>
      <div className="flex items-center">
        <ul className="hidden md:flex gap-6 text-lg">
          {authState.isLoggedIn ? (
            <>
              <li>
                <Link to="/tasks/add" className="hover:text-gray-300">
                  Add Task
                </Link>
              </li>
              <li className="cursor-pointer" onClick={handleLogoutClick}>
                Logout
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
            </li>
          )}
        </ul>
        <span
          className="md:hidden cursor-pointer text-2xl"
          onClick={toggleNavbar}
        >
          <i className={`fas ${isNavbarOpen ? "fa-times" : "fa-bars"}`}></i>
        </span>
      </div>

      {/* Navbar displayed as sidebar on smaller screens */}
      <div
        className={`fixed md:hidden inset-0 z-50 bg-gray-800 transition-transform ${
          isNavbarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col items-center justify-center h-full gap-6 text-xl">
          {authState.isLoggedIn ? (
            <>
              <li>
                <Link to="/tasks/add" className="hover:text-gray-300">
                  Add Task
                </Link>
              </li>
              <li className="cursor-pointer" onClick={handleLogoutClick}>
                Logout
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
