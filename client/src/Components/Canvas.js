import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
// Path2D for a Heart SVG
const heartSVG = "M0 200 v-200 h200 a100,100 90 0,1 0,200 a100,100 90 0,1 -200,0 z"
const SVG_PATH = new Path2D(heartSVG);


function drawPlayers(ctx, coordinates){
    //clear cavas to remove previous state.
    // Store the current transformation matrix
    ctx.reset();
    console.log("clearing");
    console.log(coordinates);
    //for each player coordinates draw the players
    coordinates.forEach(location => {

        ctx.save();

        ctx.translate(location.x + 20/2, location.y + 20/2 );
        
        // rotate the rect
        ctx.rotate(location.heading * Math.PI / 180);

        ctx.rect( -20/2, -20/2, 20,20);

        ctx.fillStyle="gold";
        ctx.fill();
        ctx.restore();


    });
}

const Canvas = ({ coordinates, height, width, socket }) => {
  const canvas = useRef();
  let userCommands = {
    up: false,
    down: false,
    left: false,
    right: false
    };

  const [commands, setCommands] = useState(userCommands);

  const handleKeyDown = (event) => {
    console.log('A key was pressed', event.keyCode);
    userCommands.right = false;
    userCommands.left = false;
    userCommands.up = false;
    userCommands.down = false;
    switch(event.keyCode){
        case 87:
            userCommands.up = true;
            break;
        case 83:
            userCommands.down = true;
            break;
        case 68:
            userCommands.right = true;
            break;
        case 65:
            userCommands.left = true;
            break;
        default:
    }
    socket.emit('userCommands', commands);
  };

  useEffect(() => {
    const context = canvas.current.getContext("2d");
    drawPlayers(context, coordinates);
  });

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    // cleanup this component
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
  }, []);

  return <canvas className="border-2" ref={canvas} height={height} width={width} />;
};


export default Canvas;
