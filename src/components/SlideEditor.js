import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";

const SlideEditor = ({ slides, setSlides, activeSlide }) => {
  const [textStyle, setTextStyle] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  const slide = slides.find((s) => s.id === activeSlide);
  if (!slide) return <p>No slide selected</p>;

  const updateContent = (event) => {
    setSlides(
      slides.map((s) =>
        s.id === activeSlide ? { ...s, content: event.target.value } : s
      )
    );
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSlides(
        slides.map((s) =>
          s.id === activeSlide ? { ...s, images: [...s.images, imageUrl] } : s
        )
      );
    }
  };

  const toggleStyle = (style) => {
    setTextStyle((prev) => ({ ...prev, [style]: !prev[style] }));
  };

  return (
    <div style={{ padding: "10px" }}>
      {/* Formatting Buttons - Responsive */}
      <Stack direction="row" spacing={1} marginBottom={2} justifyContent="center">
        <Button
          variant={textStyle.bold ? "contained" : "outlined"}
          onClick={() => toggleStyle("bold")}
          style={{
            fontWeight: "bold",
            minWidth: "40px",
          }}
        >
          B
        </Button>
        <Button
          variant={textStyle.italic ? "contained" : "outlined"}
          onClick={() => toggleStyle("italic")}
          style={{
            fontStyle: "italic",
            minWidth: "40px",
          }}
        >
          I
        </Button>
        <Button
          variant={textStyle.underline ? "contained" : "outlined"}
          onClick={() => toggleStyle("underline")}
          style={{
            textDecoration: "underline",
            minWidth: "40px",
          }}
        >
          U
        </Button>
      </Stack>

      {/* Text Editor */}
      <TextField
        label="Edit Slide Content"
        multiline
        fullWidth
        rows={6}
        value={slide.content}
        onChange={updateContent}
        style={{
          fontWeight: textStyle.bold ? "900" : "normal",
          fontStyle: textStyle.italic ? "italic" : "normal",
          textDecoration: textStyle.underline ? "underline" : "none",
          width: "100%",
        }}
      />

      {/* Image Upload */}
      <label style={{ marginTop: "10px", display: "block", textAlign: "center" }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
        <Button variant="contained" component="span">
          Upload Image
        </Button>
      </label>

      {/* Display Images Responsively */}
      <div style={{ marginTop: "10px", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {slide.images.map((img, index) => (
          <img key={index} src={img} alt="Slide" style={{ maxWidth: "100%", height: "auto", marginTop: "5px" }} />
        ))}
      </div>
    </div>
  );
};

export default SlideEditor;
