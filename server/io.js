require("dotenv").config()

let players = [];
let bullets = [];
let player_vel = 2;
let player_rot_vel = 3;

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
                    if(data.up){
                        players[i].x -= player_vel * Math.sin(players[i].heading * Math.PI / 180);
                        players[i].y += player_vel * Math.cos(players[i].heading * Math.PI / 180);
                    }   
                    if(data.down){
                        players[i].x += player_vel * Math.sin(players[i].heading * Math.PI / 180);
                        players[i].y -= player_vel * Math.cos(players[i].heading * Math.PI / 180);
                    }
                    if(data.left){
                        players[i].heading -= player_rot_vel;  
                    }
                    if(data.right){
                        players[i].heading += player_rot_vel;  
                    }
                    return true; // stop searching
                }
            });
            
            socketIO.emit('newPlayerResponse', players);
            //players[socket.id];
        });

        socket.on('newBullet', (data) => {
            //console.log(data);
            let obj = players.find((o, i) => {
                if (o.socketID === socket.id) {
                    console.log(players[i]);
                    players[i].heading += player_rot_vel;
                    //create bullet with same location as player and given angle.
                    let bullet = {x: players[i].x, y: players[i].y, angle: data};
                    console.log(bullet);
                    //bullets.push();
                    return true; // stop searching
                }
            });

        });

        socket.on('disconnect', () => {
            players = players.filter((player) => player.socketID !== socket.id);
            socketIO.emit('newPlayerResponse', players);
            socket.disconnect();
        });
        
        function handleBullets(){

            socketIO.emit('newBulletResponse', bullets);
            //console.log("this is a test");
        }

        setInterval(handleBullets, 1000);
    });


}