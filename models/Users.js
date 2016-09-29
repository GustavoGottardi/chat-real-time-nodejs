//Model Users
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: String,
    email: String,
    password: String,
    token: String,
    statusNotify: String,
    socketID: String
});
 
//Define o model Users
module.exports = mongoose.model('Users', UserSchema);