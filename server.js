var express = require('express');
var app = require('express')();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var jwt = require('jsonwebtoken');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
require('./models/Users');
var Users = mongoose.model('Users');
sockets = [];
peoples = {};


app.use(express.static(__dirname + '/dist/'));
app.set('view engine', 'html');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

mongoose.connect('mongodb://localhost/chat');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', startServer);

function startServer(){
	server.listen(3000, function(){
		console.log("Aplicação executada na porta 3000");
		app.get('*', function(req, res) {
			res.sendFile(__dirname + '/dist/index.html');
		});
		// app.get('/', function (req, res) {
		// 	res.sendfile(__dirname + '/index.html');
		// });
	});
};

var users = require('./routes/users');
app.use('/', users);

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

// Eventos do Socket.IO
io.sockets.on('connection', function (socket) {

	socket.on('join', function(data) {
	    peoples[socket.id] = data.email;
		socket.broadcast.emit('notifyStatus', {email: data.email, status: 'online'});
    });

    //initiate private message
    socket.on('initiate private message',function(data,event) {
        var user_name = data.name;
        var user_email = data.email;
        var receiverSocketId = findUserByEmail(user_email);
        console.log(receiverSocketId);
        if(receiverSocketId) {
            var receiver = peoples[receiverSocketId];
            var room = getARoom(peoples[socket.id], receiver);
            //join the anonymous user
            socket.join(room);
            //join the registered user 
            sockets[receiverSocketId].join(room);
            //notify the client of this
            socket.in(room).emit('private room created', room);
        }
    });

    socket.on('send private message', function(id, message) {
        socket.broadcast.to(id).emit('private chat created', message);
    });

    socket.on('user logout', function(data,event) {
		var socketIdUser = data.socketID;
		socket.broadcast.emit('notifySocketID', socketIdUser);
		socket.broadcast.emit('notifyStatus', {email: data.email, status: 'offline'});
    });

	socket.on('disconnect', function() {
	    delete conversations[socket.id];
	    peoples.splice(peoples.indexOf(socket), 1);
	});


	socket.on('toServer', function (data) {
		var msg = '<span class="user_name">'+data.name+'</span>:<span class="user_message">'+data.msg+'</span>';
		socket.emit('toClient', msg);
		socket.broadcast.emit('toClient', msg);
	});
});

//find user by name (
function findUserByEmail(email) {
    for(i=0; i < peoples.length; i++) {
        if(peoples[i].email === email) {
            return peoples[i].id;
        }
    }
}

//generate private room name for two users
function getARoom(user1, user2) {
    return 'privateRooom' + user1.email + "And" + user2.email;
}