// import React from 'react'
// import { BookOpenIcon } from 'lucide-react'

// export function Task({ task, onToggleComplete }) {
//   const colorMap = {
//     'light-green': 'bg-green-100',
//     purple: 'bg-purple-300',
//     peach: 'bg-orange-200',
//     cyan: 'bg-cyan-200',
//     yellow: 'bg-yellow-200',
//     green: 'bg-green-400',
//     teal: 'bg-teal-300',
//     blue: 'bg-blue-400',
//     indigo: 'bg-indigo-300',
//     fuchsia: 'bg-fuchsia-400',
//     pink: 'bg-pink-300',
//     red: 'bg-red-500',
//     gray: 'bg-gray-200',
//   }

//   const getBgColor = () => colorMap[task.color] || 'bg-gray-100'

//   return (
//     <div className={`p-4 rounded-md ${getBgColor()} overflow-auto`}>
//       <div className="flex items-center">
//         <label className="flex items-center cursor-pointer">
//           <input
//             type="checkbox"
//             checked={task.completed}
//             onChange={onToggleComplete}
//             className="sr-only"
//           />
//           <div
//             className={`w-5 h-5 border rounded mr-3 flex items-center justify-center ${
//               task.completed
//                 ? 'bg-blue-500 border-blue-500'
//                 : 'border-gray-300'
//             }`}
//           >
//             {task.completed && (
//               <svg
//                 className="w-3 h-3 text-white"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//             )}
//           </div>
//         </label>
//         <div className="flex items-center ml-1">
//           <BookOpenIcon size={18} className="text-gray-500 mr-2" />
//           <span className={task.completed ? 'line-through text-gray-500' : ''}>
//             {task.title}
//           </span>
//         </div>
//       </div>
//     </div>
//   )
// }

import React from 'react'
import { BookOpenIcon } from 'lucide-react'

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
  }

  const getBgColor = () => colorMap[task.color] || 'bg-gray-100'

  return (
    <div className={`p-4 rounded-md ${getBgColor()} overflow-auto flex items-center`}>
      {/* Checkbox */}
      <label className="flex items-center cursor-pointer mr-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => {
            e.stopPropagation() // prevent modal
            onToggleComplete()
          }}
          className="sr-only"
        />
        <div
          className={`w-5 h-5 border rounded flex items-center justify-center ${
            task.completed ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
          }`}
        >
          {task.completed && (
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </label>

      {/* Task info (clickable for modal) */}
      <div
        className="flex items-center cursor-pointer"
        onClick={onOpenModal} // only this opens modal
      >
        <BookOpenIcon size={18} className="text-gray-500 mr-2" />
        <span className={task.completed ? 'line-through text-gray-500' : ''}>
          {task.title}
        </span>
      </div>
    </div>
  )
}
