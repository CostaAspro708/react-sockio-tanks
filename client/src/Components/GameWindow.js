import React, { useEffect, useState } from 'react';
import Canvas from './Canvas';


const GameWindow = ({ socket }) => {
    const [coordinates, setCoordinates] = useState([]);

    //Run everytime coordinates change. 
    useEffect(() => {
        socket.on('newPlayerResponse', (data) => {
            setCoordinates(data);
        });
    }, [socket, coordinates]);

  return (
    <div>
        <Canvas coordinates={coordinates} height={480} width={640} socket={socket}/>;    
    </div>
  );
};

export default GameWindow;