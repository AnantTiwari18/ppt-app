import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

test("exporting slides creates a SCORM package", () => {
  render(<App />);

  // Click Export to SCORM button
  const exportButton = screen.getByText(/Export to SCORM/i);
  fireEvent.click(exportButton);

  // Ensure SCORM message appears
  expect(screen.getByText(/SCORM package created/i)).toBeInTheDocument();
});
