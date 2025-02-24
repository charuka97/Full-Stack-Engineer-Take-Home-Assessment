// src/test/components/TaskList.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import TaskList from "../../../components/task/TaskList";
import { Task } from "../../../types";

const mockTasks: Task[] = [
  { id: 1, title: "Task 1", description: "Desc 1", completed: false },
  { id: 2, title: "Task 2", description: "Desc 2", completed: false },
];

describe("TaskList Component", () => {
  it("renders tasks correctly", () => {
    render(
      <TaskList
        tasks={mockTasks}
        onEditTask={jest.fn()}
        onDeleteTask={jest.fn()}
        onMarkAsDone={jest.fn()}
      />
    );

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  it("calls onDeleteTask when delete button is clicked", () => {
    const mockDelete = jest.fn();
    render(
      <TaskList
        tasks={mockTasks}
        onEditTask={jest.fn()}
        onDeleteTask={mockDelete}
        onMarkAsDone={jest.fn()}
      />
    );

    fireEvent.click(screen.getAllByTestId("delete-button")[0]);

    expect(mockDelete).toHaveBeenCalledWith(1);
  });

  it("calls onMarkAsDone when 'Done' button is clicked", () => {
    const mockMarkAsDone = jest.fn();
    render(
      <TaskList
        tasks={mockTasks}
        onEditTask={jest.fn()}
        onDeleteTask={jest.fn()}
        onMarkAsDone={mockMarkAsDone}
      />
    );

    fireEvent.click(screen.getAllByText("Done")[0]);

    expect(mockMarkAsDone).toHaveBeenCalledWith(1);
  });
});
