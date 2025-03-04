import React, { useRef, useState, useEffect } from "react";
import { Stage, Layer, Text, Image } from "react-konva";
import useImage from "use-image";

const CanvasEditor = ({ slide, updateSlide }) => {
  const stageRef = useRef(null);
  const [elements, setElements] = useState(slide.elements || []);

  useEffect(() => {
    updateSlide({ ...slide, elements });
  }, [elements]);

  const addText = () => {
    const newText = {
      id: `text-${Date.now()}`,
      type: "text",
      content: "New Text",
      x: 50,
      y: 50,
      fontSize: 20,
      draggable: true,
    };
    setElements([...elements, newText]);
  };

  const addImage = (imageUrl) => {
    const newImage = {
      id: `image-${Date.now()}`,
      type: "image",
      src: imageUrl,
      x: 100,
      y: 100,
      draggable: true,
    };
    setElements([...elements, newImage]);
  };

  const handleDragEnd = (id, e) => {
    setElements(
      elements.map((el) =>
        el.id === id ? { ...el, x: e.target.x(), y: e.target.y() } : el
      )
    );
  };

  return (
    <div>
      <button onClick={addText}>Add Text</button>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const imageUrl = URL.createObjectURL(file);
            addImage(imageUrl);
          }
        }}
      />
      <Stage width={500} height={400} ref={stageRef} style={{ border: "1px solid black" }}>
        <Layer>
          {elements.map((el) =>
            el.type === "text" ? (
              <Text
                key={el.id}
                text={el.content}
                x={el.x}
                y={el.y}
                fontSize={el.fontSize}
                draggable
                onDragEnd={(e) => handleDragEnd(el.id, e)}
              />
            ) : (
              <CanvasImage key={el.id} imageUrl={el.src} element={el} handleDragEnd={handleDragEnd} />
            )
          )}
        </Layer>
      </Stage>
    </div>
  );
};

const CanvasImage = ({ imageUrl, element, handleDragEnd }) => {
  const [image] = useImage(imageUrl);
  return (
    <Image
      image={image}
      x={element.x}
      y={element.y}
      draggable
      onDragEnd={(e) => handleDragEnd(element.id, e)}
    />
  );
};

export default CanvasEditor;