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

// Eventos do Socket.IO
io.sockets.on('connection', function (socket) {
	socket.on('toServer', function (data) {
		var msg = data.nome+":"+data.msg;
		socket.emit('toClient', msg);
		socket.broadcast.emit('toClient', msg);
	});
});

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});
