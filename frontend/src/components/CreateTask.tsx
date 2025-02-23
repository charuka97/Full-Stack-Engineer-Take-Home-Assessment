import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";

const CreateTask: React.FC<{
  setTasks: any;
  selectedTask: any;
  setSelectedTask: any;
}> = ({ setTasks, selectedTask, setSelectedTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [modalType, setModalType] = useState<"success" | "error" | null>(null);

  // Populate form with selected task data
  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
    }
  }, [selectedTask]);

  // Validate inputs
  const validateInputs = () => {
    const newErrors: { title?: string; description?: string } = {};
    if (!title.trim()) newErrors.title = "Title is required!";
    if (!description.trim()) newErrors.description = "Description is required!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      if (selectedTask) {
        // Update existing task
        const response = await axios.put(
          `http://localhost:5000/api/tasks/${selectedTask.id}`,
          { title, description }
        );
        setTasks((prevTasks: any) =>
          prevTasks.map((task: any) =>
            task.id === selectedTask.id ? response.data : task
          )
        );
        setModalMessage("Task updated successfully!");
      } else {
        // Create new task
        const response = await axios.post("http://localhost:5000/api/tasks", {
          title,
          description,
        });
        setTasks((prevTasks: any) => [response.data, ...prevTasks].slice(0, 5));
        setModalMessage("Task created successfully!");
      }
      setTitle("");
      setDescription("");
      setErrors({});
      setSelectedTask(null);
      setModalType("success");
    } catch (error) {
      console.error("Failed to create/update task:", error);
      setModalMessage("Failed to create/update task. Please try again.");
      setModalType("error");
    }
  };

  return (
    <div className="mb-6">
      {modalMessage && modalType && (
        <Modal
          message={modalMessage}
          type={modalType}
          onClose={() => setModalMessage(null)}
        />
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className={`w-full px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? "border-2 border-red-500" : ""
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Description Input */}
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className={`w-full px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.description ? "border-2 border-red-500" : ""
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-700"
          >
            {selectedTask ? "Update Task" : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
