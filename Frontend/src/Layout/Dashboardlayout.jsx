import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { DashNavbar } from '../Components/DashUI/DashNavbar';
import { DashSidebar } from '../Components/DashUI/DashSidebar';
import { Taskview } from '../Components/DashUI/Tasksview';
import { TaskCreatePage } from '../Components/DashUI/TaskCreatePage';

export function DashLayout() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState('Today');
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [lists, setLists] = useState([]);

  // ✅ Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get("/api/tasks");

      // Sort newest first
      const sorted = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setTasks(sorted);

      // Extract unique tags for sidebar lists
      const uniqueTags = [...new Set(sorted.map(t => t.tag).filter(Boolean))];
      setLists(uniqueTags.map((tag, i) => ({ id: i + 1, name: tag })));

    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ Save new task and refresh list
  const handleSaveTask = async (newTask) => {
    try {
      await axiosInstance.post("/api/tasks", newTask);
      await fetchTasks(); // Refresh from backend after creation
      setIsCreatingTask(false);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // ✅ Filter tasks by selected view
  const filteredTasks = tasks.filter(task =>
    selectedView === 'Today' ? true : task.tag === selectedView
  );

  return (
    <div className="flex flex-col h-screen">
      <DashNavbar
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onCreateTask={() => setIsCreatingTask(true)}
      />

      <div className="flex flex-1">
        <DashSidebar
          lists={lists}
          selectedView={selectedView}
          onViewChange={setSelectedView}
        />

        <main className="flex-1 p-4 overflow-auto">
          {isCreatingTask ? (
            <TaskCreatePage
              onSave={handleSaveTask}
              existingTags={lists.map(l => l.name)}
            />
          ) : (
            <Taskview tasks={filteredTasks} />
          )}
        </main>
      </div>
    </div>
  );
}


// import React, { useEffect, useState } from 'react';
// import axiosInstance from '../axiosInstance';
// import { DashNavbar } from '../Components/DashUI/DashNavbar';
// import { DashSidebar } from '../Components/DashUI/DashSidebar';
// import { Taskview } from '../Components/DashUI/Tasksview';
// import { TaskCreatePage } from '../Components/DashUI/TaskCreatePage';

//  export function DashLayout() {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [selectedView, setSelectedView] = useState('Today');
//   const [isCreatingTask, setIsCreatingTask] = useState(false);
//   const [tasks, setTasks] = useState([]);
//   const [lists, setLists] = useState([]);

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const res = await axiosInstance.get("/api/tasks");
//       setTasks(res.data);

//       const uniqueTags = [...new Set(res.data.map(t => t.tag).filter(Boolean))];
//       setLists(uniqueTags.map((tag, i) => ({ id: i + 1, name: tag })));
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

//   const handleCreateTask = () => setIsCreatingTask(true);

//   const handleSaveTask = async (newTask) => {
//     try {
//       const res = await axiosInstance.post("/api/tasks", newTask);
//       setTasks(prev => [...prev, res.data]);

//       if (newTask.tag && !lists.find(list => list.name === newTask.tag)) {
//         setLists(prev => [...prev, { id: Date.now(), name: newTask.tag }]);
//       }

//       setIsCreatingTask(false);
//     } catch (error) {
//       console.error("Error creating task:", error);
//     }
//   };

//   const toggleTaskCompletion = async (id) => {
//     const task = tasks.find(t => t._id === id);
//     if (!task) return;

//     try {
//       const res = await axiosInstance.put(`/api/tasks/${id}`, { completed: !task.completed });
//       setTasks(prev => prev.map(t => t._id === id ? res.data : t));
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   const handleSelectView = (viewName) => setSelectedView(viewName);

//   const filteredTasks = tasks.filter(task => selectedView === 'Today' ? true : task.tag === selectedView);

//   return (
//     <div className="h-screen flex flex-col overflow-hidden">
//       <DashNavbar />

//       <div className="flex flex-1 overflow-hidden">
//         <div className="w-[300px] border-r border-gray-100 overflow-auto">
//           <DashSidebar
//             selectedDate={selectedDate}
//             onDateSelect={setSelectedDate}
//             onTodayClick={() => setSelectedDate(new Date())}
//             selectedView={selectedView}
//             lists={lists}
//             tasks={tasks}
//             onSelectView={handleSelectView}
//           />
//         </div>

//         <main className="flex-1 overflow-auto p-4">
//           {isCreatingTask ? (
//             <TaskCreatePage
//               onSave={handleSaveTask}
//               existingTags={lists.map(l => l.name)}
//             />
//           ) : (
//             <Taskview
//               tasks={filteredTasks}
//               onToggleComplete={toggleTaskCompletion}
//               viewType={selectedView}
//               onCreateTask={handleCreateTask}
//             />
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

