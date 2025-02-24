import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../../../components/ui/Modal";

describe("Modal Component", () => {
  it("renders success modal correctly", () => {
    render(
      <Modal
        message="Task created successfully"
        type="success"
        onClose={jest.fn()}
      />
    );

    expect(screen.getByText("Task created successfully")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
    expect(screen.getByTestId("success-icon")).toBeInTheDocument();
  });

  it("renders error modal correctly", () => {
    render(
      <Modal message="Failed to create task" type="error" onClose={jest.fn()} />
    );

    expect(screen.getByText("Failed to create task")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
    expect(screen.getByTestId("error-icon")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const handleClose = jest.fn();
    render(
      <Modal message="Task deleted" type="success" onClose={handleClose} />
    );

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
