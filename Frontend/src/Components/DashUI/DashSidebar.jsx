import React from 'react'
import { Calendar } from './Calender'

export function DashSidebar({ selectedDate, onDateSelect, onTodayClick, selectedView }) {
    const tasks = [
      {
        id: 1,
        name: 'Today',
        count: 2,
      },
    ]
  
    const lists = [
      {
        id: 1,
        name: 'Daily Routine',
        count: 1,
      },
      {
        id: 2,
        name: 'Study',
        count: 0,
      },
    ]
  
    return (
      <div className="w-[300px] border-r border-gray-100 flex flex-col">
        <div className="sticky top-0 h-screen overflow-auto">
          <Calendar selectedDate={selectedDate} onDateSelect={onDateSelect} />
          <div className="mt-4">
            <h2 className="px-4 py-2 text-sm font-medium text-gray-500">Tasks</h2>
            <ul>
              {tasks.map((task) => (
                <li key={task.id}>
                  <button
                    className={`w-full px-4 py-2 flex justify-between items-center ${
                      selectedView === task.name ? 'bg-gray-100' : ''
                    }`}
                    onClick={onTodayClick}
                  >
                    <span className="text-sm">{task.name}</span>
                    <span className="text-xs text-gray-500">{task.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h2 className="px-4 py-2 text-sm font-medium text-gray-500">Lists</h2>
            <ul>
              {lists.map((list) => (
                <li key={list.id}>
                  <button className="w-full px-4 py-2 flex justify-between items-center">
                    <span className="text-sm">{list.name}</span>
                    <span className="text-xs text-gray-500">{list.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
  