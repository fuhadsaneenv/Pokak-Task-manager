
import React, { useState } from 'react'
import { CheckIcon } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function TaskCreatePage({ onSave, existingTags = [] }) {
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [selectedColor, setSelectedColor] = useState('green')
  const [repeatOption, setRepeatOption] = useState('daily')
  const [selectedTag, setSelectedTag] = useState(existingTags[0] || '')
  const [tags, setTags] = useState(existingTags)
  const [showNewTagInput, setShowNewTagInput] = useState(false)
  const [newTagName, setNewTagName] = useState('')

  const colors = [
    { name: 'light-green', class: 'bg-green-100' },
    { name: 'purple', class: 'bg-purple-300' },
    { name: 'peach', class: 'bg-orange-200' },
    { name: 'cyan', class: 'bg-cyan-200' },
    { name: 'yellow', class: 'bg-yellow-200' },
    { name: 'green', class: 'bg-green-400' },
    { name: 'teal', class: 'bg-teal-300' },
    { name: 'blue', class: 'bg-blue-400' },
    { name: 'indigo', class: 'bg-indigo-300' },
    { name: 'fuchsia', class: 'bg-fuchsia-400' },
    { name: 'pink', class: 'bg-pink-300' },
    { name: 'red', class: 'bg-red-500' },
    { name: 'gray', class: 'bg-gray-200' },
  ]

  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const handleSave = () => {
    if (!taskName.trim()) {
      toast.error('Task name cannot be empty!')
      return
    }
    toast.success('Task created successfully!')

    onSave({
      title: taskName,
      description: taskDescription,
      color: selectedColor,
      repeat: repeatOption,
      tag: selectedTag,
      completed: false,
    })
    
    
    // Reset form
    setTaskName('')
    setTaskDescription('')
    setSelectedColor('green')
    setRepeatOption('daily')
    setSelectedTag(tags[0] || '')
}

  const handleAddNewTag = () => {
    const trimmed = newTagName.trim()
    if (!trimmed) return
    if (!tags.includes(trimmed)) setTags([...tags, trimmed])
    setSelectedTag(trimmed)
    setNewTagName('')
    setShowNewTagInput(false)
    toast.success(`Tag "${trimmed}" added!`)
  }

  return (
    <div className="relative w-full h-screen max-w-5xl mx-auto bg-white p-6 pb-20">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-xl font-bold">New Task</h1>
        <img src="/Smile.png" alt="Logo" className="w-6 h-8 object-contain" />
      </div>

      <div className="space-y-6">
        {/* Name + Description */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name your new task"
            className="w-full px-3 py-1.5 text-lg border-b border-gray-200 bg-gray-100 focus:outline-none focus:border-gray-400"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <textarea
            placeholder="Describe your new task"
            className="w-full px-3 py-1.5 border-b border-gray-200 bg-gray-100 focus:outline-none focus:border-gray-400 resize-none h-10"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </div>

        {/* Color Picker */}
        <div className="space-y-3">
          <h2 className="text-base font-bold text-gray-700">Card Color</h2>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color.name}
                className={`w-8 h-8 rounded-full ${color.class} ${
                  selectedColor === color.name
                    ? 'ring-2 ring-offset-2 ring-blue-500'
                    : ''
                }`}
                onClick={() => setSelectedColor(color.name)}
              />
            ))}
          </div>
        </div>

        {/* Repeat + Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Repeat Card */}
          <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-base font-semibold text-gray-700">Repeat</h2>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-gray-600 transition-colors">
                  <span className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-6"></span>
                </div>
              </label>
            </div>

            <p className="text-sm text-gray-500 mb-4">Set a cycle for your task</p>

            <div className="flex space-x-0 mb-4 bg-gray-100 rounded-full p-1 w-fit">
              {['Daily', 'Weekly', 'Monthly'].map((option) => (
                <button
                  key={option}
                  className={`px-6 py-2 text-sm rounded-full transition-all duration-300 ${
                    repeatOption === option.toLowerCase()
                      ? 'bg-white shadow font-medium text-gray-800'
                      : 'bg-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setRepeatOption(option.toLowerCase())}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              {weekdays.map((day, index) => (
                <button
                  key={day}
                  className={`w-10 h-10 text-sm flex items-center justify-center rounded-full transition-colors ${
                    index >= 5
                      ? 'bg-gray-200 font-medium'
                      : 'bg-white border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center text-sm text-gray-500 border-t pt-3">
              <span>Repeat</span>
              <span className="cursor-pointer hover:underline">Every week &gt;</span>
            </div>
          </div>

          {/* Tags Card */}
          <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-700 mb-3">
              Set a tag for your task
            </h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  className={`px-4 py-2 text-sm rounded-full transition-colors ${
                    selectedTag === tag
                      ? 'bg-gray-200 font-medium'
                      : 'bg-white border border-gray-200 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </button>
              ))}

              {!showNewTagInput && (
                <button
                  className="px-4 py-2 text-sm rounded-full bg-white border border-gray-200 hover:bg-gray-100"
                  onClick={() => setShowNewTagInput(true)}
                >
                  Add More +
                </button>
              )}

              {showNewTagInput && (
                <input
                  type="text"
                  value={newTagName}
                  autoFocus
                  onChange={(e) => setNewTagName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddNewTag()}
                  placeholder="New tag"
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring focus:ring-blue-200"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Save Button */}
      <button
        onClick={handleSave}
        className="fixed bottom-6 right-6 bg-white text-black rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
      >
        <CheckIcon size={22} />
      </button>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  )
}
