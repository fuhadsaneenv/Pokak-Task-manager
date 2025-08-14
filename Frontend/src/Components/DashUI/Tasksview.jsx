import React, { useState } from "react";
import { Task } from "./Task";
import { PlusIcon } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Taskview({ tasks, onToggleComplete, viewType, onCreateTask }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
    toast.info(`Opened task: "${task.title}"`);
  };

  const closeModal = () => {
    if (selectedTask) toast.info(`Closed task: "${selectedTask.title}"`);
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleToggleComplete = (taskId) => {
    onToggleComplete(taskId);
    const task = tasks.find((t) => t._id === taskId);
    if (task) {
      toast.success(
        `Task "${task.title}" marked as ${task.completed ? "incomplete" : "complete"}`
      );
    }
  };

  const handleCreateTask = () => {
    onCreateTask();
    toast.success("Opening task creation modal!");
  };

  return (
    <div className="p-4 sm:p-6 relative w-full min-h-screen">
      <h1 className="text-xl sm:text-2xl font-semibold mb-4">{viewType}</h1>

      <div className="space-y-2">
        {tasks.map((task) => (
          <Task
            key={task._id}
            task={task}
            onToggleComplete={() => handleToggleComplete(task._id)}
            onOpenModal={() => handleOpenModal(task)}
          />
        ))}
      </div>

      {/* Create Task Button */}
      <button
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 bg-white shadow-lg rounded-full p-3 flex items-center justify-center hover:scale-105 transition-transform"
        onClick={handleCreateTask}
      >
        <PlusIcon className="h-6 w-6 text-gray-600" />
      </button>

      {/* Task Modal */}
      {isModalOpen && selectedTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 sm:p-6">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <h2 className="text-lg sm:text-xl font-bold mb-2">{selectedTask.title}</h2>
            <p className="text-gray-600 mb-4">
              {selectedTask.description || "No description available."}
            </p>

            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg sm:text-xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
}

