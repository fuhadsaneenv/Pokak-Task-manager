import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <img
              src="/Logo.png"
              alt="Listify Logo"
              className="w-[140px] sm:w-[172px] h-auto object-contain"
            />
          </div>

          <div className="hidden md:flex space-x-6">
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              About us
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Contacts
            </a>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors focus:outline-none"
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-sm border-t border-gray-200/50 px-4 py-3 space-y-3">
          <a
            href="#"
            className="block text-gray-600 hover:text-blue-600 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            About us
          </a>
          <a
            href="#"
            className="block text-gray-600 hover:text-blue-600 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Contacts
          </a>
        </div>
      )}
    </nav>
  );
}
