require("dotenv").config()

let players = [];
let vel = 1;

module.exports = function(socketIO){

    socketIO.on('connection', (socket) => {
        console.log(`${socket.id} user just connected!`);
    
        socket.on('newPlayer', (data) => {
            data.x = Math.floor(Math.random() * process.env.CANVAS_WIDTH); 
            data.y =  Math.floor(Math.random() * process.env.CANVAS_HEIGHT);
            data.heading = 90;
            players.push(data);
            // players[socket.id] = data;
            socketIO.emit('newPlayerResponse', players);
        });
        
        socket.on('userCommands', (data) => {
            console.log(players);
            let obj = players.find((o, i) => {
                if (o.socketID === socket.id) {
                    // players[i] = { name: 'new string', value: 'this', other: 'that' };
                    if(data.up){
                        players[i].y += vel;  
                    }
                    if(data.down){
                        players[i].y -= vel;  
        
                    }
                    if(data.left){
                        players[i].x -= vel;  
                    }
                    if(data.right){
                        players[i].x += vel;  
                    }
                    return true; // stop searching
                }
            });
            console.log(players);
            
            socketIO.emit('newPlayerResponse', players);
            //players[socket.id];
        });

        socket.on('disconnect', () => {
            players = players.filter((player) => player.socketID !== socket.id);
            socketIO.emit('newPlayerResponse', players);
            socket.disconnect();
        });
        
        
    });


}