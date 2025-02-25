import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SlideList from "../SlideList";

test("renders slides and selects a slide", () => {
  const slides = [
    { id: "1", content: "Slide 1" },
    { id: "2", content: "Slide 2" },
  ];
  const setActiveSlide = jest.fn();
  const deleteSlide = jest.fn();

  render(<SlideList slides={slides} activeSlide={"1"} setActiveSlide={setActiveSlide} deleteSlide={deleteSlide} />);

  const firstSlide = screen.getByText(/Slide 1/i);
  fireEvent.click(firstSlide);

  expect(setActiveSlide).toHaveBeenCalledWith("1");
});

test("deletes a slide", () => {
  const slides = [{ id: "1", content: "Slide 1" }];
  const setActiveSlide = jest.fn();
  const deleteSlide = jest.fn();

  render(<SlideList slides={slides} activeSlide={"1"} setActiveSlide={setActiveSlide} deleteSlide={deleteSlide} />);

  const deleteButton = screen.getByLabelText("delete");
  fireEvent.click(deleteButton);

  expect(deleteSlide).toHaveBeenCalled();
});
