import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import NewTaskForm from "./components/NewTaskForm";
import CategoryFilter from "./components/CategoryFilter";

const API_URL = "/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Get all available categories from tasks
  const categories = ["All", ...new Set(tasks.map((task) => task.category))];

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(API_URL);
        setTasks(response.data);
        setFilteredTasks(response.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch tasks. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Filter tasks when category changes
  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(
        tasks.filter((task) => task.category === activeCategory)
      );
    }
  }, [activeCategory, tasks]);

  // Add a new task
  const addTask = async (task) => {
    try {
      const response = await axios.post(API_URL, task);
      setTasks([...tasks, response.data]);
      setIsFormOpen(false);
    } catch (err) {
      setError("Failed to add task. Please try again.");
    }
  };

  // Toggle task completion status
  const toggleTaskCompletion = async (id, currentStatus) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, {
        completed: !currentStatus,
      });

      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !currentStatus } : task
        )
      );
    } catch (err) {
      setError("Failed to update task status. Please try again.");
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      setError("Failed to delete task. Please try again.");
    }
  };

  // Get completion statistics
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header
        completedTasks={completedTasks}
        totalTasks={totalTasks}
        completionPercentage={completionPercentage}
      />

      <main className="container mx-auto px-4 py-8">
        {error && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
            role="alert"
          >
            <p>{error}</p>
            <button
              className="text-red-700 font-bold ml-2"
              onClick={() => setError(null)}
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => setIsFormOpen(true)}
          >
            Add New Task
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="spinner border-t-4 border-indigo-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            toggleTaskCompletion={toggleTaskCompletion}
            deleteTask={deleteTask}
          />
        )}
      </main>

      {isFormOpen && (
        <NewTaskForm
          addTask={addTask}
          categories={categories.filter((cat) => cat !== "All")}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
