import React from 'react';
import GameWindow from './GameWindow';

const GamePage = ({ socket }) => {
  return (
    <div>
        <GameWindow socket={socket}/>
    </div>
  );
};

export default GamePage;