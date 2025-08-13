import React, { useState } from 'react'
import { DashNavbar } from '../Components/DashUI/DashNavbar'
import { DashSidebar } from '../Components/DashUI/DashSidebar'
import { TaskView } from '../Components/DashUI/Taskview'


export function DashLayout() {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [selectedView, setSelectedView] = useState('Today')
  
    const handleDateSelect = (date) => {
      setSelectedDate(date)
      setSelectedView('Calendar')
    }
  
    const handleTodayClick = () => {
      setSelectedDate(new Date())
      setSelectedView('Today')
    }
  
    return (
      <>
        <DashNavbar />
        <div className="flex h-[calc(100vh-64px)] w-full bg-white">
          <DashSidebar
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            onTodayClick={handleTodayClick}
            selectedView={selectedView}
          />
          <main className="flex-1 overflow-auto">
            <TaskView selectedDate={selectedDate} viewType={selectedView} />
          </main>
        </div>
      </>
    )
  }
  