import React, { useState, useEffect } from "react";
import SlideEditor from "./components/SlideEditor";
import SlideList from "./components/SlideList";
import SCORMExport from "./components/SCORMExport";
import { v4 as uuidv4 } from "uuid";
import { Container, Grid, Button } from "@mui/material";

const LOCAL_STORAGE_KEY = "presentationSlides";

const App = () => {
  const [slides, setSlides] = useState([]);
  const [activeSlide, setActiveSlide] = useState(null);

  // Load slides from local storage on app start
  useEffect(() => {
    const savedSlides = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (savedSlides && savedSlides.length > 0) {
      setSlides(savedSlides);
      setActiveSlide(savedSlides[0].id);
    } else {
      const newSlide = { id: uuidv4(), content: "", images: [] };
      setSlides([newSlide]);
      setActiveSlide(newSlide.id);
    }
  }, []);

  // Save slides to local storage when slides change
  useEffect(() => {
    if (slides.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(slides));
    }
  }, [slides]);

  const addSlide = () => {
    const newSlide = { id: uuidv4(), content: "", images: [] };
    setSlides([...slides, newSlide]);
    setActiveSlide(newSlide.id); // Automatically navigate to new slide
  };

  const deleteSlide = (id) => {
    if (window.confirm("Are you sure you want to delete this slide?")) {
      const updatedSlides = slides.filter((slide) => slide.id !== id);
      setSlides(updatedSlides);
      setActiveSlide(updatedSlides.length > 0 ? updatedSlides[0].id : null);
    }
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <SlideList
            slides={slides}
            activeSlide={activeSlide}
            setActiveSlide={setActiveSlide}
            deleteSlide={deleteSlide}
          />
          <Button variant="contained" color="primary" onClick={addSlide} fullWidth>
            Add Slide
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <SlideEditor slides={slides} setSlides={setSlides} activeSlide={activeSlide} />
        </Grid>
        <Grid item xs={12} md={3}>
          <SCORMExport slides={slides} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
