import React, { useState, useEffect } from "react";
import { validateTitle, validateDescription } from "../../utils/validation";
import Modal from "../ui/Modal";

interface CreateTaskProps {
  onSubmit: (task: { title: string; description: string }) => void;
  selectedTask: { title: string; description: string } | null;
}

const CreateTask: React.FC<CreateTaskProps> = ({ onSubmit, selectedTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [modalType, setModalType] = useState<"success" | "error" | null>(null);

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
    }
  }, [selectedTask]);

  const validateInputs = () => {
    const newErrors = {
      title: validateTitle(title),
      description: validateDescription(description),
    };
    setErrors(newErrors);
    return !newErrors.title && !newErrors.description;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      await onSubmit({ title, description });
      setTitle("");
      setDescription("");
      setErrors({});
      setModalMessage(
        selectedTask
          ? "Task updated successfully!"
          : "Task created successfully!"
      );
      setModalType("success");
    } catch (error) {
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
