import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

test("switching slides updates the editor", () => {
  render(<App />);

  // Find and click on Slide 2
  const slide2 = screen.getByText(/Slide 2/i);
  fireEvent.click(slide2);

  // Ensure editor reflects Slide 2 content
  const editor = screen.getByLabelText(/Edit Slide Content/i);
  expect(editor.value).toBe("");
});
