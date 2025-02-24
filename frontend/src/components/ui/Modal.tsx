import React from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

interface ModalProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, type, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50">
      <div
        className={`p-6 rounded-lg shadow-lg text-white w-80 flex flex-col items-center ${
          type === "success" ? "bg-green-700/90" : "bg-red-700/90"
        }`}
      >
        {/* Success or Error Icon */}
        {type === "success" ? (
          <CheckCircleIcon
            data-testid="success-icon"
            className="w-12 h-12 text-green-300"
          />
        ) : (
          <XCircleIcon
            data-testid="error-icon"
            className="w-12 h-12 text-red-300"
          />
        )}

        <p className="text-lg font-semibold text-center mt-2">{message}</p>

        {/* Centered Close Button */}
        <button
          onClick={onClose}
          className="mt-4 px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
