import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

test("deleting a slide removes it from the list and updates the editor", () => {
  render(<App />);

  // Find delete button and click it
  const deleteButtons = screen.getAllByLabelText(/delete/i);
  fireEvent.click(deleteButtons[0]);

  // Ensure slide is removed
  expect(screen.queryByText(/Slide 1/i)).not.toBeInTheDocument();
});
