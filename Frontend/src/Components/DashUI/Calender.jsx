

import React, { useState } from 'react'
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from 'date-fns'

export function Calendar({ selectedDate, onDateSelect }) {
  const [currentMonth] = useState(new Date()) 

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const monthDays = eachDayOfInterval({
    start: monthStart,
    end: monthEnd,
  })

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  
  const generateCalendarGrid = () => {
    const firstDayOfMonth = monthStart.getDay()
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1
    const daysFromPrevMonth = adjustedFirstDay
    const daysFromNextMonth = 42 - (daysFromPrevMonth + monthDays.length)

    const prevMonthDays = eachDayOfInterval({
      start: new Date(monthStart.getFullYear(), monthStart.getMonth() - 1, 1),
      end: new Date(monthStart.getFullYear(), monthStart.getMonth(), 0),
    }).slice(-daysFromPrevMonth)

    const nextMonthDays = eachDayOfInterval({
      start: new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 1),
      end: new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, daysFromNextMonth),
    }).slice(0, daysFromNextMonth)

    return [...prevMonthDays, ...monthDays, ...nextMonthDays]
  }

  const calendarDays = generateCalendarGrid()

 return (
  <div className="p-4">
    <div className="flex justify-center items-center mb-2 space-x-2">
      <h2 className="text-sm font-medium">{format(currentMonth, 'MMMM')}</h2>
      <p className="text-xs text-gray-500">{format(currentMonth, 'yyyy')}</p>
    </div>
    <div className="grid grid-cols-7 gap-0 text-center text-xs">
      {weekDays.map((day) => (
        <div key={day} className="py-1 font-semibold">
          {day}
        </div>
      ))}
      {calendarDays.map((day, i) => {
        const isCurrentMonth = isSameMonth(day, currentMonth)
        const isSelected = isSameDay(day, selectedDate)
        const isToday = isSameDay(day, new Date())

        return (
          <button
            key={i}
            onClick={() => onDateSelect(day)}
            className={`
              py-1 rounded-md mx-0.5 text-xs
              ${!isCurrentMonth ? 'text-gray-300' : ''}
              ${isSelected ? 'bg-blue-500 text-white' : ''}
              ${isToday && !isSelected ? 'bg-green-500 text-white' : ''}
            `}
          >
            {format(day, 'd')}
          </button>
        )
      })}
    </div>
  </div>
)
}