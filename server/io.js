
module.exports = function(socketIO){

    socketIO.on('connection', (socket) => {
        console.log(`${socket.id} user just connected!`);
    });

}