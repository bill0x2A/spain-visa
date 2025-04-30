import React from "react";
import { FaCheckCircle, FaTrash } from "react-icons/fa";

const TaskList = ({ tasks, toggleTaskCompletion, deleteTask }) => {
  // Group tasks by category
  const tasksByCategory = tasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {});

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No tasks found in this category.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {Object.entries(tasksByCategory).map(([category, categoryTasks]) => (
        <div key={category} className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryTasks.map((task) => (
              <div
                key={task.id}
                className={`task-card ${
                  task.completed ? "task-completed" : ""
                }`}
              >
                <div className="flex justify-between">
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full category-${task.category
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {task.category}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        toggleTaskCompletion(task.id, task.completed)
                      }
                      className={`text-lg ${
                        task.completed
                          ? "text-green-500"
                          : "text-gray-300 hover:text-green-500"
                      }`}
                      aria-label={
                        task.completed
                          ? "Mark as incomplete"
                          : "Mark as complete"
                      }
                    >
                      <FaCheckCircle />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-gray-300 hover:text-red-500 text-lg"
                      aria-label="Delete task"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                <h3 className="font-medium text-lg mt-2">{task.title}</h3>

                {task.description && (
                  <p className="text-gray-600 text-sm mt-2">
                    {task.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
