import React, { useState } from "react";
import axios from "axios";
import Modal from "./Modal";

const CreateTask: React.FC<{ setTasks: any }> = ({ setTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [modalType, setModalType] = useState<"success" | "error" | null>(null);

  const validateInputs = () => {
    const newErrors: { title?: string; description?: string } = {};
    if (!title.trim()) newErrors.title = "Title is required!";
    if (!description.trim()) newErrors.description = "Description is required!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      const response = await axios.post("http://localhost:5000/api/tasks", {
        title,
        description,
      });
      setTasks((prevTasks: any) => [response.data, ...prevTasks].slice(0, 5));
      setTitle("");
      setDescription("");
      setErrors({});
      setModalMessage("Task created successfully!");
      setModalType("success");
    } catch (error) {
      console.error("Failed to create task:", error);
      setModalMessage("Failed to create task. Please try again.");
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
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
