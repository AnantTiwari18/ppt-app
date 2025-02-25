export const saveSlidesToLocalStorage = (slides) => {
    localStorage.setItem("slides", JSON.stringify(slides));
  };
  
  export const loadSlidesFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("slides")) || [];
  };
  