import React, { useState } from 'react'
import { Task } from './Task'
import { PlusIcon } from 'lucide-react'
export function TaskView({  viewType, onCreateTask }) {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Read', completed: false, color: 'yellow' },
    { id: 2, title: 'Write notes', completed: false, color: 'blue' },
    { id: 3, title: 'Exercise', completed: true, color: 'yellow' },
    { id: 4, title: 'Meditate', completed: false, color: 'blue' },
    { id: 5, title: 'Cook lunch', completed: false, color: 'yellow' },
    { id: 6, title: 'Learn React', completed: false, color: 'blue' },
    { id: 1, title: 'Read', completed: false, color: 'yellow' },
    { id: 2, title: 'Write notes', completed: false, color: 'blue' },
    { id: 3, title: 'Exercise', completed: true, color: 'yellow' },
    { id: 4, title: 'Meditate', completed: false, color: 'blue' },
    { id: 5, title: 'Cook lunch', completed: false, color: 'yellow' },
    { id: 6, title: 'Learn React', completed: false, color: 'blue' },
    { id: 1, title: 'Read', completed: false, color: 'yellow' },
    { id: 2, title: 'Write notes', completed: false, color: 'blue' },
    { id: 3, title: 'Exercise', completed: true, color: 'yellow' },
    { id: 4, title: 'Meditate', completed: false, color: 'blue' },
    { id: 5, title: 'Cook lunch', completed: false, color: 'yellow' },
    { id: 6, title: 'Learn React', completed: false, color: 'blue' },
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
    <div className="p-6 ">
      <h1 className="text-2xl font-semibold mb-4">{viewType}</h1>
      <div className="space-y-2">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onToggleComplete={() => toggleTaskCompletion(task.id)}
          />
        ))}
      </div>
      <button
        className="fixed bottom-6 right-6 bg-white shadow-lg rounded-full p-3"
        onClick={onCreateTask}
      >
        <PlusIcon className="h-6 w-6 text-gray-600" />
      </button>
    </div>
  )
}
