import JSZip from "jszip";
import { saveAs } from "file-saver";

export const generateSCORMPackage = (slides) => {
  const zip = new JSZip();

  // Generate imsmanifest.xml (SCORM metadata)
  zip.file("imsmanifest.xml", generateManifestXML(slides));

  // Generate HTML files for each slide
  slides.forEach((slide, index) => {
    zip.file(`slide${index + 1}.html`, generateSlideHTML(slide));
  });

  // Create the SCORM package as a ZIP file
  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(content, "SCORM_Presentation.zip");
  });
};

// Generate SCORM manifest file (imsmanifest.xml)
const generateManifestXML = (slides) => `
  <?xml version="1.0" encoding="UTF-8"?>
  <manifest identifier="SCORM_Presentation" version="1.2">
    <metadata>
      <schema>ADL SCORM</schema>
      <schemaversion>1.2</schemaversion>
      <title>SCORM Presentation</title>
      <description>Generated SCORM package</description>
    </metadata>
    <organizations default="org1">
      <organization identifier="org1">
        <title>SCORM Presentation</title>
        ${slides.map((_, i) => `<item identifier="slide${i + 1}" identifierref="res${i + 1}">
          <title>Slide ${i + 1}</title>
        </item>`).join("\n")}
      </organization>
    </organizations>
    <resources>
      ${slides.map((_, i) => `<resource identifier="res${i + 1}" type="webcontent" href="slide${i + 1}.html">
        <file href="slide${i + 1}.html"/>
      </resource>`).join("\n")}
    </resources>
  </manifest>
`;

// Generate HTML content for each slide
const generateSlideHTML = (slide) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Slide</title>
  </head>
  <body>
    <h1>Slide Content</h1>
    <p>${slide.content}</p>
    ${slide.images.map((img) => `<img src="${img}" alt="Slide Image" style="max-width:100%;">`).join("\n")}
  </body>
  </html>
`;

