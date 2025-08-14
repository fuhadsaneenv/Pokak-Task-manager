import React, { useState } from "react";
import { MoonIcon, BellIcon, MenuIcon, XIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function DashNavbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="flex justify-between items-center px-4 sm:px-6 py-3">
          <div className="flex items-center space-x-3">
            <img src="Logo.png" alt="Logo" className="h-8 w-auto" />
          </div>

          <div className="hidden md:flex items-center space-x-4 relative">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <MoonIcon size={20} className="text-gray-500" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <BellIcon size={20} className="text-gray-500" />
            </button>

            <div className="relative">
              <button
                className="flex items-center space-x-2 h-8 w-8 rounded-full bg-gray-600 overflow-hidden focus:outline-none"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User avatar"
                  className="h-full w-full object-cover"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <XIcon size={24} className="text-gray-600" />
              ) : (
                <MenuIcon size={24} className="text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2 border-t border-gray-100">
            <button className="w-full flex items-center p-2 rounded hover:bg-gray-100">
              <MoonIcon size={20} className="mr-2 text-gray-500" />
              Dark Mode
            </button>
            <button className="w-full flex items-center p-2 rounded hover:bg-gray-100">
              <BellIcon size={20} className="mr-2 text-gray-500" />
              Notifications
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center p-2 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </header>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

