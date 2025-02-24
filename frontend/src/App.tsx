import React from "react";
import { useTasks } from "./hooks/useTasks";
import CreateTask from "./components/task/CreateTask";
import TaskList from "./components/task/TaskList";
import Modal from "./components/ui/Modal";

const App: React.FC = () => {
  const {
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
  } = useTasks();

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="w-full p-24">
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
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 p-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {selectedTask ? "Update a Task" : "Add a Task"}
            </h2>
            <CreateTask
              onSubmit={handleCreateOrUpdateTask}
              selectedTask={selectedTask}
            />
          </div>
          <div className="hidden md:block w-[2px] bg-gray-400"></div>
          <div className="w-full md:w-1/2 p-4">
            <TaskList
              tasks={tasks}
              onEditTask={setSelectedTask}
              onDeleteTask={handleDeleteTask}
              onMarkAsDone={handleMarkAsDone}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
