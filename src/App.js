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
  const shapes = [Shape()];
  const canDragShapes = useRef(false);
  const mouseStartXPosition = useRef(0);
  const mouseStartYPosition = useRef(0);

  useEffect(() => {
    if (!dragDropCanvasRef.current) return;
    const dragAndDropCanvas = dragDropCanvasRef.current;
    //dragAndDropCanvas.addEventListener('mousedown',onMouseDown)
    //dragAndDropCanvas.addEventListener('mouseup',onMouseUp)
    //dragAndDropCanvas.addEventListener('mousemove',onMouseMove)
    var ctx = dragAndDropCanvas.getContext("2d");
    var BB = dragAndDropCanvas.getBoundingClientRect();
    var offsetX = BB.left;
    var offsetY = BB.top;

    refreshCanvasScene(ctx);
    dragAndDropCanvas.onmousedown = onMouseDown(offsetX, offsetY);
    dragAndDropCanvas.onmouseup = onMouseUp(ctx);
    dragAndDropCanvas.onmousemove = onMouseMove(ctx, offsetX, offsetY);
  }, []);

  const onMouseDown = (offsetX, offsetY) => (e) => {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // get the current mouse position
    var mx = parseInt(e.clientX - offsetX);
    var my = parseInt(e.clientY - offsetY);

    // test each rect to see if mouse is inside
    canDragShapes.current = false;
    for (var i = 0; i < shapes.length; i++) {
      var r = shapes[i];
      if (mx > r.x && mx < r.x + r.width && my > r.y && my < r.y + r.height) {
        // if yes, set that rects isDragging=true
        canDragShapes.current = true;
        r.isDragging = true;
      }
    }
    // save the current mouse position
    mouseStartXPosition.current = mx;
    mouseStartYPosition.current = my;
  };

  const onMouseUp = (ctx) => (e) => {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // clear all the dragging flags
    canDragShapes.current = false;
    for (var i = 0; i < shapes.length; i++) {
      shapes[i].isDragging = false;
    }
  };
  const onMouseMove = (ctx, offsetX, offsetY) => (e) => {
    // if we're dragging anything...
    if (canDragShapes.current) {
      // tell the browser we're handling this mouse event
      e.preventDefault();
      e.stopPropagation();

      // get the current mouse position
      var mx = parseInt(e.clientX - offsetX);
      var my = parseInt(e.clientY - offsetY);

      // calculate the distance the mouse has moved
      // since the last mousemove
      var dx = mx - mouseStartXPosition.current;
      var dy = my - mouseStartYPosition.current;

      // move each rect that isDragging
      // by the distance the mouse has moved
      // since the last mousemove
      for (var i = 0; i < shapes.length; i++) {
        var r = shapes[i];
        if (r.isDragging) {
          r.x += dx;
          r.y += dy;
        }
      }

      // redraw the scene with the new rect positions
      refreshCanvasScene();

      // reset the starting mouse position for the next mousemove
      mouseStartXPosition.current = mx;
      mouseStartYPosition.current = my;
    }
  };

  // redraw the scene
  function refreshCanvasScene(ctx, width, height) {
    if (!ctx) return;
    clearCanvasArea(ctx, WIDTH, HEIGHT);
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
