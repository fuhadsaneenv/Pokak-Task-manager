import React from 'react';
import { BookOpenIcon } from 'lucide-react';

export function Task({ task, onToggleComplete, onOpenModal }) {
  const colorMap = {
    'light-green': 'bg-green-100',
    purple: 'bg-purple-300',
    peach: 'bg-orange-200',
    cyan: 'bg-cyan-200',
    yellow: 'bg-yellow-200',
    green: 'bg-green-400',
    teal: 'bg-teal-300',
    blue: 'bg-blue-400',
    indigo: 'bg-indigo-300',
    fuchsia: 'bg-fuchsia-400',
    pink: 'bg-pink-300',
    red: 'bg-red-500',
    gray: 'bg-gray-200',
  };

  const getBgColor = () => colorMap[task.color] || 'bg-gray-100';

  return (
    <div className={`p-4 rounded-md ${getBgColor()} flex items-center`}>
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={onToggleComplete}
        className="w-5 h-5 mr-3 cursor-pointer"
      />

      {/* Task info (clickable for modal) */}
      <div
        className="flex items-center cursor-pointer"
        onClick={onOpenModal}
      >
        <BookOpenIcon size={18} className="text-gray-500 mr-2" />
        <span className={task.completed ? 'line-through text-gray-500' : ''}>
          {task.title}
        </span>
      </div>
    </div>
  );
}
