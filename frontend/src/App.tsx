import React, { useState } from "react";
import TaskList from "./components/TaskList";
import CreateTask from "./components/CreateTask";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="w-full p-24">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Side: Create Task */}
          <div className="w-full md:w-1/2 p-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Add a Task
            </h2>
            <CreateTask setTasks={setTasks} />
          </div>

          {/* Separator - Dark Gray Line */}
          <div className="hidden md:block w-[2px] bg-gray-400"></div>

          {/* Right Side: Task List */}
          <div className="w-full md:w-1/2 p-4">
            <TaskList tasks={tasks} setTasks={setTasks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
