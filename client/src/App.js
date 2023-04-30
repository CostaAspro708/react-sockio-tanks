
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import GamePage from './Components/GamePage';
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:4000');
function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home socket={socket} />}></Route>
          <Route path="/game" element={<GamePage socket={socket} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;