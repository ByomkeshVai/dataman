import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { GrLogout } from "react-icons/Gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/Ai";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const [isActive, setActive] = useState("false");
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  const handleLogOut = () => {
    logOut();
    navigate("/");
  };
  const handleLogOut2 = () => {
    logOut();
    navigate("/");
  };
  return (
    <>
      <div className="bg-gray-200 text-gray-800 flex justify-between md:hidden">
        <div>
          {/* <Logo /> */}
          <h2>DataMan Admin</h2>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          {/* Branding & Profile Info */}
          <div>
            <div className="w-full hidden md:flex py-2 justify-center items-center bg-[#ccc] mx-auto">
              {/* <Logo /> */}
              <h2>DataMan Admin</h2>
            </div>
            <div>
              <hr />
              <NavLink
                to="/admin/dashboard/add-category"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                  }`
                }
              >
                <span className="mx-4 font-medium">Add Category</span>
              </NavLink>
              <NavLink
                to="/admin/dashboard/all-category"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                  }`
                }
              >
                <span className="mx-4 font-medium">All Category</span>
              </NavLink>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                  }`
                }
              >
                <span className="mx-4 font-medium" onClick={handleLogOut2}>
                  Add User
                </span>
              </NavLink>
              <NavLink
                to="/admin/dashboard/all-user"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                  }`
                }
              >
                <span className="mx-4 font-medium">All User</span>
              </NavLink>
              <NavLink
                to="/admin/dashboard/add-package"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                  }`
                }
              >
                <span className="mx-4 font-medium">Add Package</span>
              </NavLink>
            </div>
          </div>
        </div>

        <div>
          <hr />
          <button
            onClick={handleLogOut}
            className="flex bg-red-500 text-slate-50 w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
