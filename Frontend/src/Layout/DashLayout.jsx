
  
import React, { useState } from 'react'
import { DashNavbar } from '../Components/DashUI/DashNavbar'
import { DashSidebar } from '../Components/DashUI/DashSidebar'
import { TaskView } from '../Components/DashUI/Taskview'
import { TaskCreatePage } from '../Components/DashUI/TaskCreatePage'
export function DashLayout() {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [selectedView, setSelectedView] = useState('Today')
    const [isCreatingTask, setIsCreatingTask] = useState(false)
  
    const handleDateSelect = (date) => {
      setSelectedDate(date)
      setSelectedView('Calendar')
    }
    const handleTodayClick = () => {
      setSelectedDate(new Date())
      setSelectedView('Today')
    }
    const handleCreateTask = () => setIsCreatingTask(true)
    const handleCancelCreate = () => setIsCreatingTask(false)
    const handleSaveTask = (newTask) => {
      console.log('New task:', newTask)
      setIsCreatingTask(false)
    }
  
    return (
      <div className="h-screen scroll-none flex flex-col overflow-hidden">
        {/* Fixed Navbar */}
        <div className="sticky top-0 z-50">
          <DashNavbar />
        </div>
  
        {/* Sidebar + Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Fixed Sidebar */}
          <div className="w-[300px] h-full border-r border-gray-100 flex-shrink-0 sticky top-[64px] overflow-auto">
            <DashSidebar
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              onTodayClick={handleTodayClick}
              selectedView={selectedView}
            />
          </div>
  
          {/* Scrollable Content */}
          <main className="flex-1 overflow-auto p-4">
            {isCreatingTask ? (
              <TaskCreatePage
                onClose={handleCancelCreate}
                onSave={handleSaveTask}
              />
            ) : (
              <TaskView
                selectedDate={selectedDate}
                viewType={selectedView}
                onCreateTask={handleCreateTask}
              />
            )}
          </main>
        </div>
      </div>
    )
  }
  
