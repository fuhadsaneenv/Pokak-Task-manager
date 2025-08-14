import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { DashNavbar } from "../Components/DashUI/DashNavbar";
import { DashSidebar } from "../Components/DashUI/DashSidebar";
import { Taskview } from "../Components/DashUI/Tasksview";
import { TaskCreatePage } from "../Components/DashUI/TaskCreatePage";

export function DashLayout() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState("Today");
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [lists, setLists] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false); 

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get("/api/tasks");
      setTasks(res.data);

      const uniqueTags = [
        ...new Set(res.data.map((t) => t.tag).filter(Boolean)),
      ];
      setLists(uniqueTags.map((tag, i) => ({ id: i + 1, name: tag })));
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleCreateTask = () => setIsCreatingTask(true);

  const handleSaveTask = async (newTask) => {
    try {
      const res = await axiosInstance.post("/api/tasks", newTask);
      setTasks((prev) => [...prev, res.data]);

      if (newTask.tag && !lists.find((list) => list.name === newTask.tag)) {
        setLists((prev) => [...prev, { id: Date.now(), name: newTask.tag }]);
      }

      setIsCreatingTask(false);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const toggleTaskCompletion = async (id) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) return;

    try {
      const res = await axiosInstance.put(`/api/tasks/${id}`, {
        completed: !task.completed,
      });
      setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleSelectView = (viewName) => setSelectedView(viewName);

  const filteredTasks = tasks.filter((task) =>
    selectedView === "Today" ? true : task.tag === selectedView
  );

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <DashNavbar />

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden md:flex md:w-[300px] border-r border-gray-100 overflow-auto">
          <DashSidebar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            onTodayClick={() => setSelectedDate(new Date())}
            selectedView={selectedView}
            lists={lists}
            tasks={tasks}
            onSelectView={handleSelectView}
          />
        </div>

        <div className={`fixed inset-0 z-50 bg-black/50 transition-opacity md:hidden ${sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setSidebarOpen(false)}></div>
        <div className={`fixed top-0 left-0 h-full z-50 w-64 bg-white border-r border-gray-100 transform transition-transform md:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <DashSidebar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            onTodayClick={() => setSelectedDate(new Date())}
            selectedView={selectedView}
            lists={lists}
            tasks={tasks}
            onSelectView={(view) => {
              handleSelectView(view);
              setSidebarOpen(false);
            }}
          />
        </div>

        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <button
            className="md:hidden mb-4 bg-gray-100 p-2 rounded-md"
            onClick={() => setSidebarOpen(true)}
          >
            ☰ Menu
          </button>

          {isCreatingTask ? (
            <TaskCreatePage
              onSave={handleSaveTask}
              existingTags={lists.map((l) => l.name)}
            />
          ) : (
            <Taskview
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

