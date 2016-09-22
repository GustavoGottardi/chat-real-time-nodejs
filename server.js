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
peoples = [];
conversations = {};


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
	peoples.push(socket);

	socket.on('join', function(token) {
        conversations[socket.id] = token;
    });

    socket.on('disconnect', function() {
        delete conversations[socket.id];
        peoples.splice(peoples.indexOf(socket), 1);
    });

    socket.on('initiate private message',function(id,message) {
        var name = data.name;
        var receiverSocketId = findUserByName(name);
        if(receiverSocketId) {
            var receiver = conversations[receiverSocketId];
            var room = getARoom(conversations[socket.id], receiver);
            console.log(receiver);
            //join the anonymous user
            socket.join(room);
            //join the registered user 
            peoples[receiverSocketId].join(room);
            //notify the client of this
            socket.in(room).emit('private room created', room);
        }
    });

    socket.on('send private message', function(id, message) {
        socket.broadcast.to(id).emit('private chat created', message);
    });

	socket.on('toServer', function (data) {
		var msg = '<span class="user_name">'+data.name+'</span>:<span class="user_message">'+data.msg+'</span>';
		socket.emit('toClient', msg);
		socket.broadcast.emit('toClient', msg);
	});
});

//find user by name (
function findUserByName(name) {
    for(socketID in people) {
        if(people[socketID].name === name) {
            return test = socketID;
        }
    }
    // return false;
    console.log('not there');
}

//generate private room name for two users
function getARoom(user1, user2) {
    return 'privateRooom' + user1.name + "And" + user2.name;
}