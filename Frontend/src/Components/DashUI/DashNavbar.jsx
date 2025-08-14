import React, { useState } from "react";
import { MoonIcon, BellIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function DashNavbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
      <header className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-white">
        <div className="flex items-center space-x-3">
          <img src="Logo.png" alt="Logo" className="h-8 w-25" />
        </div>

        <div className="flex items-center space-x-4 relative">
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
