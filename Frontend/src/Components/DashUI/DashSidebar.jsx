import React, { useState } from "react";
import { Calendar } from "./Calender";
import { MenuIcon, XIcon } from "lucide-react";

export function DashSidebar({
  selectedDate,
  onDateSelect,
  selectedView,
  lists,
  tasks,
  onSelectView,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const tasksSection = [
    { id: 1, name: "Today", count: tasks.filter((t) => !t.completed).length },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full w-64 border-r border-gray-100 bg-white">
      <div className="sticky top-0 h-screen overflow-auto p-2">
        <Calendar selectedDate={selectedDate} onDateSelect={onDateSelect} />

        <div className="mt-4">
          <h2 className="px-4 py-2 text-sm font-medium text-gray-500">Tasks</h2>
          <ul>
            {tasksSection.map((task) => (
              <li key={task.id}>
                <button
                  className={`w-full px-4 py-2 flex justify-between items-center text-sm ${
                    selectedView === task.name ? "bg-gray-100" : ""
                  } hover:bg-gray-50 rounded`}
                  onClick={() => {
                    onSelectView(task.name);
                    setMobileOpen(false); 
                  }}
                >
                  <span>{task.name}</span>
                  <span className="text-xs text-gray-500">{task.count}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h2 className="px-4 py-2 text-sm font-medium text-gray-500">Lists</h2>
          <ul>
            {lists.map((list) => {
              const count = tasks.filter(
                (t) => t.tag === list.name && !t.completed
              ).length;
              return (
                <li key={list.id}>
                  <button
                    className={`w-full px-4 py-2 flex justify-between items-center text-sm ${
                      selectedView === list.name ? "bg-gray-100" : ""
                    } hover:bg-gray-50 rounded`}
                    onClick={() => {
                      onSelectView(list.name);
                      setMobileOpen(false); 
                    }}
                  >
                    <span>{list.name}</span>
                    <span className="text-xs text-gray-500">{count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="md:hidden flex items-center p-2 border-b border-gray-100 bg-white">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
        >
          {mobileOpen ? (
            <XIcon size={24} className="text-gray-600" />
          ) : (
            <MenuIcon size={24} className="text-gray-600" />
          )}
        </button>
        <span className="ml-2 font-semibold text-gray-700">Menu</span>
      </div>

      <div className="hidden md:flex">{sidebarContent}</div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black opacity-30"
            onClick={() => setMobileOpen(false)}
          ></div>

          <div className="relative z-50 w-64">{sidebarContent}</div>
        </div>
      )}
    </>
  );
}

