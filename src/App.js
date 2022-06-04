// Dependencies
import React, { useRef } from "react";
import Grid from "./Grid";
// Styles
import "./tailwind.output.css";

//https://github.com/Flipboard/react-canvas

let WIDTH;
let HEIGHT = window.innerHeight;
if (typeof window !== "undefined") {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
}

function generateShapes() {
  return [...Array(10)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    rotation: Math.random() * 180,
    isDragging: false
  }));
}

const INITIAL_STATE = generateShapes();

const App = () => {
  const dragDropCanvasRef = useRef();
  const [stars, setStars] = React.useState(INITIAL_STATE);

  const handleDragStart = (e) => {
    const id = e.target.id();
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: star.id === id
        };
      })
    );
  };
  const handleDragEnd = (e) => {
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: false
        };
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-500">
      <Grid {...{ HEIGHT, WIDTH }} />
      {/* <canvas
        ref={dragDropCanvasRef}
        id="canvas2"
        width={WIDTH}
        height={HEIGHT}
        style={{
          zIndex: 2,
          marginTop: -HEIGHT
        }}
      ></canvas> */}
    </div>
  );
};

export default App;
