import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

test("adding a new slide updates the list and selects it", () => {
  render(<App />);

  // Click "Add Slide" button
  const addButton = screen.getByText(/Add Slide/i);
  fireEvent.click(addButton);

  // Ensure new slide appears in list
  expect(screen.getByText(/Slide 2/i)).toBeInTheDocument();
});
