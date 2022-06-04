// Dependencies
import React, { useEffect, useRef } from "react";
import Grid from "./Grid";
import { Shape, drawRectangle, clearCanvasArea } from "./utils";
import "./tailwind.output.css";

//https://github.com/Flipboard/react-canvas

let WIDTH;
let HEIGHT = window.innerHeight;
if (typeof window !== "undefined") {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
}

const App = () => {
  const dragDropCanvasRef = useRef();
  const [shapes, setShapes] = React.useState([Shape()]);

  useEffect(() => {
    if (!dragDropCanvasRef.current) return;
    const dragAndDropCanvas = dragDropCanvasRef.current;
    //dragAndDropCanvas.addEventListener('mousedown',onMouseDown)
    //dragAndDropCanvas.addEventListener('mouseup',onMouseUp)
    //dragAndDropCanvas.addEventListener('mousemove',onMouseMove)
    dragAndDropCanvas.onmousedown = onMouseDown;
    dragAndDropCanvas.onmouseup = onMouseUp;
    dragAndDropCanvas.onmousemove = onMouseMove;
  }, []);

  const onMouseDown = (e) => {
    /*    // tell the browser we're handling this mouse event
     e.preventDefault();
     e.stopPropagation();

     // get the current mouse position
     var mx=parseInt(e.clientX-offsetX);
     var my=parseInt(e.clientY-offsetY);

     // test each rect to see if mouse is inside
     dragok=false;
     for(var i=0;i<rects.length;i++){
         var r=rects[i];
         if(mx>r.x && mx<r.x+r.width && my>r.y && my<r.y+r.height){
             // if yes, set that rects isDragging=true
             dragok=true;
             r.isDragging=true;
         }
     }
     // save the current mouse position
     startX=mx;
     startY=my; */
  };

  const onMouseUp = (e) => {};
  const onMouseMove = (e) => {};

  // redraw the scene
  function refreshCanvasScene(ctx, width, height) {
    clearCanvasArea(WIDTH, HEIGHT);
    ctx.fillStyle = "#FAF7F8";
    drawRectangle(ctx, 0, 0, width, height);
    // redraw each rect in the rects[] array
    for (var i = 0; i < shapes.length; i++) {
      var r = shapes[i];
      ctx.fillStyle = r.fill;
      drawRectangle(ctx, r.x, r.y, r.width, r.height);
    }
  }

  return (
    <div className="min-h-screen bg-gray-500">
      <Grid {...{ HEIGHT, WIDTH }} />
      <canvas
        ref={dragDropCanvasRef}
        id="canvas2"
        width={WIDTH}
        height={HEIGHT}
        style={{
          zIndex: 2,
          marginTop: -HEIGHT
        }}
      ></canvas>
    </div>
  );
};

export default App;
