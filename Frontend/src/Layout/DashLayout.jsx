

// import React, { useEffect, useState } from 'react'
// import { DashNavbar } from '../Components/DashUI/DashNavbar'
// import { DashSidebar } from '../Components/DashUI/DashSidebar'
// import { TaskView } from '../Components/DashUI/Taskview'
// import { TaskCreatePage } from '../Components/DashUI/TaskCreatePage'

// export function DashLayout() {
//   const [selectedDate, setSelectedDate] = useState(new Date())
//   const [selectedView, setSelectedView] = useState('Today')
//   const [isCreatingTask, setIsCreatingTask] = useState(false)

//   // Tasks state
//   const [tasks, setTasks] = useState([
//     { id: 1, title: 'Read', completed: false, color: 'yellow', tag: 'Daily Routine' },
//     { id: 2, title: 'Write notes', completed: false, color: 'blue', tag: 'Study Routine' },
//   ])

//   // Lists state
//   const [lists, setLists] = useState([
//     { id: 1, name: 'Daily Routine' },
//     { id: 2, name: 'Study Routine' },
//   ])

//   useEffect(() => {
//     document.body.classList.add("no-scroll")
//     return () => {
//       document.body.classList.remove("no-scroll")
//     }
//   }, [])

//   const handleDateSelect = (date) => {
//     setSelectedDate(date)
//     setSelectedView('Calendar')
//   }

//   const handleTodayClick = () => {
//     setSelectedDate(new Date())
//     setSelectedView('Today')
//   }

//   const handleSelectView = (viewName) => {
//     setSelectedView(viewName)
//   }

//   const handleCreateTask = () => setIsCreatingTask(true)
//   const handleCancelCreate = () => setIsCreatingTask(false)

//   const handleSaveTask = (newTask) => {
//     // Add task
//     setTasks(prev => [
//       ...prev,
//       { id: Date.now(), completed: false, ...newTask }
//     ])

//     // Add tag to lists if it doesn't exist
//     if (!lists.find(list => list.name === newTask.tag)) {
//       setLists(prev => [...prev, { id: Date.now(), name: newTask.tag }])
//     }

//     setIsCreatingTask(false)
//   }

//   const toggleTaskCompletion = (id) => {
//     setTasks(prev =>
//       prev.map(task =>
//         task.id === id ? { ...task, completed: !task.completed } : task
//       )
//     )
//   }

//   // Filter tasks based on sidebar selection
//   const filteredTasks = tasks.filter(task => {
//     if (selectedView === 'Today') {
//       return true // Show all tasks for "Today"
//     } else {
//       return task.tag === selectedView
//     }
//   })

//   return (
//     <div className="h-screen scroll-none flex flex-col overflow-hidden">
//       {/* Navbar */}
//       <div className="sticky top-0 z-50">
//         <DashNavbar />
//       </div>

//       {/* Sidebar + Content */}
//       <div className="flex flex-1 overflow-hidden">
//         <div className="w-[300px] h-full border-r border-gray-100 flex-shrink-0 sticky top-[64px] overflow-auto">
//           <DashSidebar
//             selectedDate={selectedDate}
//             onDateSelect={handleDateSelect}
//             onTodayClick={handleTodayClick}
//             selectedView={selectedView}
//             lists={lists}
//             tasks={tasks}
//             onSelectView={handleSelectView} // Pass handler
//           />
//         </div>

//         <main className="flex-1 overflow-auto p-4">
//           {isCreatingTask ? (
//             <TaskCreatePage
//               onClose={handleCancelCreate}
//               onSave={handleSaveTask}
//               existingTags={lists.map(list => list.name)}
//             />
//           ) : (
//             <TaskView
//               tasks={filteredTasks} // Show filtered tasks
//               onToggleComplete={toggleTaskCompletion}
//               selectedDate={selectedDate}
//               viewType={selectedView}
//               onCreateTask={handleCreateTask}
//             />
//           )}
//         </main>
//       </div>
//     </div>
//   )
// }

import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { DashNavbar } from '../Components/DashUI/DashNavbar';
import { DashSidebar } from '../Components/DashUI/DashSidebar';
import { TaskView } from '../Components/DashUI/Taskview';
import { TaskCreatePage } from '../Components/DashUI/TaskCreatePage';

export function DashLayout() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState('Today');
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [lists, setLists] = useState([]);

  // Fetch tasks on load
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get("/tasks");
      setTasks(res.data);
      // Extract unique tags
      const uniqueTags = [...new Set(res.data.map(t => t.tag).filter(Boolean))];
      setLists(uniqueTags.map((tag, i) => ({ id: i+1, name: tag })));
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleCreateTask = () => setIsCreatingTask(true);
//   const handleCancelCreate = () => setIsCreatingTask(false);

  const handleSaveTask = async (newTask) => {
    try {
      const res = await axiosInstance.post("/tasks", newTask);
      setTasks(prev => [...prev, res.data]);

      // Add new tag if needed
      if (newTask.tag && !lists.find(list => list.name === newTask.tag)) {
        setLists(prev => [...prev, { id: Date.now(), name: newTask.tag }]);
      }

      setIsCreatingTask(false);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const toggleTaskCompletion = async (id) => {
    const task = tasks.find(t => t._id === id);
    if (!task) return;

    try {
      const res = await axiosInstance.put(`/tasks/${id}`, { completed: !task.completed });
      setTasks(prev => prev.map(t => t._id === id ? res.data : t));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleSelectView = (viewName) => setSelectedView(viewName);

  const filteredTasks = tasks.filter(task => {
    if (selectedView === 'Today') return true;
    return task.tag === selectedView;
  });

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <DashNavbar />

      <div className="flex flex-1 overflow-hidden">
        <div className="w-[300px] border-r border-gray-100 overflow-auto">
          <DashSidebar
            selectedDate={selectedDate}
            onDateSelect={(d) => setSelectedDate(d)}
            onTodayClick={() => setSelectedDate(new Date())}
            selectedView={selectedView}
            lists={lists}
            tasks={tasks}
            onSelectView={handleSelectView}
          />
        </div>

        <main className="flex-1 overflow-auto p-4">
          {isCreatingTask ? (
            <TaskCreatePage
              onSave={handleSaveTask}
              existingTags={lists.map(l => l.name)}
            />
          ) : (
            <TaskView
              tasks={filteredTasks}
              onToggleComplete={toggleTaskCompletion}
              viewType={selectedView}
              onCreateTask={handleCreateTask}
            />
          )}
        </main>
      </div>
    </div>
  );
}
