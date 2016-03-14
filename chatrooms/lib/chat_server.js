/**
 * Created by yisuwen on 16/3/13.
 */
var so = require('socket.io');
var io;
var guestNumber = 1;
var nickName = {};
var namesUsed = [];
var currentRoom = {};

exports.listen = function(server){
	io = so.listen(server);
	io.set('log level',1);
	io.sockets.on('connection',function(socket){
		//每一个新的用户连接时，赋予一个访客名称
		//用户连接上时把他放入lobby里面
		//处理用户的消息，更名，以及聊天室的创建和变更
		//用户发出请求时，向其提供以及被占用的聊天室的列表
		//用户断开连接时的逻辑

	});
};
function assignGuestName(socket,guestNumber,nicknames,namesUsed){
	var name = 'Guest' + guestNumber;
	nicknames[socket.id] = name;
	socket.emit('nameResult',{
		success : true,
		name:name
	});
	namesUsed.push(name);
	return guestNumber + 1;
}

function joinRoom(socket,room){
	socket.join(room);
	currentRoom[socket.id] = room;
	socket.broadcast.to(room).emit('message',{
		text:nickName[socket.id] + 'has joined' + room + '.'
	});

	var usersInRoom  = io.sockets.clients(room);
	if(usersInRoom.length > 1){
		var usersInRoomSummary = 'Users currently in ' + room + ";";
		for(var index in usersInRoom)
	}
}