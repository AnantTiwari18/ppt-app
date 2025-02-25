import React from "react";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const SlideList = ({ slides, activeSlide, setActiveSlide, deleteSlide }) => {
  return (
    <List className="list-group w-100">
      {slides.map((slide, index) => (
        <ListItem
          key={slide.id}
          selected={slide.id === activeSlide}
          onClick={() => setActiveSlide(slide.id)}
          className={`list-group-item d-flex justify-content-between align-items-center 
                      ${slide.id === activeSlide ? "active bg-primary text-white" : ""}`}
          style={{
            cursor: "pointer",
            padding: "10px",
            borderRadius: "5px",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {/* Slide Text (Ensures it doesn't get hidden) */}
          <ListItemText
            primary={`Slide ${index + 1}`}
            className="flex-grow-1 text-truncate"
            style={{ maxWidth: "75%" }} // Adjust max-width for better spacing
          />
          
          {/* Delete Icon (Ensures it stays aligned properly) */}
          <IconButton
            onClick={(e) => {
              e.stopPropagation(); // Prevent accidental slide selection
              deleteSlide(slide.id);
            }}
            aria-label="delete"
            className="ms-2"
            style={{
              color: slide.id === activeSlide ? "white" : "red",
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default SlideList;
