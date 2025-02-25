import { generateSCORM } from "../scorm";

test("generates SCORM package correctly", () => {
  const slides = [{ id: "1", content: "Slide 1" }];
  const scormPackage = generateSCORM(slides);

  expect(scormPackage).toContain("<manifest>");
  expect(scormPackage).toContain("Slide 1");
});
