import React, { useState } from 'react'
import { Task } from './Task'

export function TaskView({ selectedDate, viewType }) {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Read',
      completed: false,
      color: 'yellow',
    },
    {
      id: 2,
      title: 'Read',
      completed: false,
      color: 'blue',
    },
  ])

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task,
      ),
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">{viewType}</h1>
      <div className="space-y-2">
        {tasks.map((task) => (
          <Task key={task.id} task={task} onToggleComplete={() => toggleTaskCompletion(task.id)} />
        ))}
      </div>
      <button className="fixed bottom-6 right-6 bg-white shadow-lg rounded-full p-3">
        
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  )
}
