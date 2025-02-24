import { render, screen } from "@testing-library/react";
import Tooltip from "../../../components/ui/Tooltip";

describe("Tooltip Component", () => {
  it("renders the tooltip with the correct message", () => {
    render(<Tooltip message="Tooltip message" />);

    expect(screen.getByText("Tooltip message")).toBeInTheDocument();
  });
});
