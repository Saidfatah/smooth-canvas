// Dependencies
import React, { useEffect, useRef } from "react";

// Styles
import "./tailwind.output.css";

let WIDTH;
let HEIGHT = window.innerHeight;
if (typeof window !== "undefined") {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
}

const App = () => {
  const canvasRef = useRef();

  useEffect(() => {
    if (!canvasRef.current) return;
    var ctx = canvasRef.current.getContext("2d");
    ctx.moveTo(0, 0);
    createGradiantBackground(ctx);
    drawGrid(ctx, 10);
  }, []);

  var drawGrid = function (ctx, unit = 8) {
    var data = `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"> 
       <defs> 
        <pattern id="smallGrid" width="${unit}" height="${unit}" patternUnits="userSpaceOnUse"> 
            <path d="M ${unit} 0 L 0 0 0 ${unit}" fill="none" stroke="white" stroke-width="0.5" /> 
        </pattern> 
       </defs> 
       <rect width="100%" height="100%" fill="url(#smallGrid)" /> 
    </svg>`;

    var DOMURL = window.URL || window.webkitURL || window;

    var img = new Image();
    var svg = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
    var url = DOMURL.createObjectURL(svg);

    img.onload = function () {
      ctx.drawImage(img, 0, 0);
      DOMURL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const createGradiantBackground = (ctx) => {
    var grd = ctx.createLinearGradient(0, 0, 200, 0);
    const color1 = "#3d53c7";
    const color2 = "#5367d1";
    grd.addColorStop(0, color1);
    grd.addColorStop(1, color2);

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
  };

  return (
    <div className="min-h-screen bg-gray-500">
      <canvas
        ref={canvasRef}
        id="canvas"
        width={WIDTH}
        height={HEIGHT}
        style={{ background: "#fff", magrin: 20 }}
      ></canvas>
    </div>
  );
};

export default App;
