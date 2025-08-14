

import React from 'react'
import { Calendar } from './Calender'

export function DashSidebar({ selectedDate, onDateSelect,  selectedView, lists, tasks, onSelectView }) {
  const tasksSection = [
    { id: 1, name: 'Today', count: tasks.filter(t => !t.completed).length }
  ]

  return (
    <div className="w-[300px] border-r border-gray-100 flex flex-col">
      <div className="sticky top-0 h-screen overflow-auto">
        <Calendar selectedDate={selectedDate} onDateSelect={onDateSelect} />

        <div className="mt-4">
          <h2 className="px-4 py-2 text-sm font-medium text-gray-500">Tasks</h2>
          <ul>
            {tasksSection.map(task => (
              <li key={task.id}>
                <button
                  className={`w-full px-4 py-2 flex justify-between items-center text-sm ${
                    selectedView === task.name ? 'bg-white' : ''
                  } hover:bg-gray-50`}
                  onClick={() => onSelectView(task.name)}
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
            {lists.map(list => {
              const count = tasks.filter(t => t.tag === list.name && !t.completed).length
              return (
                <li key={list.id}>
                  <button
                    className={`w-full px-4 py-2 flex justify-between items-center text-sm ${
                      selectedView === list.name ? 'bg-white' : ''
                    } hover:bg-gray-50`}
                    onClick={() => onSelectView(list.name)}
                  >
                    <span>{list.name}</span>
                    <span className="text-xs text-gray-500">{count}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
