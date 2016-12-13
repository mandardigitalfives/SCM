var io = require('socket.io')();

io.on('connection', function (socket) {
	console.log('Connected');
});

io.of('/newgig').on('connection',function(socket){
	console.log('new user connected in newgig');
});

module.exports = io;