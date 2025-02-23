import React, { useEffect } from "react";
import axios from "axios";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Task } from "../types";

const TaskList: React.FC<{ tasks: Task[]; setTasks: any }> = ({
  tasks,
  setTasks,
}) => {
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      const filteredTasks = response.data.filter(
        (task: Task) => !task.completed
      );
      setTasks(filteredTasks.slice(-5));
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleMarkAsDone = async (id: number) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}/done`);
      setTasks((prevTasks: any) =>
        prevTasks.filter((task: Task) => task.id !== id)
      );
    } catch (error) {
      console.error("Error marking task as done:", error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks((prevTasks: any) =>
        prevTasks.filter((task: Task) => task.id !== id)
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <ul className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks available</p>
        ) : (
          tasks.map((task) => (
            <li
              key={task.id}
              className="p-4 bg-gray-300 shadow rounded-lg flex justify-between items-center relative"
            >
              {/* Delete Button (X icon) */}
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="absolute top-1 right-1 p-1 text-gray-600 hover:text-red-600 transition duration-300"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>

              {/* Task Details */}
              <div>
                <h3 className="text-lg font-bold py-2">{task.title}</h3>
                <p className="font-bold text-sm">{task.description}</p>
              </div>

              {/* Mark as Done Button */}
              <button
                onClick={() => handleMarkAsDone(task.id)}
                className="mt-auto px-10 py-1 border border-gray-600 text-gray-900 rounded transition duration-300 hover:bg-green-400 hover:text-white"
              >
                Done
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TaskList;
