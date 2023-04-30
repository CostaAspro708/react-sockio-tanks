const express = require('express');
const app = express();
const PORT = 4000; 

//imports 
const http = require('http').Server(app);
const cors = require('cors');
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});
require('./io.js')(socketIO);
app.use(cors());

//Include file that handles socket io logic

app.get('/api', (req, res) => {
    res.json({
      message: 'Hello world',
    });
  });

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});