import { saveSlides, loadSlides } from "../localStorage";

test("saves and loads slides from local storage", () => {
  const mockSlides = [{ id: "1", content: "Test Slide" }];
  saveSlides(mockSlides);

  expect(loadSlides()).toEqual(mockSlides);
});
