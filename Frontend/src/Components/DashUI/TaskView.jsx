

import React, { useState } from 'react'
import { Task } from './Task'
import { PlusIcon } from 'lucide-react'

export function TaskView({ tasks, onToggleComplete, viewType, onCreateTask }) {
  const [selectedTask, setSelectedTask] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = (task) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedTask(null)
  }

  return (
    <div className="p-6 relative">
      <h1 className="text-2xl font-semibold mb-4">{viewType}</h1>

      <div className="space-y-2">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onToggleComplete={() => onToggleComplete(task.id)}
            onOpenModal={() => handleOpenModal(task)} // only this opens modal
          />
        ))}
      </div>

      {/* Floating Add Button */}
      <button
        className="fixed bottom-6 right-6 bg-white shadow-lg rounded-full p-3"
        onClick={onCreateTask}
      >
        <PlusIcon className="h-6 w-6 text-gray-600" />
      </button>

      {/* Modal */}
      {isModalOpen && selectedTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
            <h2 className="text-xl font-bold mb-2">{selectedTask.title}</h2>
            <p className="text-gray-600">
              {selectedTask.description || 'No description available.'}
            </p>

            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
