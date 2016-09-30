var express = require('express');
var app = require('express')();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var jwt = require('jsonwebtoken');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var _ = require('underscore');
require('./models/Users');
var Users = mongoose.model('Users');
sockets = {};
peoples = {};

app.use(express.static(__dirname + '/dist/'));
app.set('view engine', 'html');
app.set('port', (process.env.PORT || 3000));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

if(process.env.NODE_ENV) {
    mongoose.connect('mongodb://chat:chat123456@ds047166.mlab.com:47166/chat');
} else {
    mongoose.connect('mongodb://localhost/chat');
}

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', startServer);

function startServer(){
	server.listen(app.get('port'), function(){
		console.log("Aplicação executada na porta"+app.get('port'));
		app.get('*', function(req, res) {
			res.sendFile(__dirname + '/dist/index.html');
		});
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
        var socketIdUser = socket.id;
        peoples[socketIdUser] = data.email;
	    sockets[socketIdUser] = data.email;
        socket.broadcast.emit('notifyStatusAndSocket', {email: data.email, status: 'online', socketID: socketIdUser});
    });

    //initiate private message
    socket.on('initiate private message', function(data) {
        var currentUserName = data.currentUserName;
        var currentUserEmail = data.currentUserEmail;
        var user_name = data.name;
        var user_email = data.email;
        var receiverSocketId = findSocketIDbyEmail(user_email);
        if(receiverSocketId) {
            var receiver = peoples[receiverSocketId];
            var room = getARoom(currentUserEmail, receiver);
            //join the anonymous user
            socket.join(room);
            //notify the client of this
            socket.broadcast.in(room).emit('private room created', room);
        }
    });

    socket.on('send private message', function(data) {
        socket.broadcast.to(data.id).emit('private chat created', data.message);
    });

    socket.on('user logout', function(data) {
		var socketIdUser = data.socketID;
		socket.broadcast.emit('notifySocketID', socketIdUser);
		socket.broadcast.emit('notifyStatusAndSocket', {email: data.email, status: 'offline'});
    });

	socket.on('disconnect', function() {
	    delete peoples[socket.id];
	    peoples.splice(peoples.indexOf(socket), 1);
	});


	socket.on('toServer', function (data) {
		var msg = {name: data.name, message: data.message, email: data.email};
		socket.emit('toClient', msg);
		socket.broadcast.emit('toClient', msg);
	});
});

//find user by name
function findSocketIDbyEmail(email) {
    var socketID;
    _.find(peoples, function(value,key){
        if (value === email) {
          socketID = key;
          return true;
        } else {
          return false;
        }
    });
    return socketID;
}

//generate private room name for two users
function getARoom(user1, user2) {
    return 'privateRooom' + user1 + "And" + user2;
}