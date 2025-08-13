import React from 'react';

export default function Navbar() {
  return (
<nav className="sticky top-0 z-50 flex justify-between items-center px-8 py-1 bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
  <div className="flex items-center space-x-3">
    <img 
      src="/Logo.png" 
      alt="Listify Logo" 
      className="w-[172px] h-[59.4px] object-contain" 
    />
  </div>
  <div className="flex space-x-6">
    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About us</a>
    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contacts</a>
  </div>
</nav>
  );
}
