
import React from 'react'
import { MoonIcon, BellIcon } from 'lucide-react'

export function DashNavbar() {
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-white">
      <div className="flex items-center space-x-3">
     
        <img
          src="Logo.png"
          alt="Logo"
          className="h-8 w-25"
        />
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <MoonIcon size={20} className="text-gray-500" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <BellIcon size={20} className="text-gray-500" />
        </button>
        <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="User avatar"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </header>
  )
}
