import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SCORMExport from "../SCORMExport";

test("renders export button and triggers SCORM export", () => {
  const slides = [{ id: "1", content: "Slide 1" }];
  render(<SCORMExport slides={slides} />);

  const exportButton = screen.getByText(/Export to SCORM/i);
  fireEvent.click(exportButton);

  expect(screen.getByText(/SCORM package created/i)).toBeInTheDocument();
});
