import React, { useEffect, useState } from "react";
import axios from "axios";
import { XMarkIcon, ClipboardIcon } from "@heroicons/react/24/solid";
import { Task } from "../types";
import Modal from "./Modal"; // Import Modal component
import Tooltip from "./Tooltip";

const TaskList: React.FC<{
  tasks: Task[];
  setTasks: any;
  setSelectedTask: any;
}> = ({ tasks, setTasks, setSelectedTask }) => {
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [modalType, setModalType] = useState<"success" | "error" | null>(null);

  const [showTooltip, setShowTooltip] = useState<{
    edit: boolean;
    delete: boolean;
  }>({
    edit: false,
    delete: false,
  });

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch tasks from the backend
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

  // Mark a task as done
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

  // Delete a task
  const handleDeleteTask = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks((prevTasks: any) =>
        prevTasks.filter((task: Task) => task.id !== id)
      );
      setModalMessage("Task deleted successfully!");
      setModalType("success");
    } catch (error) {
      console.error("Error deleting task:", error);
      setModalMessage("Failed to delete task.");
      setModalType("error");
    }
  };

  // Edit a task
  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
  };

  return (
    <div>
      {modalMessage && modalType && (
        <Modal
          message={modalMessage}
          type={modalType}
          onClose={() => {
            setModalMessage(null);
            setModalType(null);
          }}
        />
      )}
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
                onMouseEnter={() =>
                  setShowTooltip((prev) => ({ ...prev, delete: true }))
                }
                onMouseLeave={() =>
                  setShowTooltip((prev) => ({ ...prev, delete: false }))
                }
                className="absolute top-1 right-2 p-1 text-gray-600 hover:text-red-600 transition duration-300"
              >
                {showTooltip.delete && <Tooltip message="Delete" />}
                <XMarkIcon className="h-5 w-5" />
              </button>

              {/* Edit Button (Pencil icon) */}
              <button
                onClick={() => handleEditTask(task)}
                onMouseEnter={() =>
                  setShowTooltip((prev) => ({ ...prev, edit: true }))
                }
                onMouseLeave={() =>
                  setShowTooltip((prev) => ({ ...prev, edit: false }))
                }
                className="absolute top-1 right-10 p-1 text-gray-600 hover:text-blue-600 transition duration-300"
              >
                {showTooltip.edit && <Tooltip message="Update" />}
                <ClipboardIcon className="h-5 w-5" />
              </button>

              {/* Task Details */}
              <div>
                <h3 className="text-lg font-bold pb-4">{task.title}</h3>
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
