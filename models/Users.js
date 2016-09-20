//Model Users
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	nome: String,
    email: String,
    password: String,
    token: String
});
 
//Define o model Users
module.exports = mongoose.model('Users', UserSchema);