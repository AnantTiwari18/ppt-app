import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

test("text formatting buttons apply styles", () => {
  render(<App />);

  // Find Bold button and click it
  const boldButton = screen.getByText("B");
  fireEvent.click(boldButton);

  // Ensure bold style is applied
  const editor = screen.getByLabelText(/Edit Slide Content/i);
  expect(editor.style.fontWeight).toBe("900");
});
