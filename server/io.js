require("dotenv").config()

let players = [];

module.exports = function(socketIO){

    socketIO.on('connection', (socket) => {
        console.log(`${socket.id} user just connected!`);
    
        socket.on('newPlayer', (data) => {
            data.x = Math.floor(Math.random() * process.env.CANVAS_WIDTH); 
            data.y =  Math.floor(Math.random() * process.env.CANVAS_HEIGHT);
            data.heading = 90;
            players.push(data);
            console.log(players);
            socketIO.emit('newPlayerResponse', players);
        });
        
        socket.on('disconnect', () => {
            console.log("user disconnected");
            players = players.filter((player) => player.socketID !== socket.id);
            console.log(players);
            socketIO.emit('newPlayerResponse', players);
            //socket.disconnect();
        });
    
    });


}