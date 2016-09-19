// INICIANDO ==============================================
// Define as bibliotecas que iremos utilizar
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Users = mongoose.model('Users');
var app = express();
var fs = require('fs');
var jwt = require('jsonwebtoken');

//Rota para autenticação
router.post('/auth/authenticate', function(req, res) {
    Users.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err,
                statusLogin: 500
            });
        } else {
            if (user) {
               res.json({
                    type: true,
                    data: user,
                    token: user.token,
                    statusLogin: 200
                });
            } else {
                res.json({
                    type: false,
                    data: "Incorrect email/password",
                    statusLogin: 404
                });
            }
        }
    });
});

//Rota de login de users
router.post('/auth/signup', function(req, res) {
    Users.findOne({email: req.body.email}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err,
                statusSignup: 500
            });
        } else {
            if (user) {
                res.json({
                    type: false,
                    data: "User already exists!",
                    statusSignup: 404
                });
            } else {
                var userModel = new Users();
                userModel.email = req.body.email;
                userModel.password = req.body.password;
                userModel.save(function(err, user) {
                    user.token = jwt.sign(user, 'superSecretMyapp');
                    user.save(function(err, user1) {
                        res.json({
                            type: true,
                            data: user1,
                            token: user1.token,
                            statusSignup: 200
                        });
                    });
                    console.log(user);
                })
            }
        }
    });
});

//Rota para visualizar usuário logado
router.get('/auth/me', ensureAuthorized, function(req, res) {
    Users.findOne({token: req.token}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err,
                statusUser: 500
            });
        } else {
            res.json({
                type: true,
                data: user,
                statusUser: 200
            });
        }
    });
});

//Cabeçalhos de requisição são interceptados e o cabeçalho authorization é extraído
function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.send(403);
    }
}

process.on('uncaughtException', function(err) {
    console.log(err);
});

module.exports = router;
