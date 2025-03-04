import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";

const SlideEditor = ({ slides, setSlides, activeSlide }) => {
  const [textStyle, setTextStyle] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  const slideIndex = slides.findIndex((s) => s.id === activeSlide);
  if (slideIndex === -1) return <p>No slide selected</p>;

  const updateContent = (event) => {
    const updatedSlides = [...slides];
    updatedSlides[slideIndex].content = event.target.value;
    setSlides(updatedSlides);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const updatedSlides = [...slides];
      updatedSlides[slideIndex].images = [...(updatedSlides[slideIndex].images || []), imageUrl];
      setSlides(updatedSlides);
    }
  };

  const toggleStyle = (style) => {
    setTextStyle((prev) => ({ ...prev, [style]: !prev[style] }));
  };

  return (
    <div style={{ padding: "10px" }}>
      {/* Formatting Buttons */}
      <Stack direction="row" spacing={1} marginBottom={2} justifyContent="center">
        <Button
          variant={textStyle.bold ? "contained" : "outlined"}
          onClick={() => toggleStyle("bold")}
          style={{ fontWeight: "bold", minWidth: "40px" }}
        >
          B
        </Button>
        <Button
          variant={textStyle.italic ? "contained" : "outlined"}
          onClick={() => toggleStyle("italic")}
          style={{ fontStyle: "italic", minWidth: "40px" }}
        >
          I
        </Button>
        <Button
          variant={textStyle.underline ? "contained" : "outlined"}
          onClick={() => toggleStyle("underline")}
          style={{ textDecoration: "underline", minWidth: "40px" }}
        >
          U
        </Button>
      </Stack>

      {/* Editable Slide Container */}
      <div
        style={{
          width: "100%",
          minHeight: "300px",
          border: "2px solid #ccc",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Editable Text */}
        <TextField
          label="Slide Content"
          multiline
          fullWidth
          rows={4}
          value={slides[slideIndex].content}
          onChange={updateContent}
          style={{
            fontWeight: textStyle.bold ? "900" : "normal",
            fontStyle: textStyle.italic ? "italic" : "normal",
            textDecoration: textStyle.underline ? "underline" : "none",
            textAlign: "center",
            width: "90%",
            position: "relative",
            zIndex: 2,
          }}
        />

        {/* Display Uploaded Images */}
        <div style={{ marginTop: "10px", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {slides[slideIndex].images &&
            slides[slideIndex].images.map((img, index) => (
              <img key={index} src={img} alt="Slide" style={{ maxWidth: "90%", height: "auto", marginTop: "5px" }} />
            ))}
        </div>
      </div>

      {/* Image Upload */}
      <label style={{ marginTop: "10px", display: "block", textAlign: "center" }}>
        <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
        <Button variant="contained" component="span">
          Upload Image
        </Button>
      </label>
    </div>
  );
};

export default SlideEditor;
