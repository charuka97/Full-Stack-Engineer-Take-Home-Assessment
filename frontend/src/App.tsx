import React, { useState } from "react";
import TaskList from "./components/TaskList";
import CreateTask from "./components/CreateTask";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="w-full p-24">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Side: Create/Update Task */}
          <div className="w-full md:w-1/2 p-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {selectedTask ? "Update a Task" : "Add a Task"}
            </h2>
            <CreateTask
              setTasks={setTasks}
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
            />
          </div>

          {/* Separator - Dark Gray Line */}
          <div className="hidden md:block w-[2px] bg-gray-400"></div>

          {/* Right Side: Task List */}
          <div className="w-full md:w-1/2 p-4">
            <TaskList
              tasks={tasks}
              setTasks={setTasks}
              setSelectedTask={setSelectedTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
