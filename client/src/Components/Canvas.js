import React from "react";
import PropTypes from "prop-types";
// Path2D for a Heart SVG
const heartSVG = "M0 200 v-200 h200 a100,100 90 0,1 0,200 a100,100 90 0,1 -200,0 z"
const SVG_PATH = new Path2D(heartSVG);


function draw(ctx, location){
    console.log("attempting to draw")
    console.log(location);
    ctx.fillRect(25, 25, 100, 100);  
}

const Canvas = ({ coordinates, height, width }) => {
  const canvas = React.useRef();

  React.useEffect(() => {
    const context = canvas.current.getContext("2d");
    draw(context, coordinates);
  });

  return <canvas className="border-2" ref={canvas} height={height} width={width} />;
};


export default Canvas;
