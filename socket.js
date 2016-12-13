var io = require('socket.io')();

io.on('connection', function (socket) {
	console.log('Connected');
});

io.of('/tracktruck').on('connection',function(socket){
	console.log('new user connected in tracktruck');
});

module.exports = io;