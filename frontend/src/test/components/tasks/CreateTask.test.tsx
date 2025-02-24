import { render, screen, fireEvent } from "@testing-library/react";
import CreateTask from "../../../components/task/CreateTask";

describe("CreateTask Component", () => {
  it("renders input fields correctly", () => {
    render(<CreateTask onSubmit={jest.fn()} selectedTask={null} />);

    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
  });

  it("validates empty input fields", async () => {
    render(<CreateTask onSubmit={jest.fn()} selectedTask={null} />);

    fireEvent.click(screen.getByText("Add Task"));

    expect(screen.getByText("Title is required!")).toBeInTheDocument();
    expect(screen.getByText("Description is required!")).toBeInTheDocument();
  });

  it("calls onSubmit with correct values", async () => {
    const mockSubmit = jest.fn();
    render(<CreateTask onSubmit={mockSubmit} selectedTask={null} />);

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "New Task" },
    });
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Task Description" },
    });
    fireEvent.click(screen.getByText("Add Task"));

    expect(mockSubmit).toHaveBeenCalledWith({
      title: "New Task",
      description: "Task Description",
    });
  });
});
