import React, { useState } from "react";
import { XMarkIcon, ClipboardIcon } from "@heroicons/react/24/solid";
import { Task } from "../../types";
import Modal from "../ui/Modal";
import Tooltip from "../ui/Tooltip";

interface TaskListProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: number) => void;
  onMarkAsDone: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEditTask,
  onDeleteTask,
  onMarkAsDone,
}) => {
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [modalType, setModalType] = useState<"success" | "error" | null>(null);
  const [hoveredTaskId, setHoveredTaskId] = useState<number | null>(null);
  const [showDeleteTooltip, setShowDeleteTooltip] = useState<boolean>(false);
  const [showEditTooltip, setShowEditTooltip] = useState<boolean>(false);

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
              <button
                onClick={() => onDeleteTask(task.id)}
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
              <button
                onClick={() => onEditTask(task)}
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
              <div>
                <h3 className="pb-4 text-lg font-bold">{task.title}</h3>
                <p className="text-sm font-bold">{task.description}</p>
              </div>
              <button
                onClick={() => onMarkAsDone(task.id)}
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
