import React, { useEffect, useState } from 'react';
import Canvas from './Canvas';


const GameWindow = ({ socket }) => {
    const [coordinates, setCoordinates] = useState([]);

    useEffect(() => {
        setCoordinates(...coordinates, {x: 100,y: 100})
    }, []);

  return (
    <div>
        <Canvas coordinates={coordinates} height={480} width={640} />;    
    </div>
  );
};

export default GameWindow;