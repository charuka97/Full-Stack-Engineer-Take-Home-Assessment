import React, { useEffect, useState } from "react";
import axios from "axios";
import { XMarkIcon, ClipboardIcon } from "@heroicons/react/24/solid";
import { Task } from "../types";
import Modal from "./Modal";
import Tooltip from "./Tooltip";

const TaskList: React.FC<{
  tasks: Task[];
  setTasks: any;
  setSelectedTask: any;
}> = ({ tasks, setTasks, setSelectedTask }) => {
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [modalType, setModalType] = useState<"success" | "error" | null>(null);

  const [hoveredTaskId, setHoveredTaskId] = useState<number | null>(null);
  const [showDeleteTooltip, setShowDeleteTooltip] = useState<boolean>(false);
  const [showEditTooltip, setShowEditTooltip] = useState<boolean>(false);

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
      console.log(filteredTasks);
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
              className="relative flex items-center justify-between p-4 bg-gray-300 rounded-lg shadow"
            >
              {/* Delete Button (X icon) */}
              <button
                onClick={() => handleDeleteTask(task.id)}
                onMouseEnter={() => {
                  setShowDeleteTooltip(true);
                  setHoveredTaskId(task.id);
                }}
                onMouseLeave={() => {
                  setShowDeleteTooltip(false);
                  setHoveredTaskId(null);
                }}
                className="absolute p-1 text-gray-600 transition duration-300 top-1 right-2 hover:text-red-600"
              >
                {showDeleteTooltip && hoveredTaskId === task.id && (
                  <Tooltip message="Delete" />
                )}
                <XMarkIcon className="w-5 h-5" />
              </button>

              {/* Edit Button (Pencil icon) */}
              <button
                onClick={() => handleEditTask(task)}
                onMouseEnter={() => {
                  setShowEditTooltip(true);
                  setHoveredTaskId(task.id);
                }}
                onMouseLeave={() => {
                  setShowEditTooltip(false);
                  setHoveredTaskId(null);
                }}
                className="absolute p-1 text-gray-600 transition duration-300 top-1 right-10 hover:text-blue-600"
              >
                {showEditTooltip && hoveredTaskId === task.id && (
                  <Tooltip message="Update" />
                )}
                <ClipboardIcon className="w-5 h-5" />
              </button>

              {/* Task Details */}
              <div>
                <h3 className="pb-4 text-lg font-bold">{task.title}</h3>
                <p className="text-sm font-bold">{task.description}</p>
              </div>

              {/* Mark as Done Button */}
              <button
                onClick={() => handleMarkAsDone(task.id)}
                className="px-10 py-1 mt-auto text-gray-900 transition duration-300 border border-gray-600 rounded hover:bg-green-400 hover:text-white"
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
