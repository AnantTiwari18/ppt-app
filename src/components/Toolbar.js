import React from "react";
import { Button } from "@mui/material";

const Toolbar = ({ addSlide, uploadImage }) => {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadImage(URL.createObjectURL(file));
    }
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <Button variant="contained" color="primary" onClick={addSlide}>
        Add Slide
      </Button>
      <label style={{ marginLeft: "10px" }}>
        <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
        <Button variant="contained" component="span">Upload Image</Button>
      </label>
    </div>
  );
};

export default Toolbar;
