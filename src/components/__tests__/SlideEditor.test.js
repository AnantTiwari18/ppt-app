import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SlideEditor from "../SlideEditor";

test("renders SlideEditor and updates content", () => {
  const slides = [{ id: "1", content: "Initial Content", images: [] }];
  const setSlides = jest.fn();
  const activeSlide = "1";

  render(<SlideEditor slides={slides} setSlides={setSlides} activeSlide={activeSlide} />);

  const textArea = screen.getByLabelText(/Edit Slide Content/i);
  fireEvent.change(textArea, { target: { value: "Updated Content" } });

  expect(setSlides).toHaveBeenCalled();
});
