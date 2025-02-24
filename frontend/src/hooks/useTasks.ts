import { useState, useEffect } from "react";
import { Task } from "../types";
import {
  fetchTasks,
  createTask,
  updateTask,
  markTaskAsDone,
  deleteTask,
} from "../api/taskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [modalType, setModalType] = useState<"success" | "error" | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks.filter((task) => !task.completed).slice(-5));
    };
    loadTasks();
  }, []);

  const handleCreateOrUpdateTask = async (task: {
    title: string;
    description: string;
  }) => {
    if (selectedTask) {
      const updatedTask = await updateTask(selectedTask.id, task);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === selectedTask.id ? updatedTask : t))
      );
    } else {
      const newTask = await createTask(task);
      setTasks((prevTasks) => [newTask, ...prevTasks].slice(0, 5));
    }
    setSelectedTask(null);
  };

  const handleMarkAsDone = async (id: number) => {
    try {
      await markTaskAsDone(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

      setModalMessage("Task mark as done successfully!");
      setModalType("success");
    } catch (error) {
      setModalMessage("Failed to mark as done task. Please try again.");
      setModalType("error");
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

      setModalMessage("Task deleted successfully!");
      setModalType("success");
    } catch (error) {
      setModalMessage("Failed to delete task. Please try again.");
      setModalType("error");
    }
  };

  return {
    tasks,
    selectedTask,
    setSelectedTask,
    handleCreateOrUpdateTask,
    handleMarkAsDone,
    handleDeleteTask,
    modalMessage,
    modalType,
    setModalMessage,
    setModalType,
  };
};
